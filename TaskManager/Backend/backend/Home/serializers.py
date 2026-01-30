from rest_framework import serializers
from Home.models import User,Board,Task
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields = "__all__"

class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model=Board
        fields = "__all__"

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model=Task
        fields = "__all__"