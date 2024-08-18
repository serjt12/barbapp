from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils.dateparse import parse_datetime
from django.utils.timezone import make_aware, is_naive
from .models import User, Profile, Shop, Employee, Service, Appointment, Review, Role, ShopClosure
from .serializers import UserSerializer, ProfileSerializer, ShopSerializer, EmployeeSerializer, ServiceSerializer, AppointmentSerializer, ReviewSerializer, RoleSerializer, ShopClosureSerializer
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
            try:
                shop = Shop.objects.get(pk=pk)
                closures = ShopClosure.objects.filter(shop=shop)
                shop_serializer = ShopSerializer(shop)
                closures_serializer = ShopClosureSerializer(closures, many=True)
                return Response({
                    "shop": shop_serializer.data,
                    "closures": closures_serializer.data
                })
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
    
from rest_framework.response import Response

class OwnedShopListView(generics.ListAPIView):
    serializer_class = ShopSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filter shops where the owner is the logged-in user
        return Shop.objects.filter(owner=self.request.user)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({"owned_shops": serializer.data})

    
class ShopClosureView(generics.ListCreateAPIView):
    queryset = ShopClosure.objects.all()
    serializer_class = ShopClosureSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()


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
    
class DailyAppointmentsView(generics.GenericAPIView):
    serializer_class = AppointmentSerializer

    def get(self, request, *args, **kwargs):
        date_str = request.query_params.get('date')
        shop_id = request.query_params.get('shop_id')
        
        if not date_str:
            return Response({'error': 'Date parameter is required'}, status=400)
        if not shop_id:
            return Response({'error': 'Shop ID parameter is required'}, status=400)
        
        try:
            date = parse_datetime(date_str)
            if date is None:
                raise ValueError
            if is_naive(date):
                date = make_aware(date)
        except ValueError:
            return Response({'error': 'Invalid date format'}, status=400)
        
        try:
            shop = Shop.objects.get(pk=shop_id)
        except Shop.DoesNotExist:
            return Response({'error': 'Shop not found'}, status=404)
        
        appointments = Appointment.objects.filter(datetime__date=date.date(), service__shop=shop)
        serializer = self.get_serializer(appointments, many=True)
        return Response(serializer.data)
