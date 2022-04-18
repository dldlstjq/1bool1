from django.shortcuts import render
from bs4 import BeautifulSoup
import requests
from django.http import HttpResponse
# Create your views here.
from selenium import webdriver

def CU_Crawling(request):
    # 행사 상품 Crawling
    print('start')
    def promotion():
        # Cu 행사페이지 url
        url = 'https://cu.bgfretail.com/event/plus.do?category=event&depth2=1&sf=N'
        driver = webdriver.Chrome('C:/Users/SSAFY/Desktop/SSAFY/자율PJT/CODE/chromedriver_win32/chromedriver.exe')
        # 암묵적으로 웹 자원 로드를 위해 3초까지 기다린다
        driver.implicitly_wait(time_to_wait=10)
        # req지정
        driver.get(url)
        html = driver.page_source
        soup = BeautifulSoup(html, 'html.parser')
        print(driver.find_element_by_xpath('//*[@id="contents"]/div[2]/div/ul').text)
        


    promotion()
    return HttpResponse('Success')