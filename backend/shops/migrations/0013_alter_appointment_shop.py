# Generated by Django 5.0.7 on 2024-08-18 04:38

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shops', '0012_alter_review_service_alter_service_shop'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='shop',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shops.shop'),
        ),
    ]
