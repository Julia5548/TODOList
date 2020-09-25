from django.contrib import admin
from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token


urlpatterns = [
    path('detail/todo/', include('rest.v1.task.urls')),
    path('todo/', include('rest.v1.todo.urls')),
    path('token/auth/', obtain_jwt_token, name = 'token_user'),
    path('users/', include('rest.v1.auth.urls')),
    path('password/reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
]