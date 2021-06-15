from django.db import models

# Create your models here.
class user(models.Model):
    first_name = models.CharField(max_length=45)
    last_name = models.CharField(max_length=45)
    email = models.EmailField(max_length=60)
    password = models.CharField(max_length=60)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class recipe(models.Model):
    title = models.CharField(max_length=45)
    identifier = models.TextField(default="this is a recipe") #identified for recipe to be called from API
    users = models.ManyToManyField(user, related_name="recipes")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)  