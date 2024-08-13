from django.contrib.auth.models import User
from django.db import models

from core.models import Film
from core.mixins import SlugModelMixin


class Category(SlugModelMixin):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class Tag(SlugModelMixin):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class Author(SlugModelMixin):
    last_name = models.CharField(max_length=30)
    first_name = models.CharField(max_length=30)


class Post(SlugModelMixin):
    slug_attr = 'title'

    title = models.CharField(max_length=30)
    author = models.ForeignKey(User, on_delete=models.RESTRICT)
    body = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag)
    published_date = models.DateField()
    created_on = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class ReviewPost(models.Model):
    post = models.OneToOneField(Post, on_delete=models.RESTRICT)
    film = models.ForeignKey(Film, on_delete=models.RESTRICT)


class Comment(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    body = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    post = models.ForeignKey("Post", on_delete=models.CASCADE)
    approved = models.BooleanField(default=True)
