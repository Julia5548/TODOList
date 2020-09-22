from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response

from todos.models import Todo
from rest.v1.todo.serializers import TodoSerializer


class TodoList(ListCreateAPIView):
    serializer_class = TodoSerializer

    def get_queryset(self):
        user = self.request.user
        return Todo.objects.filter(user = user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    