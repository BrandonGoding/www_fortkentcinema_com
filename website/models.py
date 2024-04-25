from django.db import models
from django.utils.text import slugify
from website import omdb_service

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
    imdb_id = models.CharField(max_length=10, unique=True, null=True, blank=True)
    omdb_response = models.JSONField(null=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.omdb_response is None and self.imdb_id:
            try:
                imdb_data = omdb_service.get_move_data_from_imdb(self.imdb_id)
            except Exception as e:
                print(e)
                imdb_data = None
            self.omdb_response = imdb_data
        super(Movie, self).save(*args, **kwargs)

    @property
    def poster(self):
        if not self.omdb_response:
            return None
        return self.omdb_response.get("Poster", None)

    @property
    def ratings_dict(self):
        if not self.omdb_response:
            return None
        return self.omdb_response.get("Ratings")


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

