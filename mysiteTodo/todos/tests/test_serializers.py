from .test_setup import TestSetUp
# Create your tests here.
from django.test import TestCase
from rest.v1.todo.serializers import TodoSerializer
from django.contrib.auth.models import User
from todos.models import Todo


class TodoSerializerTest(TestSetUp):

    def test_contains_expected_fields(self):
        data = self.serializer.data
        # import pdb
        # pdb.set_trace()
        self.assertCountEqual(data.keys(), ['id', 'user', 'title'])

    def test_title_field_content(self):
        data = self.serializer.data 
        self.assertEqual(data['title'], self.todo_data['title'])

    def test_user_field_content(self):
        data = self.serializer.data
        self.assertEqual(data['user'], self.todo_data['user'].id)