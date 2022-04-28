from django.conf import settings
from time import time
import requests
import json
from datetime import datetime



timeZone = datetime.now()
 
def schedule_api():
    from crawling import views
    try:
        views.CU_Crawling()
    except:
        print('cu크롤링에 문제가 있습니다')
    
    try:
        views.GS_Crawling()
    except:
        print('gs크롤링에 문제가 있습니다')

    try:
        SE_Crawling()
    except:
        print('SE크롤링에 문제가 있습니다')

    try:
        MS_Crawling()
    except:
        print('MS크롤링에 문제가 있습니다')

    try:
        EM_Crawling()
    except:
        print('EM크롤링에 문제가 있습니다')

    
    try:
        CS_Crawling()
    except:
        print('CS크롤링에 문제가 있습니다')