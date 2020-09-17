from rest_framework.generics import ListAPIView
from rest_framework.response import Response

from todos.models import Todo
from rest.v1.todo.serializers import TodoSerializer


class GetTodoList(ListAPIView):
    serializer_class = TodoSerializer

    def get_queryset(self):
        user = self.request.user
        return Todo.objects.filter(user_id = user)
