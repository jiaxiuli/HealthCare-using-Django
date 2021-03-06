import json
from datetime import datetime
import pytz
import time
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib.postgres import serializers
from django.views.decorators.clickjacking import xframe_options_exempt
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
from myapp.forms import UserCreationForm
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from myapp.forms import PatientForm, DoctorForm, SymptomForm
from myapp.models import Topic, Patient, Doctor, Symptom, Photo, SymTransaction, ReplyTransaction, Chat, Appointment
from django.views import View
import pandas as pd
import types


# Create your views here.

class IndexView(View):
    def get(self, request):
        if 'last_login' in request.session:
            last_login = request.session['last_login']
        else:
            last_login = "Your last login was more than one hour ago!!"
        # top_list = Topic.objects.all().order_by('id')[:10]
        # request.session.set_test_cookie()
        return render(request, 'myapp/index.html', {'ash': self.get_queryset(), 'last_login': last_login})

    def get_queryset(self):
        return Topic.objects.all().order_by('id')[:10]


@csrf_exempt
def patient(request):
    msg = ''
    if request.method == 'POST':
        form = PatientForm(request.POST)
        if form.is_valid():
            patient = form.save(commit=False)
            patient.save()
            msg = 'Your information has been uploaded successfully.'
        return render(request, 'myapp/patient_response.html', {'msg': msg})
    else:
        form = PatientForm()
    return render(request, 'myapp/patient.html', {'form': form, 'msg': msg})


def home(request):

    return render(request, 'myapp/home.html')


@csrf_exempt
def doctor(request):
    msg = ''
    if request.method == 'POST':
        form = DoctorForm(request.POST)
        if form.is_valid():
            doctor = form.save(commit=False)
            doctor.save()
            msg = 'Your feedback has been uploaded successfully.'
        return render(request, 'myapp/doctor_response.html', {'msg': msg})
    else:
        form = DoctorForm()
    return render(request, 'myapp/doctor.html', {'form': form, 'msg': msg})


def account(request):
    return render(request, 'myapp/account.html')


@csrf_exempt
def userInfoChange(request):
    if request.method == 'POST':
        form_obj = PatientForm(request.POST)
        # print(form_obj)
        if form_obj.is_valid():
            id = request.POST.get("id", "")
            patient = Patient.objects.filter(user_id=id)
            _patient = patient[0]
            oldUser = User.objects.filter(id=id)
            _oldUser = oldUser[0]
            symRecord = Symptom.objects.filter(user_id=id)
            username = request.POST.get("username", "")
            userPhoto = Photo.objects.filter(user_id=id)
            if userPhoto:
                _userPhoto = userPhoto[0].img.url
            else:
                _userPhoto = "/media/img/default.png"

            check = True
            if username:
                checkifUsername = User.objects.filter(username=username)
                if checkifUsername.count() != 0:
                    check = False
                else:
                    _patient.username = username
                    _oldUser.username = username
                    symRecord.update(username=username)
            email = request.POST.get("email", "")
            if email:
                # _patient.email = email
                _oldUser.email = email
            first_name = request.POST.get("first_name", "")
            if first_name:
                _patient.first_name = first_name
                _oldUser.first_name = first_name
            last_name = request.POST.get("last_name", "")
            if last_name:
                _patient.last_name = last_name
                _oldUser.last_name = last_name
            age = request.POST.get("age", "")
            if age:
                _patient.age = age
            gender = request.POST.get("gender", "")
            if gender:
                if gender == 'M':
                    _patient.gender = "M"
                    g = "Male"
                elif gender == "F":
                    _patient.gender = "F"
                    g = "Female"
            address = request.POST.get("address", "")
            if address:
                _patient.address = address

            symptomList = Symptom.objects.filter(user_id=id)
            symptom = list(symptomList)

            if not check:
                return render(request, "myapp/account.html",
                              {'username': _patient.username, 'email': _oldUser.email, 'userId': id,
                               "firstname": _patient.first_name, "lastname": _patient.last_name,
                               "age": _patient.age, "gender": g, "address": _patient.address, "failed": 1, "symptom": symptom, "photo": _userPhoto})
            else:
                _patient.save()
                _oldUser.save()
                for sym in symRecord:
                    sym.save()

                return render(request, "myapp/account.html", {'username': _patient.username, 'email': _oldUser.email, 'userId': id, "firstname": _patient.first_name, "lastname": _patient.last_name,
                                                              "age": _patient.age, "gender": g, "address": _patient.address, "failed": 0, "symptom": symptom, "photo": _userPhoto})
    return render(request, "myapp/account.html")


