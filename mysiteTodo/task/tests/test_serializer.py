from .test_setup import TestSetUp
# Create your tests here.
from django.test import TestCase
from rest.v1.task.serializers import TaskSerializer
from todos.models import Todo
from task.models import Task


class TaskSerializerTest(TestSetUp):

    def test_contains_expected_fields(self):
        data = self.serializer.data
        self.assertCountEqual(data.keys(), ['id', 'id_todo', 'title', 'is_completed'])

    def test_title_field_content(self):
        data = self.serializer.data 
        self.assertEqual(data['title'], self.task_data['title'])
    
    def test_is_completed_field_content(self):
        data = self.serializer.data 
        self.assertEqual(data['is_completed'], self.task_data['is_completed'])

    def test_user_field_content(self):
        data = self.serializer.data
        self.assertEqual(data['id_todo'], self.task_data['id_todo'].id)