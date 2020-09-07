from rest_framework.generics import DestroyAPIView
from rest_framework.response import Response

from todos.models import Todo
from todos.serializers import TodoSerializer


class DeleteTodo(DestroyAPIView):
    serializer_class = TodoSerializer
    
    def get_queryset(self):
        queryset = Todo.objects.filter(id=self.kwargs['pk'])
        return queryset
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        
        return Response('Item deleted succesful')