@csrf_exempt
def addSymRecord(request):
    text = request.POST.get('text')
    userId = request.POST.get('userId')
    username = request.POST.get('username')
    recordTime = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    if text:
        sym = Symptom(user_id=userId, text=text, time=recordTime, username=username)
        sym.save()
    print("success")

    symptomList = Symptom.objects.filter(user_id=userId).values()
    symList = list(symptomList)

    return HttpResponse(json.dumps(symList))


@csrf_exempt
def DeleteSymRecord(request):
    symId = request.POST.get('id')
    userId = request.POST.get('userId')
    symptom = Symptom.objects.filter(id=symId)
    _symptom = symptom[0]
    _symptom.delete()

    record = SymTransaction.objects.filter(sym_id=symId)
    if record:
        for rec in record:
            rec.delete()
    reply = ReplyTransaction.objects.filter(sym_id=symId)
    if reply:
        for rep in reply:
            rep.delete()

    symptomList = Symptom.objects.filter(user_id=userId).values()
    symList = list(symptomList)

    return HttpResponse(json.dumps(symList))


@csrf_exempt
def getDoctorList(request):
    doctorList = Doctor.objects.all().values()
    docList = list(doctorList)
    for doc in docList:
        user = User.objects.filter(id=doc['user_id'])
        doc['email'] = user[0].email
        userPhoto = Photo.objects.filter(user_id=doc['user_id'])
        if userPhoto:
            doc['img'] = userPhoto[0].img.url
        else:
            doc['img'] = "/media/img/default.png"

    print(docList)
    return HttpResponse(json.dumps(docList))


@csrf_exempt
def userInfoChange_doctor(request):
    if request.method == 'POST':
        form_obj = DoctorForm(request.POST)
        if form_obj.is_valid():
            id = request.POST.get("id", "")
            doctor = Doctor.objects.filter(user_id=id)
            _doctor = doctor[0]
            oldUser = User.objects.filter(id=id)
            _oldUser = oldUser[0]

            username = request.POST.get("username", "")
            userPhoto = Photo.objects.filter(user_id=id)
            if userPhoto:
                _userPhoto = userPhoto[0].img.url
            else:
                _userPhoto = "/media/img/default.png"

            check = True
            if username:
                checkifUsername = User.objects.filter(username=username)
                if checkifUsername.count() != 0:
                    check = False
                else:
                    _doctor.username = username
                    _oldUser.username = username
            email = request.POST.get("email", "")
            if email:
                # _doctor.email = email
                _oldUser.email = email
            first_name = request.POST.get("first_name", "")
            if first_name:
                _doctor.first_name = first_name
                _oldUser.first_name = first_name
            last_name = request.POST.get("last_name", "")
            if last_name:
                _doctor.last_name = last_name
                _oldUser.last_name = last_name
            age = request.POST.get("age", "")
            if age:
                _doctor.age = age
            gender = request.POST.get("gender", "")
            if gender:
                if gender == 'M':
                    _doctor.gender = "M"
                    g = "Male"
                elif gender == "F":
                    _doctor.gender = "F"
                    g = "Female"
            address = request.POST.get("address", "")
            if address:
                _doctor.address = address

            if not check:
                return render(request, "myapp/doctor.html",
                              {'username': _doctor.username, 'email': _oldUser.email, 'userId': id,
                               "firstname": _doctor.first_name, "lastname": _doctor.last_name,
                               "age": _doctor.age, "gender": g, "address": _doctor.address, "failed": 1, "photo": _userPhoto})
            else:
                _doctor.save()
                _oldUser.save()

                return render(request, "myapp/doctor.html", {'username': _doctor.username, 'email': _oldUser.email, 'userId': id, "firstname": _doctor.first_name, "lastname": _doctor.last_name,
                                                              "age": _doctor.age, "gender": g, "address": _doctor.address, "failed": 0, "photo": _userPhoto})
    return render(request, "myapp/doctor.html")


