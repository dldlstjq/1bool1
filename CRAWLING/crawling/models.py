from django.db import models

# Create your models here.
class goods(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    event = models.IntegerField()
    hit = models.IntegerField()
    is_sell = models.IntegerField()
    photo_path = models.CharField(max_length=255)
    price = models.CharField(max_length=255)
    start_date = models.DateTimeField(auto_now_add=True)
    update_date = models.DateTimeField(auto_now=True)
    category = models.IntegerField()
    convinence = models.CharField(max_length=255)