from .serializer import GetDataUserSerializer


def custom_iwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': GetDataUserSerializer(user, context={'request': request}).data
    }
