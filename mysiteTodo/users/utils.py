from rest.v1.auth.serializers import GetFullUserSerializer


def custom_jwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': GetFullUserSerializer(user, context={'request': request}).data
    }
