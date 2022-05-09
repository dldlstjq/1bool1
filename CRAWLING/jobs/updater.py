from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from .jobs import schedule_api
 
def start():
    scheduler = BackgroundScheduler()
    # 오전 3시가 되면 크롤링 시작
    scheduler.add_job(schedule_api, 'cron', hour=3)
    # scheduler.add_job(schedule_api, 'cron', minute=18)
    # 1분이 지나면 실행시킴
    # scheduler.add_job(schedule_api, 'interval', seconds=30)
    scheduler.start()