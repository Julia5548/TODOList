from rest_framework.generics import CreateAPIView
from rest_framework.response import Response

from task.models import Task
from task.serializers import TaskSerializer


class CreateTask(CreateAPIView):
    serializer_class = TaskSerializer
    
    def perform_create(self, serializer):
        serializer = self.get_serializer(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)