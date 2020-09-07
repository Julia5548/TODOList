from django.db import models
from django.conf import settings
from todos.models import Todo

# Create your models here.


class Task(models.Model):
    id_todo = models.ForeignKey(Todo, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    is_completed = models.BooleanField(default=False, blank=True, null= True)


    def __str__(self):
        return self.title