from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import User, Profile, Shop, Employee, Service, Appointment, Review, Role
from .serializers import UserSerializer, ProfileSerializer, ShopSerializer, EmployeeSerializer, ServiceSerializer, AppointmentSerializer, ReviewSerializer, RoleSerializer
import logging

logger = logging.getLogger(__name__)

class RoleListCreate(generics.ListCreateAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        logger.debug(f"Creating Role with data: {serializer.validated_data}")
        serializer.save()

class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        logger.debug(f"Creating User with data: {serializer.validated_data}")
        serializer.save()

class ProfileListCreate(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        logger.debug(f"Creating Profile with data: {serializer.validated_data}")
        serializer.save()

# class ShopListCreate(generics.ListCreateAPIView):
#     queryset = Shop.objects.all()
#     serializer_class = ShopSerializer
#     permission_classes = [IsAuthenticated]

#     def perform_create(self, serializer):
#         logger.debug(f"Creating Shop with data: {serializer.validated_data}")
#         serializer.save()

class EmployeeListCreate(generics.ListCreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        logger.debug(f"Creating Employee with data: {serializer.validated_data}")
        serializer.save()

class ServiceListCreate(generics.ListCreateAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        logger.debug(f"Creating Service with data: {serializer.validated_data}")
        serializer.save()

class AppointmentListCreate(generics.ListCreateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        logger.debug(f"Creating Appointment with data: {serializer.validated_data}")
        serializer.save()

class ReviewListCreate(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        logger.debug(f"Creating Review with data: {serializer.validated_data}")
        serializer.save()

class ShopView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None):
        if pk:
            # Get a single shop instance
            try:
                shop = Shop.objects.get(pk=pk)
                serializer = ShopSerializer(shop)
                return Response({"shop": serializer.data})
            except Shop.DoesNotExist:
                return Response({'error': 'Shop not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            # List all shops
            shops = Shop.objects.all()
            serializer = ShopSerializer(shops, many=True)
            return Response({"shops": serializer.data})

    def post(self, request):
        logger.debug(f"Authenticated user: {request.user}")
        logger.debug(f"Request Data: {request.data}")
        serializer = ShopSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            shop = serializer.save()
            return Response(ShopSerializer(shop).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            shop = Shop.objects.get(pk=pk, owner=request.user)
        except Shop.DoesNotExist:
            return Response({'error': 'Shop not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ShopSerializer(shop, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            shop = Shop.objects.get(pk=pk, owner=request.user)
        except Shop.DoesNotExist:
            return Response({'error': 'Shop not found'}, status=status.HTTP_404_NOT_FOUND)

        shop.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class OwnedShopListView(generics.ListAPIView):
    serializer_class = ShopSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filter shops where the owner is the logged-in user
        return Shop.objects.filter(owner=self.request.user)

class ServiceView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        services = Service.objects.all()
        serializer = ServiceSerializer(services, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ServiceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            service = Service.objects.get(pk=pk)
        except Service.DoesNotExist:
            return Response({'error': 'Service not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ServiceSerializer(service, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            service = Service.objects.get(pk=pk)
        except Service.DoesNotExist:
            return Response({'error': 'Service not found'}, status=status.HTTP_404_NOT_FOUND)

        service.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
