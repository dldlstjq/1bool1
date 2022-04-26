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
from webdriver_manager.chrome import ChromeDriverManager
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
        driver = webdriver.Chrome(ChromeDriverManager().install())
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
                    break
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

        for i in range(final_page_num):
            html = driver.page_source
            soup = BeautifulSoup(html, 'html.parser')
            items = soup.find("ul", "prod_list").find_all("div", "prod_box")
            for item in items:
                try:
                    #이미지 태그 가져오는 부분
                    img = item.find("img")
                    img_src = img.get("src")
                    #이름 가져오는 부분
                    name = item.find("p", "tit").text
                    # 가격 가져오는 부분
                    price = item.find("span", "cost").text
                    # # 행사 카테고리 가져오는 부분
                    item_promotion = item.find("p","flg01").find("span").text
                except:
                    pass
            element = driver.find_element_by_xpath("//*[@id=\"contents\"]/div[2]/div[3]/div/div/div[1]/div/a[3]")
            driver.execute_script("arguments[0].click();", element)
            time.sleep(5)
    
    if category == "promotion":
        promotion()
    elif category == "total":
        total()
    promotion()
    def total():
        pass
    return HttpResponse('GS Success')


def Emart_Crawling(request):
    # 행사 상품 Crawling
    print('start')
    category = request.GET.get("category")
    def find_final_page(url, driver, xpath_element):
        driver.get(url)
        # 행사 상품으로 이동
        element = driver.find_element_by_xpath(xpath_element)
        driver.execute_script("arguments[0].click();", element)
        time.sleep(2)
        # 페이지 불러오기 딜레이 타임
        element = driver.find_element_by_xpath("//*[@id='regForm']/div[2]/div[3]/div[3]/a[14]")
        driver.execute_script("arguments[0].click();", element)
        time.sleep(5)

        html = driver.page_source
        soup = BeautifulSoup(html, 'html.parser')
        final_page_num = soup.find("div", "paging").find("a", "on").text
        return int(final_page_num)
 
    def promotion():
        # Emart 행사페이지 url
        url = 'https://emart24.co.kr/product/eventProduct.asp'
        driver = webdriver.Chrome(ChromeDriverManager().install())
        

        # 행사 분류하기
        for k in range(2, 3):
            xpath_element = '//*[@id="tabNew"]/ul/li['+str(k)+']/h4/a'
            print(xpath_element)

            # 마지막 페이지 찾기
            final_page_num = find_final_page(url, driver, xpath_element)

            # 암묵적으로 웹 자원 로드를 위해 3초까지 기다린다
            driver.implicitly_wait(time_to_wait=10)
            # req지정
            driver.get(url)
            element = driver.find_element_by_xpath(xpath_element)
            driver.execute_script("arguments[0].click();", element)
            time.sleep(3)
            
            for i in range(final_page_num):
                html = driver.page_source
                soup = BeautifulSoup(html, 'html.parser')
                items = soup.find("ul", "categoryListNew").find_all("div", "box")
                

                for item in items:
                    try:
                        # 클래스를 연결해서 사진 지정하기
                        try:
                            img = item.find("p", attrs={'class':'productImg'})
                            # p 안에 있는 img 안에있는 src만 뽑기
                            img_src = img.find('img').get('src')
                        except:
                            img_src = ""
                        
                        #이름 가져오는 부분
                        try:
                            name = item.find("p", attrs={'class':'productDiv'}).text
                        except:
                            name = ""
                        # 가격 가져오는 부분
                        try:
                            price = item.find("p", attrs={'class':'price'}).text
                        except:
                            price = ""
                    except:
                        pass


                    if k == 5:
                        k = 6
                    elif k == 6:
                        k = 5
                    elif k == 7:
                        k = 1
                        
                    # good = Goods(name = name, photo_path=img_src, \
                    # price=price, is_sell=1, event=k, convinence = "EMART")
                    # good.save()

                if (i == final_page_num-1):
                    time.sleep(10)
                    break
                else:
                    element = driver.find_element_by_xpath('//*[@id="regForm"]/div[2]/div[3]/div[3]/a[13]')
                    driver.execute_script("arguments[0].click();", element)
                    time.sleep(10)
            
        
    if category == "promotion":
        promotion()
    elif category == "total":
        total()
    promotion()
    def total():
        pass
    return HttpResponse('Success')


