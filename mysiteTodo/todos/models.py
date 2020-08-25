from django.db import models
from django.conf import settings

# Create your models here.


class Todo(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default = '38')
    name = models.CharField(max_length=200)
    completed = models.BooleanField(default=False, blank=True, null= True)


    def __str__(self):
        return self.name