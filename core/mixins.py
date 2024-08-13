from django.db import models


class SlugModelMixin(models.Model):
    slug = models.SlugField(unique=True)

    class Meta:
        abstract = True
