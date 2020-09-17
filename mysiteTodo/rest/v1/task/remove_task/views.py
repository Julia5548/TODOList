from rest_framework.generics import DestroyAPIView
from django.shortcuts import get_object_or_404
from todos.models import Todo
from task.models import Task
from rest.v1.task.serializers import TaskSerializer


class DeleteTask(DestroyAPIView):
    serializer_class = Task
    
    def get_queryset(self):
        pk = self.kwargs['pk']
        user = self.request.user
        
        task = get_object_or_404(Task, pk=pk)
        todo = get_object_or_404(Todo, user = user,  pk=task.id_todo.pk)
        
        return Task.objects.filter(id=self.kwargs['pk'], id_todo = todo)
    


