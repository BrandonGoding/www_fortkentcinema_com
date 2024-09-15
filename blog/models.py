from django.contrib.auth.models import User
from django.db import models

from core.models import Film
from core.mixins import SlugModelMixin
from django.template.defaultfilters import slugify


class Category(SlugModelMixin):
    slug_attr = "name"
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class Tag(SlugModelMixin):
    slug_attr = "name"
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class Author(SlugModelMixin):
    slug_attr = "full_name"
    last_name = models.CharField(max_length=30)
    first_name = models.CharField(max_length=30)
    avatar = models.ImageField(upload_to="avatars")

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    def __str__(self):
        return f"{self.last_name}, {self.first_name}"


class Post(SlugModelMixin):
    slug_attr = "title"

    title = models.CharField(max_length=30)
    film = models.ForeignKey(
        to="core.Film", on_delete=models.SET_NULL, null=True, blank=True
    )
    author = models.ForeignKey(
        Author, on_delete=models.RESTRICT, blank=True, null=True, related_name="posts"
    )
    image = models.ImageField(upload_to="posts")
    body = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag, blank=True)
    published_date = models.DateField()
    created_on = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            if self.film:
                self.slug = slugify(f"A review of the movie {self.film.title}")
            else:
                self.slug = slugify(self.title)
        super(Post, self).save(*args, **kwargs)


class ReviewPost(models.Model):
    post = models.OneToOneField(Post, on_delete=models.RESTRICT)
    film = models.ForeignKey(Film, on_delete=models.RESTRICT)


class Comment(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    body = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    post = models.ForeignKey("Post", on_delete=models.CASCADE)
    approved = models.BooleanField(default=True)
