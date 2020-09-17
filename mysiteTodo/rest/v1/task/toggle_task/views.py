from rest_framework.generics import UpdateAPIView
from rest_framework.response import Response

from task.models import Task
from rest.v1.task.serializers import TaskSerializer


class UpdateTask(UpdateAPIView):
    serializer_class = TaskSerializer
    
    def get_queryset(self):
        queryset = Task.objects.filter(id=self.kwargs['pk'])
        return queryset


