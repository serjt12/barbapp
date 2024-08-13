from rest_framework import serializers
from .models import User, Profile, Shop, Employee, Service, Appointment, Review, Role

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    role = RoleSerializer()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'full_name', 'profile_picture', 'role']

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class ShopSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.id')

    class Meta:
        model = Shop
        fields = ['id', 'name', 'location', 'contact_info', 'owner']

    def create(self, validated_data):
        request = self.context.get('request', None)
        if request is not None:
            owner = request.user
            validated_data['owner'] = owner
        return super().create(validated_data)

class EmployeeSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    shop = ShopSerializer()

    class Meta:
        model = Employee
        fields = '__all__'

class ServiceSerializer(serializers.ModelSerializer):
    shop = ShopSerializer()

    class Meta:
        model = Service
        fields = '__all__'

class AppointmentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    service = ServiceSerializer()

    class Meta:
        model = Appointment
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    service = ServiceSerializer()

    class Meta:
        model = Review
        fields = '__all__'
