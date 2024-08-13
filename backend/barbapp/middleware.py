# middleware.py

from django.http import JsonResponse
from django.utils.deprecation import MiddlewareMixin
import logging

logger = logging.getLogger(__name__)

class CustomExceptionMiddleware(MiddlewareMixin):
    def process_exception(self, request, exception):
        logger.error(f"Unhandled Exception: {exception}")
        response = JsonResponse({
            'error': 'An unexpected error occurred.',
            'details': str(exception)
        }, status=500)
        return response
