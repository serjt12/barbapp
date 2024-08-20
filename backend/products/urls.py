from django.urls import path
from .views import ProductListCreateView, ProductDetailView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [

    path('products/<int:shop_id>/', ProductListCreateView.as_view(), name='product-list-create'),
    path('products/<int:shop_id>/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)