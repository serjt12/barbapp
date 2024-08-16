from django.urls import path
from .views import UserListCreate, ProfileListCreate, EmployeeListCreate, ServiceListCreate, AppointmentListCreate, ReviewListCreate, RoleListCreate, ShopView, ServiceView, OwnedShopListView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('roles/', RoleListCreate.as_view(), name='role-list-create'),
    path('users/', UserListCreate.as_view(), name='user-list-create'),
    path('profiles/', ProfileListCreate.as_view(), name='profile-list-create'),
    path('owned-shops/', OwnedShopListView.as_view(), name='owned-shop-list'),
    path('shops/', ShopView.as_view(), name='shop-list-create'),
    path('shops/<int:pk>/', ShopView.as_view(), name='shop-detail'),
    path('employees/', EmployeeListCreate.as_view(), name='employee-list-create'),
    path('services/', ServiceListCreate.as_view(), name='service-list-create'),
    path('services/<int:pk>/', ServiceView.as_view(), name='service-detail'),
    path('appointments/', AppointmentListCreate.as_view(), name='appointment-list-create'),
    path('reviews/', ReviewListCreate.as_view(), name='review-list-create'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)