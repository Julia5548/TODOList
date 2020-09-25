from django.test import TestCase
from todos.models import Todo
from task.models import Task
from rest.v1.task.serializers import TaskSerializer
from django.contrib.auth.models import User

class TestSetUp(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(username="Julia", email="julia@mail.ru", password="11asdfg11")
        self.todo_data = {
            "title":"дом",
            "user" : self.user
        }
        self.todo = Todo.objects.create(**self.todo_data)
        self.task_data = {
            "title": "исправить баг",
            "is_completed" : False,
            "id_todo" : self.todo
        }
        self.task = Task.objects.create(**self.task_data)
        self.serializer = TaskSerializer(instance = self.task)
        return super().setUp()

    def tearDown(self):
        return super().tearDown()

