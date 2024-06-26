# Generated by Django 5.0.4 on 2024-05-22 12:16

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailcore', '0093_uploadedfile'),
        ('website', '0010_alter_movie_omdb_response'),
    ]

    operations = [
        migrations.CreateModel(
            name='GenericPage',
            fields=[
                ('page_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='wagtailcore.page')),
            ],
            options={
                'abstract': False,
            },
            bases=('wagtailcore.page',),
        ),
        migrations.AlterModelOptions(
            name='movie',
            options={'ordering': ['title']},
        ),
    ]
