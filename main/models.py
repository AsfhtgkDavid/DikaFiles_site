import os

from django.db import models
from django.db.models import FileField, CharField
from django.db.models.signals import pre_delete, pre_save
from django.dispatch import receiver

from core.models import BaseModel


# Create your models here.
class AppFile(BaseModel):
    platform = CharField(max_length=50, default="linux")
    version = CharField(max_length=20, default="1.0.0")
    file = FileField(upload_to="files/AppFile/")


@receiver(pre_delete, sender=AppFile)
def delete(sender, instance, **kwargs):
    file_path = instance.file.path

    if os.path.exists(file_path):
        os.remove(file_path)


@receiver(pre_save, sender=AppFile)
def edit(sender, instance, **kwargs):
    file_path = instance.file.path

    if os.path.exists(file_path):
        os.remove(file_path)