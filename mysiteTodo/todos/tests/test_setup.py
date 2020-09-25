from django.test import TestCase
from todos.models import Todo
from rest.v1.todo.serializers import TodoSerializer
from django.contrib.auth.models import User

class TestSetUp(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(username="Julia", email="julia@mail.ru", password="11asdfg11")
        self.todo_serializer = {
            "title": "работа"
        }
        
        self.todo_data = {
            "title":"дом",
            "user" : self.user
        }
        self.todo = Todo.objects.create(**self.todo_data)
        self.serializer = TodoSerializer(instance = self.todo)
        return super().setUp()

    def tearDown(self):
        return super().tearDown()

