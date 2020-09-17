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

    def post(self, request, *args,**kwargs):
        user = request.data.get('user')
        
        if user:
            serializer = UserSerializerWithToken(data=user)
            serializer.is_valid(raise_exception=True)
            serializer.save()
        else:
            return Response({"response": "error", "message": "not data found"})

        return Response({"response": "success", "message": "user created successfully"})