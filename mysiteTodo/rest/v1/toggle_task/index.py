from rest_framework.generics import UpdateAPIView
from rest_framework.response import Response

from task.models import Task
from task.serializers import TaskSerializer


class UpdateTask(UpdateAPIView):
    serializer_class = TaskSerializer
    
    def get_queryset(self):
        queryset = Task.objects.filter(id=self.kwargs['pk'])
        return queryset
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
       
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
       
        return Response(serializer.data)


