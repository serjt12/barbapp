import pytest
from django.http import JsonResponse
from django.test import RequestFactory
from barbapp.middleware import CustomExceptionMiddleware
import json

@pytest.fixture
def request_factory():
    return RequestFactory()

@pytest.fixture
def get_response():
    return lambda request: JsonResponse({"message": "success"})

@pytest.fixture
def middleware(get_response):
    return CustomExceptionMiddleware(get_response=get_response)

def test_middleware_process_exception(request_factory, middleware):
    # Create a mock request
    request = request_factory.get('/some-url/')
    
    # Create a mock exception
    exception = Exception("Test exception")

    # Call the middleware's process_exception method
    response = middleware.process_exception(request, exception)
    
    # Assert that the response is a JsonResponse
    assert isinstance(response, JsonResponse)
    
    # Assert that the response status code is 500
    assert response.status_code == 500
    
    # Decode the response content from JSON
    response_content = json.loads(response.content.decode('utf-8'))
    
    # Assert that the response contains the expected error message
    assert response_content['error'] == 'An unexpected error occurred.'
    assert response_content['details'] == 'Test exception'
