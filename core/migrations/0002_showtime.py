# Generated by Django 5.1 on 2024-08-17 19:10

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="ShowTime",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("start_time", models.DateTimeField()),
                (
                    "film",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="core.film"
                    ),
                ),
            ],
        ),
    ]
