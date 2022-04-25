from django.contrib import admin
from django.urls import path, include
from . import views
urlpatterns = [
    path('cu', views.CU_Crawling, name='cu_crawling'),
    path('gs', views.GS_Crawling, name='gs_crawling'),
    path('emart', views.Emart_Crawling, name='emart_crawling'),
    path('ministop', views.Ministop_Crawling, name='ministop_crawling'),
    path('Cspace', views.Cspace_Crawling, name='Cspace_crawling'),
]