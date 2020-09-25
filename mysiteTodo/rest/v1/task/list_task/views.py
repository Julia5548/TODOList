from rest_framework.generics import ListCreateAPIView
from django.shortcuts import get_object_or_404
from django.db import connection
from task.models import Task
from todos.models import Todo
from rest.v1.task.serializers import TaskSerializer


class TaskList(ListCreateAPIView):
    serializer_class = TaskSerializer

    def get_queryset(self):
        user = self.request.user
        id = self.kwargs['id_todo']

        return Task.objects.filter(id_todo__user = user, id_todo= id )