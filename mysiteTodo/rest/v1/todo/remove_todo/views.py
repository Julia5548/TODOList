from rest_framework.generics import RetrieveDestroyAPIView

from todos.models import Todo
from rest.v1.todo.serializers import TodoSerializer


class DeleteTodo(RetrieveDestroyAPIView):
    serializer_class = TodoSerializer
    
    def get_queryset(self):
        user = self.request.user
        
        return Todo.objects.filter(user = user)

