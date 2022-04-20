from django.shortcuts import render
from bs4 import BeautifulSoup
import requests
from django.http import HttpResponse
# Create your views here.
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from urllib.request import urlopen
import time

def CU_Crawling(request):
    # 전체 가져올건지 부분 가져올건지
    category = request.GET.get("category")
    # 행사 상품 Crawling
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
        while True:
            try:
                driver.find_element_by_xpath("//*[@id=\"contents\"]/div[2]/div/div/div[1]/a").click()
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
            img = item.find("img", "prod_img")
            img_src = img.get("src")
            # 이름 가져오는 부분
            name = item.find("div", "name").find("p").text
            # 가격 가져오는 부분
            price = item.find("div", "price").find("strong").text
            # 행사 카테고리 가져오는 부분
            item_promotion = item.find("div","badge").find("span").text

    if category == "promotion":
        promotion()
    elif category == "total":
        total()
    def total():
        pass

    #promotion()
    return HttpResponse('Success')


def Emart24_Crawling(request):
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
        # element = driver.find_element_by_xpath("//*[@id=\"contents\"]/div[2]/div[3]/div/div/div[1]/div/a[1]")
        # driver.execute_script("arguments[0].click();", element)
        # time.sleep(2)
        return int(final_page_num)

    def promotion():
        # Cu 행사페이지 url
        url = 'https://emart24.co.kr/product/eventProduct.asp'
        driver = webdriver.Chrome(ChromeDriverManager().install())

        # 행사 분류하기
        for k in range(2, 8):
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
            time.sleep(5)
            
            for i in range(final_page_num):
                html = driver.page_source
                soup = BeautifulSoup(html, 'html.parser')
                items = soup.find("ul", "categoryListNew").find_all("div", "box")
                

                for item in items:
                    try:
                        # 클래스를 연결해서 사진 지정하기
                        img = item.find("p", attrs={'class':'productImg'})
                        # p 안에 있는 img 안에있는 src만 뽑기
                        img_src = img.find('img').get('src')
                        print(img_src)
                        #이름 가져오는 부분
                        name = item.find("p", attrs={'class':'productDiv'}).text
                        # 가격 가져오는 부분
                        price = item.find("p", attrs={'class':'price'}).text
                        print(name)
                    except:
                        pass

                print(i, final_page_num)
                if (i == final_page_num-1):
                    print('##########################################')
                    time.sleep(5)
                else:
                    print('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
                    element = driver.find_element_by_xpath('//*[@id="regForm"]/div[2]/div[3]/div[3]/a[13]')
                    driver.execute_script("arguments[0].click();", element)
                    time.sleep(5)
            
        
    if category == "promotion":
        promotion()
    elif category == "total":
        total()
    promotion()
    def total():
        pass
    return HttpResponse('Success')