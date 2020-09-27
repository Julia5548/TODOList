from rest_framework.generics import ListCreateAPIView
from task.models import Task
from rest.v1.task.serializers import TaskSerializer


class TaskList(ListCreateAPIView):
    serializer_class = TaskSerializer

    def get_queryset(self):
        user = self.request.user
        id = self.kwargs['id_todo']

        return Task.objects.filter(id_todo__user = user, id_todo= id )