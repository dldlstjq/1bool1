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
from datetime import datetime
from webdriver_manager.chrome import ChromeDriverManager

options = webdriver.ChromeOptions()
options.add_experimental_option('excludeSwitches', ['enable-logging'])
options.headless = True
options.add_argument('--no-sandbox')
options.add_argument("--single-process")
options.add_argument("--disable-dev-shm-usage")
options.add_argument("window-size=1400,1500")
options.add_experimental_option('excludeSwitches', ['enable-logging'])
# driver = webdriver.Chrome(r'/home/ubuntu/crawling/chromedriver', options=options)

def checkproduct(name, img_src, price, event, convinence):
    # 데이터 베이스에 있으면 가격 업데이트 시켜주기
    if(Goods.objects.filter(convinence=convinence).filter(name=name)):
        Goods.objects.filter(convinence=convinence, name=name).update(price=price)

    # 데이터 베이스에 없으면 새로 넣어준다
    else:
        good = Goods(name = name, photo_path=img_src, \
                price=price, is_sell=1, event=event, convinence = convinence)
        good.save()

# 이벤트가 아직 진행중인지 끝났는지 여부 확인
def event_check(convinence):
    # 현재 편의점의 모든 상품들 가져오기
    goods_list = Goods.objects.filter(convinence=convinence).all()

    # 상품들을 가져와서 update날짜가 오늘과 다르면 sell을 0으로 바꾸기
    for i in goods_list:
        if(i.update_date != datetime.today().strftime("%Y%m%d")):
            good = Goods.objects.filter(convinence=i.convinence, name=i.name).update(is_sell=0)

# def web_driver():
#     # driver = webdriver.Chrome(r'/home/ubuntu/crawling/chromedriver', options=options)
#     driver = webdriver.Chrome(ChromeDriverManager().install())

# @require_http_methods(["GET"])
def CU_Crawling(request):
    # web_driver()
    convinence = 'CU'
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
        # 편의점 이름 설정
        convinence = "cu"
        # 암묵적으로 웹 자원 로드를 위해 3초까지 기다린다
        driver = webdriver.Chrome(r'/home/ubuntu/crawling/chromedriver', options=options)
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
            try:
                items = soup.find_all("a", "prod_item")
            except:
                button = CU_BUTTON[idx + 1]
                driver.find_element_by_xpath(button).click()
                time.sleep(20)
                continue
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
                    text = item.find("div", "price").find("strong").text
                    temp = ""
                    for i in text:
                        if i.isdigit():
                            temp = temp + i
                    price = temp
                except:
                    price = 0
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
                checkproduct(name, img_src, int(price), event, convinence)
            
            # 한번하고 버튼 넘어감
            # 카테고리 넘어가는 버튼
            try:
                button = CU_BUTTON[idx + 1]
                driver.find_element_by_xpath(button).click()
                time.sleep(20)
            except:
                pass
            
                
    total()
    event_check(convinence)
    return HttpResponse('CU Success')

# @require_http_methods(["GET"])
def GS_Crawling(request):
    driver = webdriver.Chrome(r'/home/ubuntu/crawling/chromedriver', options=options)

    convinence = 'GS'
    # 전체 가져올건지 부분 가져올건지
    # category = request.GET.get("category")
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
        # Cu 행사페이지 url
        driver = webdriver.Chrome(ChromeDriverManager().install())

        url = 'http://gs25.gsretail.com/gscvs/ko/products/event-goods#;'
        # 마지막 페이지 번호 가져옴
        final_page_num = find_final_page(url, driver)
        time.sleep(5)
        # 암묵적으로 웹 자원 로드를 위해 3초까지 기다린다
        driver.get(url)
        element = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "prod_list")))

        # category = 1
        for i in range(final_page_num):
            html = driver.page_source
            soup = BeautifulSoup(html, 'html.parser')
            try:
                items = soup.find("ul", "prod_list").find_all("div", "prod_box")
            except:
                continue
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
                    text = item.find("span", "cost").text
                    text = text[:-1]
                    temp = ""
                    for i in text:
                        if i.isdigit():
                            temp = temp + i
                    price = temp
                except:
                    price = 0
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
                checkproduct(name, img_src, int(price), event, convinence)
                    
            element = driver.find_element_by_xpath("//*[@id=\"contents\"]/div[2]/div[3]/div/div/div[1]/div/a[3]")
            driver.execute_script("arguments[0].click();", element)
            time.sleep(5)
    
    promotion()
    event_check(convinence)
    return HttpResponse('GS Success')