@csrf_exempt
def user_login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        current_login_time = datetime.now(pytz.timezone('America/Toronto'))
        timestamp = current_login_time.strftime("%d-%b-%Y (%H:%M:%S)")
        request.session['last_login'] = 'Last Login: ' + timestamp
        request.session.set_expiry(300)
        if user:
            login(request, user)
            # if 'next' in request.POST:
            #     return redirect(request.POST.get('next'))
            # else:

            # 判断是医生还是病人
            # 是医生
            if user.identity == '1':
                doctor = Doctor.objects.filter(user_id=user.id)
                message = 'click to update'
                if doctor.count() != 0:
                    if doctor[0].first_name:
                        firstname = doctor[0].first_name
                    else:
                        firstname = message
                    if doctor[0].last_name:
                        lastname = doctor[0].last_name
                    else:
                        lastname = message
                    if doctor[0].age:
                        age = doctor[0].age
                    else:
                        age = message
                    if doctor[0].address:
                        address = doctor[0].address
                    else:
                        address = message
                    if doctor[0].gender == 'M':
                        gender = "Male"
                    elif doctor[0].gender == 'F':
                        gender = "Female"
                    else:
                        gender = message
                else:
                    firstname = message
                    lastname = message
                    age = message
                    gender = message
                    address = message

                userPhoto = Photo.objects.filter(user_id=user.id)
                if userPhoto:
                    _userPhoto = userPhoto[0].img.url
                else:
                    _userPhoto = "/media/img/default.png"

                return render(request, 'myapp/doctor.html', {'username': user.username, 'email': user.email,
                                                              'userId': user.id, "firstname": firstname,
                                                              "lastname": lastname,
                                                              "age": age, "gender": gender, "address": address,
                                                              "photo": _userPhoto})
            # 病人
            else:
                patient = Patient.objects.filter(user_id=user.id)
                message = 'click to update'
                if patient.count() != 0:
                        if patient[0].first_name:
                            firstname = patient[0].first_name
                        else:
                            firstname = message
                        if patient[0].last_name:
                            lastname = patient[0].last_name
                        else:
                            lastname = message
                        if patient[0].age:
                            age = patient[0].age
                        else:
                            age = message
                        if patient[0].address:
                            address = patient[0].address
                        else:
                            address = message
                        if patient[0].gender == 'M':
                            gender = "Male"
                        elif patient[0].gender == 'F':
                            gender = "Female"
                        else:
                            gender = message
                else:
                        firstname = message
                        lastname = message
                        age = message
                        gender = message
                        address = message
                symptomList = Symptom.objects.filter(user_id=user.id)
                symptom = list(symptomList)
                userPhoto = Photo.objects.filter(user_id=user.id)
                if userPhoto:
                    _userPhoto = userPhoto[0].img.url
                else:
                    _userPhoto = "/media/img/default.png"
                return render(request, 'myapp/account.html', {'username': user.username, 'email': user.email,
                                                              'userId': user.id, "firstname": firstname, "lastname": lastname,
                                                              "age":age, "gender": gender, "address": address, "symptom": symptom, "photo": _userPhoto})
        else:
            return render(request, 'myapp/login.html', {'msg': True})
    else:
        return render(request, 'myapp/login.html', {'msg': False})


# def register(request):
#     if request.method == 'POST':
#         form = UserCreationForm(request.POST)
#         if form.is_valid():
#             user = form.save()
#             #login(request, user, backend='django.contrib.auth.backends.ModelBackend')
#             return redirect('myapp:user_login')


def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            id = user.id
            username = user.username
            identity = user.identity
            if identity == '1':
                mes = "click to update"
                d = Doctor(user_id=id, username=username, first_name=mes, last_name=mes,
                            address=mes, age=mes, gender=mes, department=1, main='', quote='')
                d.save()
            else:
                mes = "click to update"
                p = Patient(user_id=id, username=username, first_name=mes, last_name=mes,
                        address=mes, age=mes, gender=mes)
                p.save()
            # login(request, user, backend='django.contrib.auth.backends.ModelBackend')
            return redirect('myapp:user_login')
        else:
            print("is not valid")
            return render(request, 'myapp/register0.html', {"error": 1})
    return render(request, 'myapp/register0.html', {"error": 0})


@login_required
def user_logout(request):
    request.session.flush()
    return HttpResponseRedirect(reverse('myapp:home'))


