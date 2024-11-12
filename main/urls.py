from django.urls import path

from . import views

urlpatterns = [
    path('', views.index),
    path('download', views.download, name='download-view'),
    path('api/v1/download', views.download_api, name='download-api')
]