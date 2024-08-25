import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model

@pytest.mark.django_db
def test_register_user():
    client = APIClient()
    url = reverse('register')
    data = {
        "username": "testuser",
        "password": "testpassword",
        "email": "testuser@example.com",
        "first_name": "Test",
        "last_name": "User"
    }
    response = client.post(url, data, format='json')
    assert response.status_code == status.HTTP_201_CREATED
    assert 'refresh' in response.data
    assert 'access' in response.data
    assert response.data['user']['email'] == "testuser@example.com"

@pytest.mark.django_db
def test_login_user():
    User = get_user_model()
    user = User.objects.create_user(username="testuser", password="testpassword")
    
    client = APIClient()
    url = reverse('login')
    data = {
        "username": "testuser",
        "password": "testpassword"
    }
    response = client.post(url, data, format='json')
    assert response.status_code == status.HTTP_200_OK
    assert 'refresh' in response.data
    assert 'access' in response.data
    assert response.data['user']['username'] == "testuser"

@pytest.mark.django_db
def test_logout_user():
    User = get_user_model()
    user = User.objects.create_user(username="testuser", password="testpassword")
    
    client = APIClient()
    client.force_authenticate(user=user)
    
    url = reverse('logout')
    response = client.post(url)
    assert response.status_code == status.HTTP_204_NO_CONTENT
