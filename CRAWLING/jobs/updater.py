from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from .jobs import schedule_api
 
def start():
    scheduler = BackgroundScheduler()
    # # 1초가 되면 실행시킴
    # scheduler.add_job(schedule_api, 'cron', second=1)
    # 1분이 지나면 실행시킴
    scheduler.add_job(schedule_api, 'interval', seconds=30)
    scheduler.start()