from django.urls import path
from rest.v1.auth.views import CurrentUser, CreateUserView

urlpatterns = [
    path('current/', CurrentUser.as_view(), name = 'current_user'),
    path('create/', CreateUserView.as_view(), name = 'create_user')
]