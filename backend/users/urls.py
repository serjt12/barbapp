from django.urls import path, include
from .views import RegisterView, LoginView, LogoutView, GoogleLogin, UpdateProfileView, RefreshTokenView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('update_profile/', UpdateProfileView.as_view(), name='update_profile'),
    path('auth/', include('dj_rest_auth.urls')),  # This includes default auth URLs for dj-rest-auth
    path('auth/registration/', include('dj_rest_auth.registration.urls')),  # This includes registration URLs for dj-rest-auth
    path('auth/social/', include('allauth.socialaccount.urls')),  # Consolidate social account URLs
    path('auth/google/', GoogleLogin.as_view(), name='google_login'),
    path('token/refresh/', RefreshTokenView.as_view(), name='token_refresh')
]
