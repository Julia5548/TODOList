from django.urls import path
from .create_task.views import CreateTask
from .get_list_task.views import GetTaskList
from .toggle_task.views import UpdateTask
from .remove_task.views import DeleteTask


urlpatterns = [
	
	path('task/list/<str:id_todo>', GetTaskList.as_view(), name="task_list"),
	path('task/create/', CreateTask.as_view(), name="task_create"),

	path('task/update/<str:pk>/', UpdateTask.as_view(), name="task_update"),
	path('task/delete/<str:pk>/', DeleteTask.as_view(), name="task_delete"),
]