from rest_framework.generics import DestroyAPIView
from rest_framework.response import Response

from task.models import Task
from task.serializers import TaskSerializer


class DeleteTask(DestroyAPIView):
    serializer_class = Task
    
    def get_queryset(self):
        queryset = Task.objects.filter(id=self.kwargs['pk'])
        return queryset
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        
        return Response('Item deleted succesful')


