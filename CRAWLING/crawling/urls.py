from django.contrib import admin
from django.urls import path, include
from . import views
urlpatterns = [
    path('cu_promotion/', views.CU_Crawling, name='cu_crawling'),
]