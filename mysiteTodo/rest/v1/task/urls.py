from django.urls import path
from .create_task.views import CreateTask
from .get_list_task.views import GetTaskList
from .toggle_task.views import UpdateTask
from .remove_task.views import DeleteTask


urlpatterns = [
	
	path('task_list/<str:id_todo>', GetTaskList.as_view(), name="task_list"),
	path('task_create/', CreateTask.as_view(), name="task_create"),

	path('task_update/<str:pk>/', UpdateTask.as_view(), name="task_update"),
	path('task_delete/<str:pk>/', DeleteTask.as_view(), name="task_delete"),
]