# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Board(models.Model):
    id = models.BigAutoField(primary_key=True)
    content = models.CharField(max_length=255)
    nickname = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    photo = models.CharField(max_length=255, blank=True, null=True)
    start_date = models.DateTimeField()
    title = models.CharField(max_length=255)
    update_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'board'


class BoardLikeManagement(models.Model):
    id = models.BigAutoField(primary_key=True)
    is_liked = models.IntegerField(blank=True, null=True)
    board = models.ForeignKey(Board, models.DO_NOTHING)
    user = models.ForeignKey('User', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'board_like_management'


class Comment(models.Model):
    id = models.BigAutoField(primary_key=True)
    content = models.CharField(max_length=255)
    nickname = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    board = models.ForeignKey(Board, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'comment'


class Event(models.Model):
    id = models.BigAutoField(primary_key=True)
    date = models.DateTimeField(blank=True, null=True)
    photo_path = models.CharField(max_length=255, blank=True, null=True)
    title = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'event'


class Goods(models.Model):
    id = models.BigAutoField(primary_key=True)
    category = models.IntegerField(blank=True, null=True)
    convinence = models.CharField(max_length=255, blank=True, null=True)
    description = models.CharField(max_length=255, blank=True, null=True)
    event = models.IntegerField(blank=True, null=True)
    hit = models.IntegerField(blank=True, null=True)
    is_sell = models.IntegerField(blank=True, null=True)
    name = models.CharField(max_length=255)
    photo_path = models.CharField(max_length=255, blank=True, null=True)
    price = models.IntegerField()
    start_date = models.DateTimeField(auto_now_add = True)
    update_date = models.DateTimeField(auto_now = True, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'goods'


class GoodsReview(models.Model):
    id = models.BigAutoField(primary_key=True)
    content = models.CharField(max_length=255)
    nickname = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    goods = models.ForeignKey(Goods, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'goods_review'


class GoodsUserManagement(models.Model):
    id = models.BigAutoField(primary_key=True)
    is_liked = models.IntegerField(blank=True, null=True)
    is_notification = models.IntegerField(blank=True, null=True)
    goods = models.ForeignKey(Goods, models.DO_NOTHING)
    user = models.ForeignKey('User', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'goods_user_management'


class Recipe(models.Model):
    id = models.BigAutoField(primary_key=True)
    content = models.CharField(max_length=255, blank=True, null=True)
    nickname = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    photo = models.CharField(max_length=255, blank=True, null=True)
    start_date = models.DateTimeField()
    title = models.CharField(max_length=255)
    update_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'recipe'


class RecipeGoods(models.Model):
    id = models.BigAutoField(primary_key=True)
    goods = models.ForeignKey(Goods, models.DO_NOTHING)
    recipe = models.ForeignKey(Recipe, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'recipe_goods'


class RecipeLikeManagement(models.Model):
    id = models.BigAutoField(primary_key=True)
    is_liked = models.IntegerField(blank=True, null=True)
    recipe = models.ForeignKey(Recipe, models.DO_NOTHING)
    user = models.ForeignKey('User', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'recipe_like_management'


class RecipeReview(models.Model):
    id = models.BigAutoField(primary_key=True)
    content = models.CharField(max_length=255, blank=True, null=True)
    nickname = models.CharField(max_length=255, blank=True, null=True)
    password = models.CharField(max_length=255, blank=True, null=True)
    recipe = models.ForeignKey(Recipe, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'recipe_review'


class User(models.Model):
    id = models.BigAutoField(primary_key=True)
    email = models.CharField(max_length=255)
    is_withdrawal = models.IntegerField(blank=True, null=True)
    nickname = models.CharField(max_length=255)
    password = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'user'
