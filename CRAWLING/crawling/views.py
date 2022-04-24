from django.shortcuts import render
from bs4 import BeautifulSoup
import requests
from django.http import HttpResponse
# Create your views here.
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from django.views.decorators.http import require_http_methods
from selenium.webdriver.common.keys import Keys
import time
from .models import Goods

@require_http_methods(["GET"])
def CU_Crawling(request):
    CU_BUTTON = [
        # 간편 식사
        "//*[@id=\"contents\"]/div[1]/ul/li[1]/a",
        # 즉석 조리
        "//*[@id=\"contents\"]/div[1]/ul/li[2]/a",
        # 과자류
        "//*[@id=\"contents\"]/div[1]/ul/li[3]/a",
        # 아이스크림
        "//*[@id=\"contents\"]/div[1]/ul/li[4]/a",
        # 식품
        "//*[@id=\"contents\"]/div[1]/ul/li[5]/a",
        # 음료
        "//*[@id=\"contents\"]/div[1]/ul/li[6]/a",
        # 생활용품
        "//*[@id=\"contents\"]/div[1]/ul/li[7]/a",
    ]
    CU_CATEGORY = [
        # 1: 식품, 2: 과자, 3: 아이스크림, 4: 음료, 5, 생활용품
        1,
        1,
        2,
        3,
        1,
        4,
        5,
    ]
    # 전체 상품 Crawling
    def total():
        options = webdriver.ChromeOptions()
        options.add_experimental_option('excludeSwitches', ['enable-logging'])
        # 편의점 이름 설정
        convinence = "cu"
        driver = webdriver.Chrome('C:/Users/SSAFY/Desktop/SSAFY/자율PJT/CODE/chromedriver_win32/chromedriver.exe', options=options)
        # 암묵적으로 웹 자원 로드를 위해 3초까지 기다린다
        driver.get("https://cu.bgfretail.com/product/product.do?category=product&depth2=4&depth3=1")
        element = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "prod_img")))
        # 전체 URL을 돌벼 데이터 크롤링
        for idx in range(len(CU_BUTTON)):
            # 카테고리 저장을 위한 이름 설정
            category = CU_CATEGORY[idx]

            while True:
                try:
                    driver.find_element_by_xpath("//*[@id=\"dataTable\"]/div/div[1]/a").click()
                    # 안전한 페이지 로딩을 위해 30초의 대기시간
                    time.sleep(30)
                except:
                    break
            html = driver.page_source
            soup = BeautifulSoup(html, 'html.parser')
            items = soup.find_all("a", "prod_item")
    
            for item in items:
                #이미지 태그 가져오는 부분
                try:
                    img = item.find("img", "prod_img")
                    img_src = img.get("src")
                except:
                    img_src = ""
                # 이름 가져오는 부분
                try:
                    name = item.find("div", "name").find("p").text
                except:
                    name = ""
                # 가격 가져오는 부분
                try:
                    price = item.find("div", "price").find("strong").text
                except:
                    price = ""
                # 행사 카테고리 가져오는 부분
                try:
                    item_promotion = item.find("div","badge").find("span").text
                    event = 1
                    if item_promotion == "1+1":
                        event = 2
                    elif item_promotion == "2+1":
                        event = 3
                except:
                    event = 1
                # 데이터 저장하는 부분 
                good = Goods(name = name, photo_path=img_src, \
                price=price, is_sell=1, category=category, event=event, convinence = "CU")
                good.save()
            
            # 한번하고 버튼 넘어감
            # 카테고리 넘어가는 버튼
            try:
                button = CU_BUTTON[idx + 1]
                driver.find_element_by_xpath(button).click()
                time.sleep(20)
            except:
                pass
            
                
    total()
    return HttpResponse('CU Success')

