from rest_framework.test import APITestCase
from django.urls import reverse


class TestSetUp(APITestCase):

    def setUp(self):
        self.register_url = reverse('create_user')
        self.login_url = reverse('token_user')
        self.current_user_url = reverse('current_user')
        self.create_todo_url = reverse('todos')
        self.create_task_url = reverse('task_create')
        self.get_tasks_url = reverse('task_list', args="1")
        self.update_task_url = reverse('action_task', kwargs={'pk' : 1})
        self.deleted_task_url = reverse('action_task', args="2")

        self.user_data = {
            'username' : 'Nami',
            'email' : 'negodyaeva.yulya@gmail.com',
            'password' : 'asd11fg123'
        }

        self.login_data = {
            'username' : 'Nami',
            'password' : 'asd11fg123'
        }
        
        self.todo_data = {
            "title" : "дом"
        }
        
        self.task_data = {
            'title': 'покормить кота',
            'is_completed': False,
            "id_todo" : 1
        }

        self.task_two = {
            "id_todo" : 1,
            'title': 'Дописать программу',
            'is_completed' : False
        }

        self.task_update = {
            'title': 'покормить кота',
            'is_completed': True,
            "id_todo" : 1
        }
        
        return super().setUp()

    def tearDown(self):
        return super().tearDown()

