from rest_framework import serializers
from django.shortcuts import get_object_or_404
from task.models import Task
from todos.models import Todo


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'id_todo', 'title', 'is_completed')

    def validate_id_todo(self, value):
        user = self.context['request'].user
        return get_object_or_404(Todo, user=user, pk=value.pk)
