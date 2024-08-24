from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Product, Shop
from .serializers import ProductSerializer
from django.shortcuts import get_object_or_404
import logging

logger = logging.getLogger(__name__)

class ProductListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, shop_id=None):
        logger.debug(f"Request data: {request.data}")
        if shop_id:
            # Retrieve all products for a specific shop
            products = Product.objects.filter(shop_id=shop_id)
        else:
            # If no shop_id is provided, return an error
            return Response({"error": "shop_id is required."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = ProductSerializer(products, many=True)
        return Response({"products": serializer.data})

    def post(self, request, shop_id=None):
        if not shop_id:
            return Response({"error": "shop_id is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        shop = get_object_or_404(Shop, id=shop_id, owner=request.user)
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(shop=shop)
            
            # Retrieve all products, including the newly created one
            products = Product.objects.filter(shop_id=shop_id)
            all_products_serializer = ProductSerializer(products, many=True)
            
            return Response({"products": all_products_serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProductDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, shop_id, pk):
        return get_object_or_404(Product, shop_id=shop_id, pk=pk)

    def put(self, request, shop_id, pk):
        product = self.get_object(shop_id, pk)
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"products": serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, shop_id, pk):
        product = self.get_object(shop_id, pk)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
