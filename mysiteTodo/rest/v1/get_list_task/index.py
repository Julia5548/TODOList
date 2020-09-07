from rest_framework.generics import ListAPIView
from rest_framework.response import Response

from task.models import Task
from task.serializers import TaskSerializer


class GetTaskList(ListAPIView):
    serializer_class = TaskSerializer

    def get_queryset(self):
        id_todo = self.kwargs['id_todo']
        return Task.objects.filter(id_todo= id_todo)
