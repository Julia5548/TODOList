from django.contrib.auth import password_validation as password_validators
from django.core import exceptions
from rest_framework import serializers



def validate_password(value : str) -> str:
    try:
        password_validators.validate_password(value)
    except exceptions.ValidationError as exc : 
        raise serializers.ValidationError(exc.message)

    return value
