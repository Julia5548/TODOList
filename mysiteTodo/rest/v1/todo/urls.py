from django.urls import path
from .list_todo.views import TodoList
from .remove_todo.views import DeleteTodo


urlpatterns = [
	path('todo/create/', TodoList.as_view(), name="todo_create"),
	path('todo/list/', TodoList.as_view(), name="todo_list"),
	path('todo/delete/<str:pk>/', DeleteTodo.as_view(), name="todo_delete"),
]