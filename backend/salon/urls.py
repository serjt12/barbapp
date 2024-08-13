from django.urls import path
from .views import UserListCreate, ProfileListCreate, ShopListCreate, EmployeeListCreate, ServiceListCreate, AppointmentListCreate, ReviewListCreate, RoleListCreate, ShopView, ServiceView


urlpatterns = [
    path('roles/', RoleListCreate.as_view(), name='role-list-create'),
    path('users/', UserListCreate.as_view(), name='user-list-create'),
    path('profiles/', ProfileListCreate.as_view(), name='profile-list-create'),
    path('shops/', ShopListCreate.as_view(), name='shop-list-create'),
    path('employees/', EmployeeListCreate.as_view(), name='employee-list-create'),
    path('services/', ServiceListCreate.as_view(), name='service-list-create'),
    path('appointments/', AppointmentListCreate.as_view(), name='appointment-list-create'),
    path('reviews/', ReviewListCreate.as_view(), name='review-list-create'),
    path('shops/', ShopView.as_view()),
    path('shops/<int:pk>/', ShopView.as_view()),
    path('services/', ServiceView.as_view()),
    path('services/<int:pk>/', ServiceView.as_view()),
]
