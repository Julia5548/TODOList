from .test_setup import TestSetUp
from django.contrib.auth.models import User


class TestViews(TestSetUp):

    def test_user_can_reset_password_correctly(self):
        res_register = self.client.post(self.register_url, self.user_data, format = "json")

        self.assertEqual(res_register.data['response'], 'success')
        self.assertEqual(res_register.status_code, 200)

        res = self.client.post(self.reset_password_url, self.reset_data, format="json")

        self.assertEqual(res.status_code, 200)


        