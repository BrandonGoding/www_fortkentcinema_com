# Generated by Django 5.0.4 on 2024-05-20 12:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0008_alter_blogpage_body'),
    ]

    operations = [
        migrations.AddField(
            model_name='movie',
            name='omdb_response',
            field=models.JSONField(null=True),
        ),
    ]
