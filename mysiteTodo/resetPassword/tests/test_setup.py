from rest_framework.test import APITestCase
from django.urls import reverse


class TestSetUp(APITestCase):

    def setUp(self):
        self.reset_password_url = reverse('password_reset:reset-password-request')
        self.register_url = reverse('create_user')

        self.user_data = {
            'user' : {
                'username' : 'Nami',
                'email' : 'negodyaeva.yulya@gmail.com',
                'password' : 'asdfg123'
            }
        }

        self.reset_data = {
            'email' : 'negodyaeva.yulya@gmail.com'
        }

        return super().setUp()

    def tearDown(self):
        return super().tearDown()

