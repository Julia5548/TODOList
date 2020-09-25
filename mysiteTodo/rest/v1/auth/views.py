from .serializers import GetFullUserSerializer, UserSerializerWithToken
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from django.contrib.auth.models import User
from rest_framework import permissions
from rest_framework.response import Response


class CreateUserView(CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializerWithToken


class CurrentUser(RetrieveAPIView):

    def retrieve(self, request, *args, **kwargs):
        serializer = GetFullUserSerializer(request.user)
        return Response(serializer.data)