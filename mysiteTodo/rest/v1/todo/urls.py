from django.urls import path
from .create_todo_list.views import CreateTodo
from .get_list_todo.views import GetTodoList
from .remove_todo.views import DeleteTodo


urlpatterns = [
	path('todo_create/', CreateTodo.as_view(), name="todo_create"),
	path('todo_list/', GetTodoList.as_view(), name="todo_list"),
	path('todo_delete/<str:pk>/', DeleteTodo.as_view(), name="todo_delete"),
]