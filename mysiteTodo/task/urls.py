from django.urls import path
from rest.v1.create_task.index import CreateTask
from rest.v1.get_list_task.index import GetTaskList
from rest.v1.toggle_task.index import UpdateTask
from rest.v1.remove_task.index import DeleteTask


urlpatterns = [
	
	path('task_list/<str:id_todo>', GetTaskList.as_view(), name="task_list"),
	path('task_create/', CreateTask.as_view(), name="task_create"),

	path('task_update/<str:pk>/', UpdateTask.as_view(), name="task_update"),
	path('task_delete/<str:pk>/', DeleteTask.as_view(), name="task_delete"),
]