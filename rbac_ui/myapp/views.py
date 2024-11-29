from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer, RoleSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .permissions import HasRole
from .models import Role
from django.db.models import Count

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class LoginView(generics.CreateAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username = username, password = password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            user_serializer = UserSerializer(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': user_serializer.data
            })
        else:
            return Response({'details':'Invalid Credentials...'}, status=401)
        
class DashboardView(APIView):
    permission_classes = [IsAuthenticated, HasRole]
    required_role = 'admin'  # Admin-specific access

    def get(self, request):
        # Get total users
        total_users = User.objects.count()

        # Get total roles
        total_roles = Role.objects.count()

        # Get total permissions (replace this with your actual permissions model/logic)
        total_permissions = 7  # For example, static permissions count

        # Get users per role
        roles_data = Role.objects.annotate(user_count=Count('userrole')).values('name', 'user_count')

        return Response({
            'total_users': total_users,
            'total_roles': total_roles,
            'total_permissions': total_permissions,
            'roles': list(roles_data)
        }, status=200)
    
class userView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        user = request.user
        user_serializer = UserSerializer(user)
        return Response({
            'message': 'Welcome to Dashboard',
            'user': user_serializer.data
        },200)
    

class UserListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Prefetch user_roles (related to Role through UserRole)
        users = User.objects.prefetch_related('user_roles__role').all()

        # Serialize the users with their roles
        serialized_users = UserSerializer(users, many=True)

        return Response(serialized_users.data, status=200)
    

class RoleListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        roles = Role.objects.all()
        serialized_roles = RoleSerializer(roles, many=True)
        return Response(serialized_roles.data, status=200)