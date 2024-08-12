from django.db import models


class Film(models.Model):
    title = models.CharField(max_length=100)
    omdb_id = models.CharField(max_length=100)
    omdb_response = models.JSONField()
