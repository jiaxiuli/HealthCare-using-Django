from django import forms
from myapp.models import Patient, Doctor, Symptom, Photo, SymTransaction, ReplyTransaction, Chat, Appointment
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class PatientForm(forms.ModelForm):
    class Meta:
        model = Patient
        first_name = forms.CharField(required=False)
        last_name = forms.CharField(required=False)
        age = forms.CharField(required=False)
        gender = forms.CharField(required=False)
        address = forms.CharField(required=False)
        user_id = forms.CharField(required=False)
        symptom = forms.CharField(required=False)
        fields = {'first_name', 'last_name', 'age', 'gender', 'address', 'user_id', 'symptom'}


class DoctorForm(forms.ModelForm):
    class Meta:
        model = Doctor
        first_name = forms.CharField(required=False)
        last_name = forms.CharField(required=False)
        age = forms.CharField(required=False)
        gender = forms.CharField(required=False)
        address = forms.CharField(required=False)
        user_id = forms.CharField(required=False)
        department = forms.CharField(required=False)
        main = forms.CharField(required=False)
        quote = forms.CharField(required=False)

        fields = {'first_name', 'last_name', 'age', 'gender', 'address', 'user_id', 'department', 'main', 'quote'}


class UserCreationForm(UserCreationForm):
    email = forms.EmailField(required=True)
    identity = forms.CharField(required=True)

    class Meta:
        model = User
        fields = ("username", "email", "password1", "password2", "identity")


class SymptomForm(forms.ModelForm):
    class Meta:
        model = Symptom
        username = forms.CharField(required=False)
        to = forms.CharField(required=False)
        text = forms.CharField(required=False)
        time = forms.CharField(required=False)
        user_id = forms.CharField(required=False)
        fields = {'username', 'to', 'text', 'time', 'user_id'}


class PhotoForm(forms.ModelForm):
    class Meta:
        model = Photo
        user_id = forms.CharField(required=False)
        img = forms.FileField(required=False)
        fields = {'user_id', 'img'}


class SymTransactionForm(forms.ModelForm):
    class Meta:
        model = SymTransaction
        patient_id = forms.CharField(required=False)
        doctor_id = forms.CharField(required=False)
        sym_id = forms.CharField(required=False)
        send_time = forms.CharField(required=False)
        isRead = forms.CharField(required=False)
        fields = {'patient_id', 'doctor_id', 'sym_id', 'send_time', 'isRead'}


class ReplyTransactionForm(forms.ModelForm):
    class Meta:
        model = ReplyTransaction
        patient_id = forms.CharField(required=False)
        doctor_id = forms.CharField(required=False)
        sym_id = forms.CharField(required=False)
        send_time = forms.CharField(required=False)
        isRead = forms.CharField(required=False)
        analysis = forms.CharField(required=False)
        treatment = forms.CharField(required=False)
        fields = {'patient_id', 'doctor_id', 'sym_id', 'send_time', 'isRead', 'analysis', 'treatment'}


class ChatForm(forms.ModelForm):
    class Meta:
        model = Chat

        sender = forms.CharField(required=False)
        receiver = forms.CharField(required=False)
        time = forms.CharField(required=False)
        text = forms.CharField(required=False)
        isRead = forms.CharField(required=False)

        fields = {'sender', 'receiver', 'time', 'text', 'isRead'}


class AppointmentForm(forms.ModelForm):
    class Meta:
        model = Appointment

        patient = forms.CharField(required=False)
        doctor = forms.CharField(required=False)
        time = forms.CharField(required=False)
        date = forms.CharField(required=False)

        fields = {'patient', 'doctor', 'time', 'date'}
