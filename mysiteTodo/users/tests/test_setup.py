from rest_framework.test import APITestCase
from django.urls import reverse


class TestSetUp(APITestCase):

    def setUp(self):
        self.register_url = reverse('create_user')
        self.login_url = reverse('token_user')
        self.current_user_url = reverse('current_user')
        self.create_task_url = reverse('task_create')
        self.get_tasks_url = reverse('task_list', args="1")
        self.update_task_url = reverse('task_update', kwargs={'pk' : 1})
        self.deleted_task_url = reverse('task_delete', args="2")

        self.user_data = {
            'user' : {
                'username' : 'Nami',
                'email' : 'negodyaeva.yulya@gmail.com',
                'password' : 'asdfg123'
            }
        }

        self.login_data = {
            'username' : 'Nami',
            'password' : 'asdfg123'
        }

        self.task_data = {
            'name': 'покормить кота',
            'completed': False,
            "user" : 1
        }

        self.task_two = {
            "user" : 1,
            'name': 'Дописать программу',
            'completed' : False
        }

        self.task_update = {
            'name': 'покормить кота',
            'completed': True,
            "user" : 1
        }
        
        return super().setUp()

    def tearDown(self):
        return super().tearDown()

