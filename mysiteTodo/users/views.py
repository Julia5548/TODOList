from django.shortcuts import render
from rest_framework import status
from .serializer import *
from rest_framework.generics import CreateAPIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import permissions


@api_view(['GET'])
def get_current_user(request):
    serializer = GetFullUserSerializer(request.user)
    return Response(serializer.data)


class CreateUserView(CreateAPIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        user = request.data.get('user')
        if not user:
            return Response({"response" : "not data found"}, status=status.HTTP_400_BAD_REQUEST)
        serializer = UserSerializerWithToken(data=user)
        if serializer.is_valid():
            saved_user = serializer.save()
        else:
            return Response({"response": "error", "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"response": "success", "message": "user created successfully"})