@csrf_exempt
@xframe_options_exempt
def uploadImg(request):
    file_obj = request.FILES.get('file1', None)
    userId = request.POST.get('userId')

    user = Photo.objects.filter(user_id=userId)
    if user:
        _user = user[0]
        _user.img = file_obj
        _user.save()
    else:
        new_img = Photo(
            img=file_obj,
            user_id=userId
        )
        new_img.save()
    imgUrl = str(file_obj)
    return HttpResponse(imgUrl)


@csrf_exempt
@xframe_options_exempt
def sendRecordToDoctor(request):
    symId = request.POST.get('symId')
    patientId = request.POST.get('patientId')
    docId = request.POST.get('docId')
    sendTime = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    symRec = SymTransaction(patient_id=patientId, sym_id=symId, doctor_id=docId, send_time=sendTime, isRead=0)
    symRec.save()
    return HttpResponse("success")


@csrf_exempt
@xframe_options_exempt
def getReceivedRecord(request):
    userId = request.POST.get('userId')
    # 获取symptom里面的信息
    receivedRecord = SymTransaction.objects.filter(doctor_id=userId)
    recRec = list(receivedRecord)
    data = []

    for rec in recRec:
        # 需要头像 user表的信息 patient表的信息 symptom表的信息
        # 头像信息
        img = Photo.objects.filter(user_id=rec.patient_id)
        if img:
            _img = img[0]
            photo = _img.img.url
        else:
            photo = "/media/img/default.png"

        # user表信息
        user = User.objects.filter(id=rec.patient_id)
        _user = user[0]

        # patient表信息
        patient = Patient.objects.filter(user_id=rec.patient_id)
        _patient = patient[0]

        # symptom表信息
        sym = Symptom.objects.filter(id=rec.sym_id)
        if sym:
            _sym = sym[0]
            c_time = _sym.time
            text = _sym.text
        else:
            c_time = ""
            text = "This record has been deleted."
        obj = {
            "img": photo,
            "username": _user.username,
            "first_name": _user.first_name,
            "last_name": _user.last_name,
            "email": _user.email,
            "age": _patient.age,
            "gender": _patient.gender,
            "address": _patient.address,
            "create_time": c_time,
            "text": text,
            "send_time": rec.send_time,
            "transId": rec.id,
            "isRead": rec.isRead,
            "patient_id": rec.patient_id,
            "doctor_id":rec.doctor_id,
            "sym_id": rec.sym_id
        }
        data.append(obj)
    return HttpResponse(json.dumps(data))

@csrf_exempt
@xframe_options_exempt
def recordIsRead(request):
    transId = request.POST.get('transId')
    rec = SymTransaction.objects.filter(id=transId)
    _rec = rec[0]
    _rec.isRead = 1
    _rec.save()
    return HttpResponse("success")


@csrf_exempt
@xframe_options_exempt
def replyIsRead(request):
    transId = request.POST.get('transId')
    rec = ReplyTransaction.objects.filter(id=transId)
    _rec = rec[0]
    _rec.isRead = 1
    _rec.save()
    return HttpResponse("success")


@csrf_exempt
@xframe_options_exempt
def getReply(request):
    patient_id = request.POST.get('patient_id')
    doctor_id = request.POST.get('doctor_id')
    sym_id = request.POST.get('sym_id')
    analysis = request.POST.get('analysis')
    treatment = request.POST.get('treatment')
    send_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

    symptom = Symptom.objects.filter(id=sym_id)
    if symptom:
        print(patient_id, doctor_id, sym_id, analysis, treatment)
        reply = ReplyTransaction(patient_id=patient_id, sym_id=sym_id,
                                 doctor_id=doctor_id, analysis=analysis, treatment=treatment, send_time=send_time, isRead=0)
        reply.save()
        return HttpResponse("success")
    else:
        return HttpResponse("record deleted")


