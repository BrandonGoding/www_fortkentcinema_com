from django.db import models
from django.template.defaultfilters import slugify

class SlugModelMixin(models.Model):
    slug = models.SlugField(unique=True, null=True, blank=True)

    def __init__(self, *args, **kwargs):
        super(SlugModelMixin, self).__init__(*args, **kwargs)
        self.slug_attr

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(getattr(self, self.slug_attr))
        super(SlugModelMixin, self).save(*args, **kwargs)

    @property
    def slug_attr(self):
        raise NotImplementedError

    class Meta:
        abstract = True