def Ministop_Crawling(request):
    # 더보기 창 들어가기
    def find_final_page(url, driver, xpath_element):
        # 더보기 가장 아래까지 내리기
        for _ in range(30):
            event_click = driver.find_element('#menu1 > h2 > a')   
            driver.execute_script("arguments[0].click();", element)
            time.sleep(5)

    def promotion():
        # Cu 행사페이지 url
        url = 'https://www.ministop.co.kr/'
        driver = webdriver.Chrome(ChromeDriverManager().install())
        driver.get(url)
        driver.implicitly_wait(time_to_wait=5)
        print('##############################################################')

        driver.switch_to.frame('frame2nd')
        driver.switch_to_default_content

        # 행사 분류하기
        for k in range(2, 6):
            # 이벤트 페이지 접속하기
            xpath_element = '//*[@id="menu1"]/h2/a'
            element = driver.find_element_by_xpath(xpath_element).click
            time.sleep(2)
            
            # k == 1 없음 2 : 1+1 3: 2+1 4: 3+1 5 : SALE 6 : 덤증정
            if k == 2:
                xpath_element = '//*[@id="section"]/div[3]/ul/li[1]/a'
            elif k == 3:
                xpath_element = '//*[@id="section"]/div[3]/ul/li[2]/a'
            elif k == 4:
                xpath_element = '//*[@id="section"]/div[3]/ul/li[3]/a'
            elif k == 5:
                xpath_element = '//*[@id="section"]/div[3]/ul/li[5]/a'
            elif k == 6:
                xpath_element = '//*[@id="section"]/div[3]/ul/li[4]/a'

            # 더보기 마지막까지 내리기
            find_final_page(url, driver, xpath_element)

            # 암묵적으로 웹 자원 로드를 위해 3초까지 기다린다
            driver.implicitly_wait(time_to_wait=10)
            html = driver.page_source
            soup = BeautifulSoup(html, 'html.parser')
            items = soup.find("ul").find_all("div", "event_plus_list")
                

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

                # 데이터 저장하는 부분 
                good = Goods(name = name, photo_path=img_src, \
                price=price, is_sell=1, event=k, convinence = "MINISTOP")
                good.save()
            
    promotion()
    return HttpResponse('Success')


def Cspace_Crawling(request):
    # 행사 상품 Crawling
    print('start')
    category = request.GET.get("category")
    def find_final_page(url, driver, xpath_element):
        driver.get(url)
        # 행사 상품으로 이동
        element = driver.find_element_by_xpath(xpath_element)
        driver.execute_script("arguments[0].click();", element)
        time.sleep(10)
        # 페이지 불러오기 딜레이 타임
        element = driver.find_element_by_xpath("/html/body/section[3]/div/div[4]/div[2]/ul[2]/li[8]/a")
        driver.execute_script("arguments[0].click();", element)
        time.sleep(5)

        html = driver.page_source
        soup = BeautifulSoup(html, 'html.parser')
        final_page_num = soup.find("ul", "pagination").find("a", "active").text
        return int(final_page_num)
 
    def promotion():
        # Emart 행사페이지 url
        url = 'https://www.cspace.co.kr/service/product.html?prod_name_s=&id_position_move=calSelId'
        driver = webdriver.Chrome(ChromeDriverManager().install())

        # 행사 분류하기
        for k in range(2, 6):
            xpath_element = '/html/body/section[3]/div/div[3]/ul/li['+str(k)+']/button'
            print(xpath_element)
            time.sleep(3)

            if k == 4:
                continue

            # 마지막 페이지 찾기
            final_page_num = find_final_page(url, driver, xpath_element)

            # 암묵적으로 웹 자원 로드를 위해 3초까지 기다린다
            driver.implicitly_wait(time_to_wait=10)
            # req지정
            driver.get(url)
            element = driver.find_element_by_xpath(xpath_element)
            driver.execute_script("arguments[0].click();", element)
            time.sleep(3)
            
            for i in range(final_page_num):
                html = driver.page_source
                soup = BeautifulSoup(html, 'html.parser')
                items = soup.find("ul", "box").find_all("li")

                for item in items:
                    try:
                        try:
                            img = item.find("span")
                            # p 안에 있는 img 안에있는 src만 뽑기
                            img_src = img.get('style')
                            now = ''
                            st = 0
                            for j in img_src:
                                if j == ')':
                                    st = 0
                                if st == 1:
                                    now += i
                                if j == '(':
                                    st = 1
                            
                        except:
                            img_src = ""
                        
                        #이름 가져오는 부분
                        try:
                            name = item.find('dt').text
                        except:
                            name = ""
                        # 가격 가져오는 부분
                        try:
                            price = item.find('dd').text
                        except:
                            price = ""
                    except:
                        pass


                    if k == 4:
                        k = 6
                    elif k == 5:
                        k = 5
                        
                    good = Goods(name = name, photo_path=img_src, \
                    price=price, is_sell=1, event=k, convinence = "Cspace")
                    good.save()

                if (i == final_page_num-1):
                    time.sleep(10)
                    break
                else:
                    element = driver.find_element_by_xpath('/html/body/section[3]/div/div[4]/div[2]/ul[1]/li[2]/a')
                    driver.execute_script("arguments[0].click();", element)
                    time.sleep(10)
            
        
    if category == "promotion":
        promotion()
    elif category == "total":
        total()
    promotion()
    def total():
        pass
    return HttpResponse('Success')