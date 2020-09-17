from rest_framework.generics import CreateAPIView
from rest_framework.response import Response

from todos.models import Todo
from rest.v1.todo.serializers import TodoSerializer


class CreateTodo(CreateAPIView):
    serializer_class = TodoSerializer

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)
