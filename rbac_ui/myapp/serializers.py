from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Role, UserRole

class UserRoleSerializer(serializers.ModelSerializer):
    role_name = serializers.CharField(source='role.name', read_only=True)

    class Meta:
        model = UserRole
        fields = ['role_name']

class UserSerializer(serializers.ModelSerializer):
    roles = UserRoleSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = ["id", "username", "email", "roles", "is_active"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["status"] = "active" if instance.is_active else "inactive"
        return data

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ["id", "name"]

class RegisterSerializer(serializers.ModelSerializer):
    role = serializers.CharField(write_only=True, required=False)
    class Meta:
        model = User
        fields = ('username', 'email', 'role', 'password')

    def create(self, validated_data):
        role_name = validated_data.pop('role', None)
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password'],
        )
        if role_name:
            role, created = Role.objects.get_or_create(name=role_name)
            UserRole.objects.create(user=user, role=role)
        return user
    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required = True)
    password = serializers.CharField(required = True, write_only = True)