@require_http_methods(["GET"])
def GS_Crawling(request):
    # 전체 가져올건지 부분 가져올건지
    category = request.GET.get("category")
    def find_final_page(url, driver):
        driver.get(url)
        # 전체 페이지로 이동
        driver.find_element_by_css_selector("#TOTAL").click()
        time.sleep(2)
        # 마지막 페이지 번호 가져오기 위한 parsing
        element = driver.find_element_by_xpath("//*[@id=\"contents\"]/div[2]/div[3]/div/div/div[1]/div/a[4]")
        driver.execute_script("arguments[0].click();", element)
        time.sleep(5)
        html = driver.page_source
        soup = BeautifulSoup(html, 'html.parser')
        final_page_num = soup.find("div", "paging").find("a", "on").text
        element = driver.find_element_by_xpath("//*[@id=\"contents\"]/div[2]/div[3]/div/div/div[1]/div/a[1]")
        driver.execute_script("arguments[0].click();", element)
        time.sleep(2)
        return int(final_page_num)
        
    # 행사 상품 Crawling
    def promotion():
        options = webdriver.ChromeOptions()
        options.add_experimental_option('excludeSwitches', ['enable-logging'])
        # Cu 행사페이지 url
        url = 'http://gs25.gsretail.com/gscvs/ko/products/event-goods#;'
        driver = webdriver.Chrome('C:/Users/SSAFY/Desktop/SSAFY/자율PJT/CODE/chromedriver_win32/chromedriver.exe', options=options)
        # 마지막 페이지 번호 가져옴
        final_page_num = find_final_page(url, driver)
        time.sleep(5)
        # 암묵적으로 웹 자원 로드를 위해 3초까지 기다린다
        driver.get(url)
        element = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "prod_list")))

        category = 1
        for i in range(final_page_num):
            html = driver.page_source
            soup = BeautifulSoup(html, 'html.parser')
            items = soup.find("ul", "prod_list").find_all("div", "prod_box")
            for item in items:
                
                #이미지 태그 가져오는 부분
                try:
                    img = item.find("img")
                    img_src = img.get("src")
                except:
                    img_src = ""
                #이름 가져오는 부분
                try:
                    name = item.find("p", "tit").text
                except:
                    name = ""
                # 가격 가져오는 부분
                try:
                    price = item.find("span", "cost").text
                    price = price[:-2]
                except:
                    price = ""
                # # 행사 카테고리 가져오는 부분
                try:
                    item_promotion = item.find("p","flg01").find("span").text
                    event = 1
                    if item_promotion == "1+1":
                        event = 2
                    elif item_promotion == "2+1":
                        event = 3
                    elif item_promotion == "3+1":
                        event = 4
                    # 덤증정 
                    else:
                        event = 5
                except:
                    item_promotion = 1
                # 데이터 저장하는 부분 
                # gs는 카테고리가 안나뉘어 져있어서 우선은 기본으로 진행 
                good = Goods(name = name, photo_path=img_src, \
                price=price, is_sell=1, category=category, event=event, convinence = "GS")
                good.save()

                
                    
            element = driver.find_element_by_xpath("//*[@id=\"contents\"]/div[2]/div[3]/div/div/div[1]/div/a[3]")
            driver.execute_script("arguments[0].click();", element)
            time.sleep(5)
    
    promotion()
    return HttpResponse('GS Success')

@require_http_methods(["GET"])
def SE_Crawling(request):
    SE_BUTTON = [
        # 1+1 패스해야함
        "",
        # 2+1
        "//*[@id=\"actFrm\"]/div[3]/div[1]/ul/li[2]/a",
        # 증정행사
        "//*[@id=\"actFrm\"]/div[3]/div[1]/ul/li[3]/a",
        # 할인행사
        "//*[@id=\"actFrm\"]/div[3]/div[1]/ul/li[4]/a"
    ]
    options = webdriver.ChromeOptions()
    options.add_experimental_option('excludeSwitches', ['enable-logging'])
    # 편의점 이름 설정
    convinence = "SE"
    driver = webdriver.Chrome('C:/Users/SSAFY/Desktop/SSAFY/자율PJT/CODE/chromedriver_win32/chromedriver.exe', options=options)
    # 암묵적으로 웹 자원 로드를 위해 3초까지 기다린다
    driver.get("https://www.7-eleven.co.kr/product/presentList.asp")
    element = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "btn_product_01")))

    def promotion():
        # 페이지 옮겨다니면서 이벤트 상품들 가져오기
        for idx in range(4):
            while True:
                # 첫 페이지 더보기
                try: 
                    # 최초랑 두번째부터가 다름 첫 실행 이후 가져오도록
                    driver.find_element_by_xpath("//*[@id=\"listUl\"]/li[15]/a").click()
                    time.sleep(15)
                except:
                    # 첫페이지가 없으면 두번째 페이지로 진행
                    try:
                        driver.find_element_by_xpath("//*[@id=\"moreImg\"]/a").click()
                        # 안전한 페이지 로딩을 위해 30초의 대기시간
                        time.sleep(15)
                        break
                    except Exception as e:
                        break
            html = driver.page_source
            soup = BeautifulSoup(html, 'html.parser')
            items = soup.find_all("div", "pic_product")
            for item in items:
                    #이미지 태그 가져오는 부분
                    try:
                        img = item.find("img")
                        img_src = img.get("src")
                    except:
                        img_src = ""
                    # 이름 가져오는 부분
                    try:
                        name = item.find("div", "name").text
                    except:
                        name = ""
                    # 가격 가져오는 부분
                    try:
                        price = item.find("div", "price").find("span").text
                    except:
                        price = ""
                    # 행사 카테고리 가져오는 부분
                    try:
                        if idx == 0:
                            event = 2
                        elif idx == 1:
                            event = 3
                        elif idx == 2:
                            event = 6
                        elif idx == 4:
                            event =5
                    except:
                        event = 1
                    print(img_src, name, price)

            print("FINISH")
            #다음 카테고리 넘어가기
            try:
                button = SE_BUTTON[idx + 1]
                driver.find_element_by_xpath(button).click()
                time.sleep(20)
            except Exception as e:
                print(e)
    promotion()

    return HttpResponse('GS Success')



