from django.db import models
from django.utils.text import slugify


class BlogCategory(models.Model):
    name = models.CharField(max_length=65)
    slug = models.SlugField()
    description = models.TextField()

    def __str__(self):
        return self.name


class BlogTag(models.Model):
    name = models.CharField(max_length=65)
    slug = models.SlugField()
    description = models.TextField()

    def __str__(self):
        return self.name


class BlogAuthor(models.Model):
    last_name = models.CharField(max_length=65)
    first_name = models.CharField(max_length=65)
    avatar = models.ImageField(upload_to='static/img/blog_author/%Y/%m')
    slug = models.SlugField()

    def __str__(self):
        return f"{self.last_name}, {self.first_name}"


class Movie(models.Model):
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title


class Post(models.Model):
    title = models.CharField(max_length=255)
    banner_image = models.ImageField(upload_to='static/img/banner_images/%Y/%m', blank=True, null=True)
    content = models.TextField()
    author = models.ForeignKey(BlogAuthor, on_delete=models.PROTECT)
    pub_date = models.DateField('date published')
    category = models.ForeignKey(BlogCategory, on_delete=models.PROTECT)
    tags = models.ManyToManyField(BlogTag, blank=True)
    slug = models.SlugField(null=True, blank=True)
    movie = models.OneToOneField(Movie, on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"review of {self.movie.title}" if self.movie else self.title)
        super(Post, self).save(*args, **kwargs)