# @require_http_methods(["GET"])
def SE_Crawling(request):
    driver = webdriver.Chrome(r'/home/ubuntu/crawling/chromedriver', options=options)

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
    # 편의점 이름 설정
    convinence = "SE"
    # 암묵적으로 웹 자원 로드를 위해 3초까지 기다린다
    driver.get("https://www.7-eleven.co.kr/product/presentList.asp")
    element = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "btn_product_01")))

    def promotion():
        # 페이지 옮겨다니면서 이벤트 상품들 가져오기
        for idx in range(4):
            while True:
                # 첫 페이지 더보기
                try: 
                # //*[@id="moreImg"]/a
                # //*[@id="listUl"]/li[15]/a
                #//*[@id="listUl"]/li[15]/a
                    # 최초랑 두번째부터가 다름 첫 실행 이후 가져오도록
                    driver.find_element_by_xpath("//*[@id=\"listUl\"]/li[15]/a").click()
                    time.sleep(15)
                except:
                    # 첫페이지가 없으면 두번째 페이지로 진행\
                    pass
                try:
                    driver.find_element_by_xpath("//*[@id=\"moreImg\"]/a").click()
                    time.sleep(15)
                    # 더 이상 넘길게 없으면 break
                except Exception as e:
                    break
            html = driver.page_source
            soup = BeautifulSoup(html, 'html.parser')
            try:
                items = soup.find_all("div", "pic_product")
            except:
                button = SE_BUTTON[idx + 1]
                element = driver.find_element_by_xpath(button)
                driver.execute_script("arguments[0].click();", element)
                time.sleep(20)
                continue
            # 크롤링 코드가 이상해 이전과 같은 부분을 가져오면 패스하도록 구현
            before_name = ""
            for item in items:
                    #이미지 태그 가져오는 부분
                    try:
                        img = item.find("img")
                        img_src = img.get("src")
                        img_src = "https://www.7-eleven.co.kr" + img_src
                    except:
                        img_src = ""
                    # 이름 가져오는 부분
                    try:
                        name = item.find("div", "name").text
                        if name == before_name:
                            continue
                        before_name = name
                    except:
                        name = ""
                    # 가격 가져오는 부분
                    try:
                        text = item.find("div", "price").find("span").text
                        temp = ""
                        for i in text:
                            if i.isdigit():
                                temp = temp + i
                        price = temp
                    except:
                        price = 0                       

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

                    checkproduct(name, img_src, int(price), event, convinence)

            #다음 카테고리 넘어가기
            try:
                button = SE_BUTTON[idx + 1]
                element = driver.find_element_by_xpath(button)
                driver.execute_script("arguments[0].click();", element)
                time.sleep(20)
            except:
                pass
    promotion()
    event_check(convinence)
    return HttpResponse('SE Success')


# @require_http_methods(["GET"])
def MS_Crawling(request):
    MS_BUTTON = [
        # 1+1 패스해야함
        "//*[@id=\"section\"]/div[3]/ul/li[1]/a",
        # 2+1
        "//*[@id=\"section\"]/div[3]/ul/li[2]/a",
        # N+N
        "//*[@id=\"section\"]/div[3]/ul/li[3]/a",
        # 덤증정
        "//*[@id=\"section\"]/div[3]/ul/li[4]/a",
        # 가격할인
        "//*[@id=\"section\"]/div[3]/ul/li[5]/a"

    ]
    driver = webdriver.Chrome(r'/home/ubuntu/crawling/chromedriver', options=options)
    
    # 편의점 이름 설정
    convinence = "MS"
    # 암묵적으로 웹 자원 로드를 위해 3초까지 기다린다
    driver.get("https://www.ministop.co.kr/")
    # 프레임 태그 내부로 이동
    
    element = driver.find_element_by_xpath("/html/frameset/frame") #iframe 태그 엘리먼트 찾기
    driver.switch_to.frame(element)
    element = driver.find_element_by_xpath("/html/frameset/frame[2]") #iframe 태그 엘리먼트 찾기
    driver.switch_to.frame(element)

    # 이벤트 페이지로 이동
    element = driver.find_element_by_xpath("//*[@id=\"menu1\"]/h2/a")
    driver.execute_script("arguments[0].click();", element)

    element = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "event_plus_list")))
    
    def promotion():
        # 페이지 옮겨다니면서 이벤트 상품들 가져오기
        for idx in range(5):
            cnt = 0
            while cnt < 10:
                try:
                    driver.find_element_by_xpath("//*[@id=\"section\"]/div[3]/div[3]/div/a[1]").click()
                    time.sleep(2)
                    cnt += 1
                    # 더 이상 넘길게 없으면 break
                except Exception as e:
                    break

            html = driver.page_source
            soup = BeautifulSoup(html, 'html.parser')
            try:
                items = soup.find("div", "event_plus_list").find("ul").find_all("li")
            except:
                button = MS_BUTTON[idx + 1]
                element = driver.find_element_by_xpath(button)
                driver.execute_script("arguments[0].click();", element)
                time.sleep(2)
                continue
            # 크롤링 코드가 이상해 이전과 같은 부분을 가져오면 패스하도록 구현
            for item in items:
                #이미지 태그 가져오는 부분
                try:
                    img = item.find("img")
                    img_src = img.get("src")
                    img_src = "https://www.ministop.co.kr/MiniStopHomePage/page/" + img_src[2:]
                except:
                    img_src = ""
                # 이름 가져오는 부분
                try:
                    # 내부 태그로 되어있어 자식 태그 제거하는 과정을 거치는 동시에 이름도 정제
                    price = item.find("p").strong.extract()
                    name = item.find("p").text
                    name = name[:-1]
                except Exception as e:
                    name = ""
                # 가격 가져오는 부분
                try:
                    text = price.text
                    temp = ""
                    for i in text:
                        if i.isdigit():
                            temp = temp + i
                    price = temp
                except:
                    price = 0     
                
                #행사 카테고리 가져오는 부분
                try:
                    # 1 + 1
                    if idx == 0:
                        event = 2
                    # 2 + 1
                    elif idx == 1:
                        event = 3
                    # N + N
                    elif idx == 2:
                        event = 4
                    # 덤증정
                    elif idx == 3:
                        event = 6
                    # 가격할인
                    elif idx == 4:
                        event = 5
                    else:
                        event = 1
                except:
                    event = 1

                checkproduct(name, img_src, int(price), event, convinence)

            try:
                button = MS_BUTTON[idx + 1]
                element = driver.find_element_by_xpath(button)
                driver.execute_script("arguments[0].click();", element)
                time.sleep(2)
            except:
                pass
    promotion()
    event_check(convinence)
    return HttpResponse("MS Success")

