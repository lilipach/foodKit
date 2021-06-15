from django.urls import path
from . import views

urlpatterns = [
    path("", views.index),
    path("authenticate", views.authenticate),
    path("signUp", views.signUp),
    path("home", views.home),
    path("recipeBrowser", views.recipeBrowser),
    path("addFavorite", views.addFavorite),
    path("sessionRecipes", views.sessionRecipes),
    path("removeFavorite", views.removeFavorite),
    path("deleteAccount", views.deleteAccount),
    path("logout", views.logout),
    path("createAccount", views.createAccount),
]
