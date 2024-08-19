# Generated by Django 5.0.7 on 2024-08-16 15:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shops', '0002_alter_shop_image_alter_shop_opening_hours'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shop',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='shop_images'),
        ),
        migrations.AlterField(
            model_name='user',
            name='profile_picture',
            field=models.ImageField(blank=True, null=True, upload_to='profile_user_images'),
        ),
    ]
