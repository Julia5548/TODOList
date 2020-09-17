from rest_framework.generics import DestroyAPIView

from todos.models import Todo
from todos.serializers import TodoSerializer


class DeleteTodo(DestroyAPIView):
    serializer_class = TodoSerializer
    
    def get_queryset(self):
        user = self.request.user
        queryset = Todo.objects.filter(id=self.kwargs['pk'], user = user)
        return queryset

