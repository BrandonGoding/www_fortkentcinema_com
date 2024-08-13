from django.db import models


class SlugModelMixin(models.Model):
    slug = models.SlugField(unique=True)

    def __init__(self, *args, **kwargs):
        super(SlugModelMixin, self).__init__(*args, **kwargs)
        self.slug_attr

    @property
    def slug_attr(self):
        raise NotImplementedError

    class Meta:
        abstract = True