def EM_Crawling(request):
    convinence = 'EM'
    # 행사 상품 Crawling
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
        driver = webdriver.Chrome(r'/home/ubuntu/crawling/chromedriver', options=options)

        # 행사 분류하기
        for k in range(2, 7):
            xpath_element = '//*[@id="tabNew"]/ul/li['+str(k)+']/h4/a'

            # 마지막 페이지 찾기
            final_page_num = find_final_page(url, driver, xpath_element)

            # 암묵적으로 웹 자원 로드를 위해 3초까지 기다린다
            driver.implicitly_wait(time_to_wait=10)
            # req지정
            driver.get(url)
            element = driver.find_element_by_xpath(xpath_element)
            driver.execute_script("arguments[0].click();", element)
            time.sleep(5)

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
                            now = ''
                            for j in price:
                                if j == '원':
                                    break
                                if j == ',':
                                    continue
                                else:
                                    now += j
                            price = now
                        except:
                            price = 0
                    except:
                        pass
                
                    if k == 5:
                        k = 6
                    elif k == 6:
                        k = 5
                    elif k == 7:
                        k = 1

                    checkproduct(name, img_src, int(price), k, convinence)

                if (i == final_page_num-1):
                    time.sleep(10)
                    break
                else:
                    element = driver.find_element_by_xpath('//*[@id="regForm"]/div[2]/div[3]/div[3]/a[13]')
                    driver.execute_script("arguments[0].click();", element)
                    time.sleep(10)
            
    promotion()
    event_check(convinence)
    def total():
        pass
    return HttpResponse('Success')


def CS_Crawling(request):
    
    convinence = "CS"
    # 행사 상품 Crawling
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
        driver = webdriver.Chrome(r'/home/ubuntu/crawling/chromedriver', options=options)

        url = 'https://www.cspace.co.kr/service/product.html?prod_name_s=&id_position_move=calSelId'

        # 행사 분류하기
        for k in range(2, 6):
            xpath_element = '/html/body/section[3]/div/div[3]/ul/li['+str(k)+']/button'
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
                            img_src_now = 'https://www.cspace.co.kr'
                            st = 0
                            for j in img_src:
                                if j == ')':
                                    st = 0
                                if j == '"':
                                    continue
                                if st == 1:
                                    img_src_now += j
                                if j == '(':
                                    st = 1
                            
                        except:
                            img_src = ""

                        img_src = img_src_now
                        
                        #이름 가져오는 부분
                        try:
                            name = item.find('dt').text
                        except:
                            name = ""
                        # 가격 가져오는 부분
                        try:
                            price = item.find('dd').text
                            price_now = ''
                            for j in price:
                                if j == '원':
                                    break
                                if j == ',':
                                    continue
                                else:
                                    price_now += j
                            price = price_now
                        except:
                            price = 0
                    except:
                        pass


                    if k == 4:
                        k = 6
                    elif k == 5:
                        k = 5
                    
                    
                    checkproduct(name, img_src, int(price), k,convinence)

                if (i == final_page_num-1):
                    time.sleep(10)
                    break
                else:
                    element = driver.find_element_by_xpath('/html/body/section[3]/div/div[4]/div[2]/ul[1]/li[2]/a')
                    driver.execute_script("arguments[0].click();", element)
                    time.sleep(10)
    

    promotion()

    event_check(convinence)
    
    return HttpResponse('Success')