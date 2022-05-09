from django.conf import settings
from time import time
import requests
import json
from datetime import datetime



timeZone = datetime.now()
 
def schedule_api():
    from crawling import views
    # cu 크롤링 시작
    try:
        request = '/crawling/cu'
        views.CU_Crawling(request)
    except:
        print('cu크롤링에 문제가 있습니다')
    # gs 크롤링 시작
    try:
        request = '/crawling/gs'
        views.GS_Crawling(request)
    except:
        print('gs크롤링에 문제가 있습니다')
    # se 크롤링 시작
    try:
        request = '/crawling/se'
        views.SE_Crawling(request)
    except:
        print('SE크롤링에 문제가 있습니다')
    # ministop 크롤링 시작
    try:
        request = '/crawling/ms'
        views.MS_Crawling(request)
    except:
        print('MS크롤링에 문제가 있습니다')
    # emart 크롤링 시작
    try:
        print('em시작')
        request = '/crawling/em'
        views.EM_Crawling(request)
    except:
        print('EM크롤링에 문제가 있습니다')

    cspace 크롤링 시작
    try: 
        print('cs시작')
        request = '/crawling/cs'
        views.CS_Crawling(request)
    except:
        print('CS크롤링에 문제가 있습니다')