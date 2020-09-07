from rest_framework.generics import CreateAPIView
from rest_framework.response import Response

from todos.models import Todo
from todos.serializers import TodoSerializer


class CreateTodo(CreateAPIView):
    serializer_class = TodoSerializer
    
    def perform_create(self, serializer):
        serializer = self.get_serializer(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)