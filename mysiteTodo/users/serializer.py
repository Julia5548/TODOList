from rest_framework import serializers

from django.contrib.auth.models import User
from rest_framework_jwt.settings import api_settings


class GetDataUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'is_superuser', 'email')



class UserSerializerWithToken(serializers.ModelSerializer):
    
    password = serializers.CharField(write_only = True)
    token = serializers.SerializerMethodField()

    def get_token(self, object):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(object)
        token = jwt_encode_handler(payload)

        return token

    
    def createUser(self, validated_data):
        user = User.objects.create_user(
            username = validated_data['username'],
            email = validated_data['email'],
            password=validated_data['password']
        )

        return user

    class Meta : 
        model = User
        fields = ('token', 'username', 'password', 'email')