@csrf_exempt
@xframe_options_exempt
def getReceivedReply(request):
    userId = request.POST.get('userId')
    # 获取symptom里面的信息
    receivedReply = ReplyTransaction.objects.filter(patient_id=userId)
    recRply = list(receivedReply)
    data = []

    for rec in recRply:
        # 需要头像 user表的信息 patient表的信息 symptom表的信息
        # 头像信息
        img = Photo.objects.filter(user_id=rec.doctor_id)
        _img = img[0]

        # user表信息
        user = User.objects.filter(id=rec.doctor_id)
        _user = user[0]

        # doctor表信息
        doctor = Doctor.objects.filter(user_id=rec.doctor_id)
        _doctor = doctor[0]

        # symptom表信息
        sym = Symptom.objects.filter(id=rec.sym_id)
        if sym:
            _sym = sym[0]
            c_time = _sym.time
            text = _sym.text
        else:
            c_time = ""
            text = "This record has been deleted."
        obj = {
            "img": _img.img.url,
            "username": _user.username,
            "first_name": _user.first_name,
            "last_name": _user.last_name,
            "email": _user.email,
            "age": _doctor.age,
            "gender": _doctor.gender,
            "address": _doctor.address,
            "create_time": c_time,
            "text": text,
            "send_time": rec.send_time,
            "transId": rec.id,
            "isRead": rec.isRead,
            "patient_id": rec.patient_id,
            "doctor_id":rec.doctor_id,
            "sym_id": rec.sym_id,
            "analysis": rec.analysis,
            "treatment": rec.treatment
        }
        data.append(obj)
    return HttpResponse(json.dumps(data))


@csrf_exempt
@xframe_options_exempt
def chatTransaction(request):
    sender = request.POST.get('sender')
    receiver = request.POST.get('receiver')
    message = request.POST.get('text')

    send_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    _chat = Chat(sender=sender, receiver=receiver, text=message, time=send_time, isRead=0)
    _chat.save()

    return HttpResponse(send_time)


@csrf_exempt
@xframe_options_exempt
def getChatHistory(request):
    patient_id = request.POST.get("patient_id")
    sent = Chat.objects.filter(sender=patient_id)
    received = Chat.objects.filter(receiver=patient_id)
    chatList = []
    for i in sent:
        chatList.append(i.receiver)
    for i in received:
        chatList.append(i.sender)
    chatList = pd.unique(chatList).tolist()

    data = []
    for chat in chatList:
        user = User.objects.filter(id=chat)
        _user = user[0]

        chatInfo = Chat.objects.filter(Q(sender=chat, receiver=patient_id) | Q(receiver=chat, sender=patient_id)).last()
        unReadCount = Chat.objects.filter(Q(sender=chat, receiver=patient_id) & Q(isRead=0)).count()
        photo = Photo.objects.filter(user_id=chat)
        if photo:
            _photo = photo[0]
            img = _photo.img.url
        else:
            img = "/media/img/default.png"

        obj = {
            "first_name": _user.first_name,
            "last_name": _user.last_name,
            "last_message": chatInfo.text,
            "last_mes_time": chatInfo.time,
            "img": img,
            "user_id": chat,
            "unReadCount": unReadCount
        }
        data.append(obj)
    data.sort(key=lambda x: x["last_mes_time"])
    data.reverse()
    return HttpResponse(json.dumps(data))


@csrf_exempt
@xframe_options_exempt
def showChatHistory(request):
    sender = request.POST.get("sender")
    receiver = request.POST.get("receiver")

    history = Chat.objects.filter(Q(sender=sender, receiver=receiver)
                                  | Q(sender=receiver, receiver=sender)).values()
    img = Photo.objects.filter(user_id=receiver)
    if img:
        _img = img[0]
        photo = _img.img.url
    else:
        photo = "/media/img/default.png"
    historyList = list(history)
    historyList.insert(0, photo)

    return HttpResponse(json.dumps(historyList))


@csrf_exempt
@xframe_options_exempt
def searchUser(request):
    user = request.POST.get("user")
    data = []
    if user.isdigit():
        u_id = User.objects.filter(id=user)
        if u_id:
            _user = u_id[0]
            img = Photo.objects.filter(user_id=_user.id)
            if img:
                _img = img[0]
                photo = _img.img.url
            else:
                photo = "/media/img/default.png"
            obj = {
                "firstname": _user.first_name,
                "lastname": _user.last_name,
                "img": photo,
                "user": _user.id
            }
            data.append(obj)
    else:
        u_username = User.objects.filter(username=user)
        if u_username:
            _user = u_username[0]
            img = Photo.objects.filter(user_id=_user.id)
            if img:
                _img = img[0]
                photo = _img.img.url
            else:
                photo = "/media/img/default.png"
            obj = {
                "firstname": _user.first_name,
                "lastname": _user.last_name,
                "img": photo,
                "user": _user.id
            }
            data.append(obj)
    return HttpResponse(json.dumps(data))


