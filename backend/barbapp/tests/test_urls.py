# import pytest
# from django.urls import reverse, resolve
# from django.views.generic import TemplateView
# from django.contrib import admin

# # Include your apps' views if needed, e.g., from users import views as user_views

# @pytest.mark.parametrize("url, view_name", [
#     ('/admin/', admin.site.urls),   # Test admin URL
#     ('/api/', 'users.urls'),        # Test inclusion of users.urls
#     ('/api/', 'shops.urls'),        # Test inclusion of shops.urls
#     ('/api/', 'products.urls'),     # Test inclusion of products.urls
#     ('/', TemplateView.as_view(template_name='index.html')), # Test catch-all React URL
# ])
# def test_urls(url, view_name):
#     resolved = resolve(url)
#     assert resolved.view_name == view_name

