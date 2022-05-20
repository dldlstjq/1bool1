from django.contrib import admin
from django.urls import path, include
from . import views
urlpatterns = [
    path('check', views.checkproduct, name='checkproduct'),
    path('cu', views.CU_Crawling, name='cu_crawling'),
    path('gs', views.GS_Crawling, name='gs_crawling'),
    path('se', views.SE_Crawling, name='se_crawling'),
    path('ms', views.MS_Crawling, name='ms_crawling'),
    path('em', views.EM_Crawling, name='em_crawling'),
    path('cs', views.CS_Crawling, name='cs_crawling'),
]