@csrf_exempt
@xframe_options_exempt
def checkIfUnreadMessage(request):
    receiver = request.POST.get("receiver")
    message = Chat.objects.filter(Q(receiver=receiver) & Q(isRead=0)).count()
    if message == 0:
        return HttpResponse(0)
    else:
        return HttpResponse(message)


@csrf_exempt
@xframe_options_exempt
def messageHasBeenRead(request):
    receiver = request.POST.get("receiver")
    sender = request.POST.get("sender")
    chat = Chat.objects.filter(sender=sender, receiver=receiver)
    for c in chat:
        c.isRead = 1
        c.save()
    return HttpResponse()


@csrf_exempt
@xframe_options_exempt
def saveDoctorWorkInfo(request):
    user = request.POST.get("user")
    department = request.POST.get("department")
    main = request.POST.get("main")
    quote = request.POST.get("quote")
    doc = Doctor.objects.filter(user_id=user)
    _doc = doc[0]
    _doc.department = department
    _doc.main = main
    _doc.quote = quote
    _doc.save()

    return HttpResponse("success")


@csrf_exempt
@xframe_options_exempt
def checkWorkInfo(request):
    user = request.POST.get("user")

    doc = Doctor.objects.filter(user_id=user)
    _doc = doc[0]
    data = []
    if _doc.department:
        data.append(_doc.department)
    else:
        data.append(1)
    if _doc.main:
        data.append(_doc.main)
    else:
        data.append("")
    if _doc.quote:
        data.append(_doc.quote)
    else:
        data.append("")

    return HttpResponse(json.dumps(data))


@csrf_exempt
@xframe_options_exempt
def appointmentGetDocList(request):
    doctorList = Doctor.objects.all().values()
    docList = list(doctorList)

    return HttpResponse(json.dumps(docList))


@csrf_exempt
@xframe_options_exempt
def makeAppointment(request):
    patient = request.POST.get("patient")
    doctor = request.POST.get("doctor")
    date = request.POST.get("date")
    time = request.POST.get("time")
    _a = Appointment(patient=patient, doctor=doctor, date=date, time=time)
    _a.save()
    return HttpResponse()


@csrf_exempt
@xframe_options_exempt
def getAppointmentList(request):
    patient = request.POST.get("patient")
    _appoint = Appointment.objects.filter(patient=patient).values()
    appointList = list(_appoint)
    if _appoint:
        for a in _appoint:
            doc = Doctor.objects.filter(user_id=a['doctor'])
            a['first_name'] = doc[0].first_name
            a['last_name'] = doc[0].last_name
    appointList.sort(key=lambda x: x["date"])
    return HttpResponse(json.dumps(appointList))


@csrf_exempt
@xframe_options_exempt
def deleteAppointment(request):
    appointmentID = request.POST.get("appointID")
    appoint = Appointment.objects.filter(id=appointmentID)
    appoint.delete()

    return HttpResponse()


@csrf_exempt
@xframe_options_exempt
def DocGetAppointmentForToday(request):
    docId = request.POST.get("docId")
    today = request.POST.get("today")
    appoints = Appointment.objects.filter(doctor=docId, date=today).values()
    appointsList = list(appoints)
    data = [[], [], [], []]
    for a in appointsList:
        pat = Patient.objects.filter(user_id=a['patient'])
        fname = pat[0].first_name
        lname = pat[0].last_name
        if a['time'] == '8':
            obj = {
                "fname": fname,
                "lname": lname,
            }
            data[0].append(obj)
        elif a['time'] == '10':
            obj = {
                "fname": fname,
                "lname": lname,
            }
            data[1].append(obj)
        elif a['time'] == '14':
            obj = {
                "fname": fname,
                "lname": lname,
            }
            data[2].append(obj)
        else:
            obj = {
                "fname": fname,
                "lname": lname,
            }
            data[3].append(obj)

    return HttpResponse(json.dumps(data))


@csrf_exempt
@xframe_options_exempt
def getAllAppointments(request):
    doctor = request.POST.get("docId")
    _appoint = Appointment.objects.filter(doctor=doctor).values()
    appointList = list(_appoint)
    if _appoint:
        for a in _appoint:
            pat = Patient.objects.filter(user_id=a['patient'])
            a['first_name'] = pat[0].first_name
            a['last_name'] = pat[0].last_name
    appointList.sort(key=lambda x: x["date"])
    return HttpResponse(json.dumps(appointList))
