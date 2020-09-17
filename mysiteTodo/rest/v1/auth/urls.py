from django.urls import path
from rest.v1.auth.views import *

urlpatterns = [
    path('current_user/', get_current_user, name = 'current_user'),
    path('users/create', CreateUserView.as_view(), name = 'create_user')
]