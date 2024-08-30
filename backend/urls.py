from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

import logging

logger = logging.getLogger(__name__)

# Import views from the users app
from users.views import (
    RegisterView,
    LoginView,
    LogoutView,
    UpdateProfileView,
    GoogleLogin,
    RefreshTokenView
)

# Import views from the shops app
from shops.views import (
    OwnedShopListView,
    ShopView,
    EmployeeListCreate,
    ServiceView,
    DailyAppointmentsView,
    MonthlyAppointmentsView,
    CreateAppointmentView,
    ReviewListCreate,
)

# Import views from the products app
from products.views import (
    ProductView,
)

# Combine all urlpatterns into a single list
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include([
        path('owned-shops/', OwnedShopListView.as_view(), name='owned-shop-list'),
        path('shops/', ShopView.as_view(), name='shop-list-create'),
        path('shops/<int:pk>/', ShopView.as_view(), name='shop-detail'),
        path('employees/', EmployeeListCreate.as_view(), name='employee-list-create'),
        path('services/', ServiceView.as_view(), name='service-list-create'),
        path('services/<int:pk>/', ServiceView.as_view(), name='service-detail'),
        path('appointments/daily/', DailyAppointmentsView.as_view(), name='daily-appointments'),
        path('appointments/monthly/', MonthlyAppointmentsView.as_view(), name='monthly-appointments'),
        path('reviews/', ReviewListCreate.as_view(), name='review-list-create'),
        path('appointments/create/', CreateAppointmentView.as_view(), name='create-appointment'),
    ])),
    path('api/', include([
        path('register/', RegisterView.as_view(), name='register'),
        path('login/', LoginView.as_view(), name='login'),
        path('logout/', LogoutView.as_view(), name='logout'),
        path('update_profile/', UpdateProfileView.as_view(), name='update_profile'),
        path('auth/', include('dj_rest_auth.urls')),  # dj-rest-auth auth URLs
        path('auth/registration/', include('dj_rest_auth.registration.urls')),  # dj-rest-auth registration URLs
        path('auth/social/', include('allauth.socialaccount.urls')),  # Social account URLs
        path('auth/google/', GoogleLogin.as_view(), name='google_login'),
        path('token/refresh/', RefreshTokenView.as_view(), name='token_refresh'),
    ])),
    path('api/', include([
        path('products/<int:shop_id>/', ProductView.as_view(), name='product-list-create'),
        path('products/<int:shop_id>/<int:pk>/', ProductView.as_view(), name='product-detail'),
    ])),
    # Catch-all pattern for React
    path('', TemplateView.as_view(template_name='index.html')),
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static("/api/media/", document_root=settings.MEDIA_ROOT)