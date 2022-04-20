from django.contrib import admin
from django.urls import path, include
from . import views
urlpatterns = [
    path('cu', views.CU_Crawling, name='cu_crawling'),
    path('gs', views.GS_Crawling, name='gs_crawling'),
]