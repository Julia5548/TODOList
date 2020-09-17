from rest_framework.generics import CreateAPIView
from rest_framework.response import Response

from task.models import Task
from rest.v1.task.serializers import TaskSerializer


class CreateTask(CreateAPIView):
    serializer_class = TaskSerializer
    
    