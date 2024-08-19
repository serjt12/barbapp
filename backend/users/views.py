from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate, login as auth_login, logout as django_logout
from django.utils import timezone
from rest_framework_simplejwt.tokens import RefreshToken
import logging
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
import environ
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import UserSerializer

env = environ.Env()
logger = logging.getLogger(__name__)

User = get_user_model()

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        logger.debug(f"Serializer data: {request.data}")
        if serializer.is_valid():
            try:
                user = serializer.save()
                logger.debug(f"User created: {user}")
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                logger.error(f"Error saving user: {e}")
                return Response({'detail': 'Error saving user'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            logger.debug(f"Serializer errors: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        logger.debug(f"Attempting to authenticate user: {username}")

        user = authenticate(username=username, password=password)
        if user:
            user.last_login = timezone.now()
            user.save(update_fields=['last_login'])

            auth_login(request, user)

            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': UserSerializer(user).data
            })
        logger.debug(f"Invalid credentials for user: {username}")
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        django_logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)

class RefreshTokenView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        refresh_token = request.data.get('refresh')
        if refresh_token:
            try:
                new_tokens = RefreshToken(refresh_token)
                return Response({
                    'access': str(new_tokens.access_token),
                    'refresh': str(refresh_token)
                })
            except Exception as e:
                logger.error(f"Error refreshing token: {e}")
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'No refresh token provided'}, status=status.HTTP_400_BAD_REQUEST)

from django.utils import timezone

class GoogleLogin(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        token = request.data.get('access_token')
        if not token:
            logger.error("Access token is missing in the request")
            return Response({'error': 'Access token is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            id_info = id_token.verify_oauth2_token(token, google_requests.Request(), env('GOOGLE_ID'))
            if id_info['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                raise ValueError('Wrong issuer.')

            user_info = {
                'sub': id_info.get('sub'),
                'email': id_info.get('email'),
                'first_name': id_info.get('given_name'),
                'last_name': id_info.get('family_name'),
                'profile_picture': id_info.get('picture'),
            }
        except ValueError as e:
            logger.error(f"Token validation error: {e}")
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user, created = User.objects.get_or_create(
                username=user_info['sub'],
                defaults={
                    'email': user_info['email'],
                    'first_name': user_info['first_name'],
                    'last_name': user_info['last_name'],
                    'profile_picture': user_info['profile_picture'],
                }
            )
            if not created:
                # Update last_login for existing users
                user.last_login = timezone.now()
                user.save()
        except Exception as e:
            logger.error(f"Error creating user: {e}")
            return Response({'error': 'Error creating user'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        if created:
            logger.info(f"Created new user: {user_info['email']}")

        refresh = RefreshToken.for_user(user)
        return Response({
            'message': 'Successfully authenticated with Google',
            'user': UserSerializer(user).data,
            'access': str(refresh.access_token),
            'refresh': str(refresh)
        }, status=status.HTTP_200_OK)


class UpdateProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        data = request.data

        new_email = data.get('email', user.email)
        if User.objects.filter(email=new_email).exclude(id=user.id).exists():
            return Response({'email': ['A user with this email already exists.']}, status=status.HTTP_400_BAD_REQUEST)

        user.first_name = data.get('first_name', user.first_name)
        user.last_name = data.get('last_name', user.last_name)
        user.email = new_email

        # Handle profile picture if provided
        if 'profile_picture' in request.FILES:
            user.profile_picture = request.FILES['profile_picture']
        
        user.save()

        # Return the updated user data
        user_data = {
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'profile_picture': user.profile_picture.url if user.profile_picture else None,
        }

        return Response({'message': 'Profile updated successfully', 'user': user_data}, status=status.HTTP_200_OK)

