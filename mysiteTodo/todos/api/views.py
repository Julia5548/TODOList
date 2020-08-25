
from rest_framework.decorators import api_view
from rest_framework.response import Response

from todos.models import Todo
from .serializers import TodoSerializer


@api_view(['GET'])
def apiOverview(request):
	api_urls = {
		'List':'/task_list/',
		'Detail View':'/task_detail/<str:pk>/',
		'Create':'/task_create/',
		'Update':'/task_update/<str:pk>/',
		'Delete':'/task_delete/<str:pk>/',
	}

	return Response(api_urls)

@api_view(['GET'])
def taskList(request, user_id):
	tasks = Todo.objects.filter(user_id = user_id)
	serializer = TodoSerializer(tasks, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def taskDetail(request, pk):
	tasks = Todo.objects.get(id=pk)
	serializer = TodoSerializer(tasks, many=False)
	return Response(serializer.data)


@api_view(['POST'])
def taskCreate(request):
	serializer = TodoSerializer(data=request.data)

	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)

@api_view(['POST'])
def taskUpdate(request, pk):
	task = Todo.objects.get(id=pk)
	serializer = TodoSerializer(task, data=request.data)

	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)


@api_view(['DELETE'])
def taskDelete(request, pk):
	task = Todo.objects.get(id=pk)
	task.delete()

	return Response('Item succsesfully delete!')