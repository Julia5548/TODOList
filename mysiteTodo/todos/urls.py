from django.urls import path
from rest.v1.create_todo_list.index import CreateTodo
from rest.v1.get_list_todo.index import GetTodoList
from rest.v1.remove_todo.index import DeleteTodo


urlpatterns = [
	path('todo_create/', CreateTodo.as_view(), name="todo_create"),
	path('todo_list/<str:user_id>', GetTodoList.as_view(), name="todo_list"),
	path('todo_delete/<str:pk>/', DeleteTodo.as_view(), name="todo_delete"),
]