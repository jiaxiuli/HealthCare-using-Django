from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class Patient(models.Model):
    GENDER_CHOICES = [('M', 'Male'), ('F', 'Female')]
    user_id = models.CharField(max_length=150, null=True, blank=True)
    username = models.CharField(max_length=150, blank=True)
    first_name = models.CharField(max_length=20, blank=True)
    last_name = models.CharField(max_length=20, blank=True)
    age = models.CharField(max_length=20, blank=True)
    gender = models.CharField(max_length=2, choices=GENDER_CHOICES, blank=True)
    address = models.CharField(max_length=200, blank=True)
    symptom = models.TextField(max_length=300, null=True, blank=True)

    def __str__(self):
        return "username: {}, first_name:{},last_name: {}, age:{}, gender:{}, address:{}"\
            .format(self.username, self.first_name, self.last_name, self.age, self.gender, self.address)


class Doctor(models.Model):
    GENDER_CHOICES = [('M', 'Male'), ('F', 'Female')]
    user_id = models.CharField(max_length=150, null=True, blank=True)
    username = models.CharField(max_length=150, blank=True)
    first_name = models.CharField(max_length=20, blank=True)
    last_name = models.CharField(max_length=20, blank=True)
    age = models.CharField(max_length=20, blank=True)
    gender = models.CharField(max_length=2, choices=GENDER_CHOICES, blank=True)
    address = models.CharField(max_length=200, blank=True)
    department = models.CharField(max_length=150, blank=True)
    main = models.CharField(max_length=3000, blank=True)
    quote = models.CharField(max_length=3000, blank=True)

    def __str__(self):
        return "username: {}, first_name:{},last_name: {}, age:{}, gender:{}, address:{}, department:{}, main:{}, quote:{}" \
            .format(self.username, self.first_name, self.last_name, self.age, self.gender, self.address, self.department, self.main, self.quote)


class Topic(models.Model):
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Symptom(models.Model):
    user_id = models.CharField(max_length=150, null=True, blank=True)
    username = models.CharField(max_length=150, blank=True)
    to = models.CharField(max_length=150, blank=True)
    text = models.CharField(max_length=3000, blank=True)
    time = models.CharField(max_length=30, blank=True)

    def __str__(self):
        return "username: {}, to:{},text: {}, time:{}" \
            .format(self.username, self.to, self.text, self.time)


class Photo(models.Model):
    user_id = models.CharField(max_length=150, null=True, blank=True)
    img = models.ImageField(upload_to='img')

    def __str__(self):
        return "user_id: {}, img:{}".format(self.user_id, self.img)


class SymTransaction(models.Model):
    patient_id = models.CharField(max_length=150, null=True, blank=True)
    doctor_id = models.CharField(max_length=150, null=True, blank=True)
    sym_id = models.CharField(max_length=150, null=True, blank=True)
    send_time = models.CharField(max_length=150, null=True, blank=True)
    isRead = models.CharField(max_length=150, null=True, blank=True)

    def __str__(self):
        return "patient_id: {}, doctor_id:{}, sym_id:{}, send_time:{}, isRead:{} "\
            .format(self.patient_id, self.doctor_id, self.sym_id, self.send_time, self.isRead)


class ReplyTransaction(models.Model):
    patient_id = models.CharField(max_length=150, null=True, blank=True)
    doctor_id = models.CharField(max_length=150, null=True, blank=True)
    sym_id = models.CharField(max_length=150, null=True, blank=True)
    send_time = models.CharField(max_length=150, null=True, blank=True)
    isRead = models.CharField(max_length=150, null=True, blank=True)
    analysis = models.CharField(max_length=1000, null=True, blank=True)
    treatment = models.CharField(max_length=1000, null=True, blank=True)

    def __str__(self):
        return "patient_id: {}, doctor_id:{}, sym_id:{}, send_time:{}, isRead:{}, analysis:{}, treatment:{} "\
            .format(self.patient_id, self.doctor_id, self.sym_id, self.send_time, self.isRead
                    , self.analysis, self.treatment)


class Chat(models.Model):
    sender = models.CharField(max_length=150, null=True, blank=True)
    receiver = models.CharField(max_length=150, null=True, blank=True)
    time = models.CharField(max_length=150, null=True, blank=True)
    text = models.CharField(max_length=1000, null=True, blank=True)
    isRead = models.CharField(max_length=150, null=True, blank=True)

    def __str__(self):
        return "sender: {}, receiver:{}, time:{}, text:{}, isRead:{}"\
            .format(self.sender, self.receiver, self.time, self.text, self.isRead)
