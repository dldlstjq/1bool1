from django.apps import AppConfig


class CrawlingConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'crawling'

    def ready(self):
        # print("this is Django-apps.py ready function()")
        from jobs import updater
        updater.start()
