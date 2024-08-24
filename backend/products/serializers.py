from django.conf import settings
from rest_framework import serializers
from .models import Product, Shop

class ProductSerializer(serializers.ModelSerializer):
    shop = serializers.ReadOnlyField(source='shop.id')
    image = serializers.ImageField(required=False, use_url=False)

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'image', 'shop', 'category', 'stock_quantity', 'created_at', 'updated_at']

    def create(self, validated_data):
        request = self.context.get('request', None)
        if request is not None:
            shop_id = request.data.get('shop_id')
            if shop_id:
                try:
                    shop = Shop.objects.get(pk=shop_id)
                    if shop.type != 'beauty_supplier':
                        raise serializers.ValidationError("Only beauty suppliers can create products.")
                    validated_data['shop'] = shop
                except Shop.DoesNotExist:
                    raise serializers.ValidationError({'shop': 'Shop not found'})
        return super().create(validated_data)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if 'image' in representation and representation['image']:
            representation['image'] = f"{settings.MEDIA_URL}{representation['image']}"
        return representation
