# Generated by Django 5.1 on 2024-08-17 20:55

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0006_alter_showtime_film"),
    ]

    operations = [
        migrations.AlterField(
            model_name="showtime",
            name="film",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="core.film"
            ),
        ),
    ]
