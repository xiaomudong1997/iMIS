# Generated by Django 5.1 on 2024-08-26 14:42

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("orders", "0007_alter_order_order_date"),
    ]

    operations = [
        migrations.AlterField(
            model_name="order",
            name="order_date",
            field=models.DateField(verbose_name=datetime.date(2024, 8, 26)),
        ),
    ]
