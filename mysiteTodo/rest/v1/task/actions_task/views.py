from rest_framework.generics import RetrieveUpdateDestroyAPIView
from task.models import Task
from rest.v1.task.serializers import TaskSerializer


class ActionTask(RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    
    def get_queryset(self):
        user = self.request.user

        return Task.objects.filter(id_todo__user= user)

