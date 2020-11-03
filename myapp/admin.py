from django.contrib import admin
from django.db import models
from .models import Patient, Doctor, Topic, Symptom, Photo, SymTransaction

# Register your models here.
admin.site.register(Patient)
admin.site.register(Doctor)
admin.site.register(Topic)
admin.site.register(Symptom)
admin.site.register(Photo)
admin.site.register(SymTransaction)


