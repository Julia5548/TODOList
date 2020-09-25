from django.contrib.auth.models import User
from rest_framework import serializers
from .validation import validate_password
from rest_framework_jwt.settings import api_settings


class GetFullUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class UserSerializerWithToken(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators = [validate_password])
    token = serializers.SerializerMethodField()

    def get_token(self, object):

        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
        payload = jwt_payload_handler(object)
        token = jwt_encode_handler(payload)

        return token

    def create(self, validated_data : dict) -> User:
        user = User.objects.create(
            username=validated_data['username'],
            email = validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta:
        model = User
        fields = ('token', 'username', 'password', 'email')
        read_only_fields =('token', ) 
