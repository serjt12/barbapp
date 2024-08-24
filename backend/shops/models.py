from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

class Role(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class User(AbstractUser):
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=120)
    profile_picture = models.ImageField(upload_to='profile_user_images', null=True, blank=True)
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True, related_name='users')
    groups = models.ManyToManyField(
        Group,
        related_name='user_set', 
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='user_permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(blank=True)
    address = models.CharField(max_length=255, blank=True)
    phone = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return self.user.full_name

class Shop(models.Model):
    SHOP_TYPE_CHOICES = [
        ('independent', 'Independent'),
        ('beauty_shop', 'Beauty Shop'),
        ('beauty_supplier', 'Beauty Supplier'),
    ]
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owned_shops', null=False)
    name = models.CharField(max_length=120)
    location = models.CharField(max_length=200)
    type = models.CharField(max_length=20, choices=SHOP_TYPE_CHOICES, default='independent')
    contact_info = models.CharField(max_length=200, blank=True)
    opening_hours = models.JSONField(default=dict)  # Example: {'Monday': '09:00-17:00', 'Tuesday': '09:00-17:00'}
    image = models.ImageField(upload_to='shop_images', null=True, blank=True)
    timezone = models.CharField(max_length=50, default='UTC')
    
    def __str__(self):
        return self.name
class Service(models.Model):
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE, related_name='services')
    name = models.CharField(max_length=120)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.name} - {self.shop.name}"

class Appointment(models.Model):
    datetime = models.DateTimeField()
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    service = models.ForeignKey('Service', on_delete=models.CASCADE)
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE)

    def __str__(self):
        return f"Appointment for {self.user.full_name} at {self.datetime}"

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='reviews')  # Add default value
    rating = models.IntegerField()
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review by {self.user.full_name} for {self.service.name}"

class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='employee')
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE, related_name='employees')

    def __str__(self):
        return f"{self.user.full_name} at {self.shop.name}"
