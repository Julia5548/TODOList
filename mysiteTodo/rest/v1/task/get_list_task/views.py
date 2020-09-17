from rest_framework.generics import ListAPIView
from django.shortcuts import get_object_or_404
from task.models import Task
from todos.models import Todo
from rest.v1.task.serializers import TaskSerializer


class GetTaskList(ListAPIView):
    serializer_class = TaskSerializer

    def get_queryset(self):
        user = self.request.user
        id = self.kwargs['id_todo']
        todo = get_object_or_404(Todo, user=user, pk= id)
        return Task.objects.filter(id_todo= todo)
