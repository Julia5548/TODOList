from django.urls import path
from .list_todo.views import TodoList
from .remove_todo.views import DeleteTodo


urlpatterns = [
	path('create/', TodoList.as_view(), name="todo_create"),
	path('list/', TodoList.as_view(), name="todo_list"),
	path('delete/<str:pk>/', DeleteTodo.as_view(), name="todo_delete"),
]