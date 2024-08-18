from django.conf import settings
from rest_framework import serializers
from .models import User, Profile, Shop, Employee, Service, Appointment, Review, Role, ShopClosure

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    role = RoleSerializer(read_only=True)
    profile_picture = serializers.ImageField(required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'full_name', 'profile_picture', 'role']

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = ['user', 'bio', 'address', 'phone']

class ShopClosureSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopClosure
        fields = ['id', 'shop', 'date', 'reason']
class ShopSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.id')
    image = serializers.ImageField(required=False, use_url=False)
    closures = ShopClosureSerializer(many=True, read_only=True)

    class Meta:
        model = Shop
        fields = '__all__'
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        # Manually prepend MEDIA_URL to the image field
        if 'image' in representation and representation['image']:
            representation['image'] = f"{settings.MEDIA_URL}{representation['image']}"
        return representation

    def create(self, validated_data):
        request = self.context.get('request', None)
        if request is not None:
            validated_data['owner'] = request.user
        return super().create(validated_data)

class EmployeeSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    shop = ShopSerializer(read_only=True)

    class Meta:
        model = Employee
        fields = '__all__'

class ServiceSerializer(serializers.ModelSerializer):
    shop = ShopSerializer(read_only=True)

    class Meta:
        model = Service
        fields = ['id', 'name', 'price', 'shop']

    def create(self, validated_data):
        request = self.context.get('request', None)
        if request is not None:
            shop_id = request.data.get('shop_id')
            if shop_id:
                try:
                    validated_data['shop'] = Shop.objects.get(pk=shop_id)
                except Shop.DoesNotExist:
                    raise serializers.ValidationError({'shop': 'Shop not found'})
        return super().create(validated_data)

class AppointmentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    service = ServiceSerializer(read_only=True)

    class Meta:
        model = Appointment
        fields = ['id', 'user', 'service', 'datetime']

    def validate(self, data):
        shop = data['service'].shop
        shop_closures = ShopClosure.objects.filter(shop=shop, date=data['datetime'].date())
        if shop_closures.exists():
            raise serializers.ValidationError('Shop is closed on this date.')

        # Check if the appointment falls within the shop's operating hours
        opening_hours = shop.opening_hours
        day_of_week = data['datetime'].strftime('%A')
        if day_of_week in opening_hours:
            opening_time, closing_time = opening_hours[day_of_week].split('-')
            appointment_time = data['datetime'].strftime('%H:%M')
            if not (opening_time <= appointment_time <= closing_time):
                raise serializers.ValidationError('Appointment time is outside of shop hours.')

        return data

class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    service = ServiceSerializer(read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'user', 'service', 'rating', 'comment', 'created_at']

    def create(self, validated_data):
        request = self.context.get('request', None)
        if request is not None:
            service_id = request.data.get('service_id')
            if service_id:
                try:
                    validated_data['service'] = Service.objects.get(pk=service_id)
                except Service.DoesNotExist:
                    raise serializers.ValidationError({'service': 'Service not found'})
            validated_data['user'] = request.user
        return super().create(validated_data)
