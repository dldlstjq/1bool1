from django.shortcuts import render
from bs4 import BeautifulSoup
import requests
from django.http import HttpResponse
# Create your views here.
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
def CU_Crawling(request):
    # 행사 상품 Crawling
    print('start')
    def promotion():
        options = webdriver.ChromeOptions()
        options.add_experimental_option('excludeSwitches', ['enable-logging'])
        # Cu 행사페이지 url
        url = 'https://cu.bgfretail.com/event/plus.do?category=event&depth2=1&sf=N'
        driver = webdriver.Chrome('C:/Users/SSAFY/Desktop/SSAFY/자율PJT/CODE/chromedriver_win32/chromedriver.exe', options=options)
        # 암묵적으로 웹 자원 로드를 위해 3초까지 기다린다
        driver.get(url)
        # req지정
        element = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "prod_img")))
        html = driver.page_source
        soup = BeautifulSoup(html, 'html.parser')
        print(soup.find_all("div", "prodListWrap"))
        #a = driver.find_element_by_xpath('/html/body/form/div[3]/div[3]/div[2]/div').text
        #print(a)

    promotion()
    return HttpResponse('Success')