from .test_setup import TestSetUp
from django.contrib.auth.models import User
from rest_framework.test import APIClient


class TestViews(TestSetUp):

    def test_user_cannot_register_with_no_data(self):
        res = self.client.post(self.register_url)

        self.assertEqual(res.data['response'], 'not data found')
        self.assertEqual(res.status_code, 400)

    # def test_user_can_register_correctly(self):
    #     res = self.client.post(self.register_url, self.user_data, format = "json")

    #     self.assertEqual(res.data['response'], 'success')
    #     self.assertEqual(res.status_code, 200)

    def test_user_cannot_login_with_no_data(self):
        res = self.client.post(self.login_url)

        self.assertEqual(res.status_code, 400)

    def test_user_can_register_and_login_correctly(self):
        
        res_register = self.client.post(self.register_url, self.user_data, format = "json")

        self.assertEqual(res_register.data['response'], 'success')
        self.assertEqual(res_register.status_code, 200)
        
        resp = self.client.post(self.login_url, self.login_data, format ="json")
        
        self.assertEqual(resp.status_code, 200)
        self.assertTrue('token' in resp.data)

        token = resp.data['token']

        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION = 'JWT ' + token)
        res = client.get(self.current_user_url)

        self.assertEqual(res.status_code, 200)

        res_create = client.post(self.create_task_url, self.task_data, format="json")
        res_create_two = client.post(self.create_task_url, self.task_two, format="json")
        
        self.assertEqual(res_create.status_code, 200)
        self.assertEqual(res_create_two.status_code, 200)

        res_get_tasks = client.get(self.get_tasks_url)

        self.assertEqual(res_get_tasks.status_code, 200)

        res_update_task = client.post(self.update_task_url, self.task_update, format="json")
        res_delete_task = client.delete(self.deleted_task_url)
        # import pdb; 
        # pdb.set_trace()
        self.assertEqual(res_create.status_code, 200)
        self.assertEqual(res_create_two.status_code, 200)
        
    


        