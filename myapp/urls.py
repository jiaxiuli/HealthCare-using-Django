from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from django.conf.urls import *
from django.contrib.auth import views as auth_views
from myapp import views
from django.views.static import serve
from django.conf import settings

app_name = 'myapp'

urlpatterns = [
    path(r'', views.IndexView.as_view(), name='index'),
    path('admin/', admin.site.urls),
    path(r'home',views.home, name='home'),
    path(r'userInfoChange',views.userInfoChange, name='userInfoChange'),
    path(r'userInfoChange_doctor',views.userInfoChange_doctor, name='userInfoChange_doctor'),
    path(r'account',views.account, name='account'),
    path(r'saveDoctorWorkInfo', views.saveDoctorWorkInfo, name='saveDoctorWorkInfo'),
    path(r'checkWorkInfo', views.checkWorkInfo, name='checkWorkInfo'),
    path(r'DeleteSymRecord',views.DeleteSymRecord, name='DeleteSymRecord'),
    path(r'addSymRecord',views.addSymRecord, name='addSymRecord'),
    path(r'getDoctorList', views.getDoctorList, name='getDoctorList'),
    path(r'sendRecordToDoctor', views.sendRecordToDoctor, name='sendRecordToDoctor'),
    path(r'getReceivedRecord', views.getReceivedRecord, name='getReceivedRecord'),
    path(r'getReceivedReply', views.getReceivedReply, name='getReceivedReply'),
    path(r'getChatHistory', views.getChatHistory, name='getChatHistory'),
    path(r'showChatHistory', views.showChatHistory, name='showChatHistory'),
    path(r'checkIfUnreadMessage', views.checkIfUnreadMessage, name='checkIfUnreadMessage'),
    path(r'messageHasBeenRead', views.messageHasBeenRead, name='messageHasBeenRead'),
    path(r'getReply', views.getReply, name='getReply'),
    path(r'chatTransaction', views.chatTransaction, name='chatTransaction'),
    path(r'searchUser', views.searchUser, name='searchUser'),
    path(r'patient', views.patient, name='patient'),
    path(r'recordIsRead', views.recordIsRead, name='recordIsRead'),
    path(r'replyIsRead', views.replyIsRead, name='replyIsRead'),
    url(r'^upload', views.uploadImg),
    path(r'patient_response', views.patient, name='patient_response'),
    path(r'doctor', views.doctor, name='doctor'),
    path(r'doctor_response', views.doctor, name='doctor_response'),
    path(r'login', views.user_login, name='user_login'),
    path(r'logout', views.user_logout, name='user_logout'),
    path(r'register', views.register, name='register'),
    url(r'^media/(?P<path>.*)$', serve, {"document_root": settings.MEDIA_ROOT}),


    path(r'accounts/', include('django.contrib.auth.urls')),
    path(r'password_change/done/',
         auth_views.PasswordChangeDoneView.as_view(template_name='registration/password_change_done.html'),
         name='password_change_done'),

    path(r'password_change/', auth_views.PasswordChangeView.as_view(template_name='registration/password_change.html'),
         name='password_change'),

    path(r'password_reset/done/',
         auth_views.PasswordResetCompleteView.as_view(template_name='registration/password_reset_done.html'),
         name='password_reset_done'),

    path(r'reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path(r'password_reset/', auth_views.PasswordResetView.as_view(), name='password_reset'),
    path(r'reset/done/',
         auth_views.PasswordResetCompleteView.as_view(template_name='registration/password_reset_complete.html'),
         name='password_reset_complete'),


]
