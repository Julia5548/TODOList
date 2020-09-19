from django.urls import path
from rest.v1.auth.views import get_current_user, CreateUserView

urlpatterns = [
    path('current/', get_current_user, name = 'current_user'),
    path('create/', CreateUserView.as_view(), name = 'create_user')
]