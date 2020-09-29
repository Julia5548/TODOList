from django.urls import path
from .list_todo.views import TodoList
from .remove_todo.views import DeleteTodo


urlpatterns = [
	path('todos/', TodoList.as_view(), name="todos"),
	path('todo/<str:pk>', DeleteTodo.as_view(), name="action_todo"),
]