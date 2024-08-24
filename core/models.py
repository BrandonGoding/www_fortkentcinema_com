from django.utils import timezone

from django.db import models
from django.db.models import TextChoices

from core.mixins import SlugModelMixin


class MovieRating(TextChoices):
    g = "G"
    pg = "PG"
    pg_13 = "PG-13"
    R = "R"


class Film(SlugModelMixin):
    slug_attr = 'name_and_release_year'
    title = models.CharField(max_length=100)
    tags = models.ManyToManyField("blog.Tag", blank=True)
    rating = models.CharField(choices=MovieRating, max_length=5)
    running_time_in_minutes = models.IntegerField(default=0)
    release_date = models.DateField()
    summary = models.TextField()
    omdb_id = models.CharField(max_length=100)
    omdb_response = models.JSONField()
    youtube_id = models.CharField(max_length=100)
    banner_image = models.ImageField(upload_to='movies/banners/')
    poster_image = models.ImageField(upload_to='movies/posters/', null=True, blank=True)

    def __str__(self):
        return self.title

    @property
    def release_year(self):
        return self.release_date.year

    @property
    def name_and_release_year(self):
        return f"{self.title} - {self.release_year}"


class ShowTime(models.Model):
    film = models.ForeignKey(to=Film, on_delete=models.CASCADE)
    start_time = models.DateTimeField()

    def __str__(self):
        return f"{self.start_time} - {self.film.title}"

    @property
    def is_matinee(self):
        # Set the comparison time to 4:00 PM on the same date
        four_pm = self.start_time.replace(hour=16, minute=0, second=0, microsecond=0)
        # Return True if the start_time is before or at 4:00 PM, otherwise False
        return self.start_time <= four_pm

    @property
    def is_past(self):
        return self.start_time < timezone.now()
