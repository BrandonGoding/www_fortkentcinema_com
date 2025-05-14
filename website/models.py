from django.db import models
from django.utils import timezone
from modelcluster.fields import ParentalKey
from modelcluster.models import ClusterableModel
from wagtail.admin.panels import FieldPanel, InlinePanel
from wagtail.fields import RichTextField
from wagtail.models import Page
from wagtail.snippets.models import register_snippet
from wagtailseo.models import SeoMixin, SeoType

MATINEE_HOUR_THRESHOLD = 17


# Snippets Models
@register_snippet
class BlogAuthor(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


@register_snippet
class Film(ClusterableModel):
    title = models.CharField(max_length=255)
    imdb_id = models.CharField(max_length=25, unique=True)

    panels = [
        FieldPanel("title"),
        FieldPanel("imdb_id"),
        InlinePanel("schedules", label="Schedules"),
    ]

    def __str__(self):
        return self.title

    def get_showtimes(self):
        """
        Returns showtimes grouped by date, ordered by start time.
        """
        showtimes = {}
        for schedule in self.schedules.all():
            # ensure showtimes are ordered by start_date_time
            for showtime in schedule.showtimes.all().order_by(
                "start_date_time"
            ):
                date = showtime.start_date_time.date()
                if date not in showtimes:
                    showtimes[date] = []
                showtimes[date].append(
                    {
                        "start_date_time": showtime.start_date_time,
                        "is_matinee": showtime.is_matinee,
                    }
                )

        # optionally: ensure the outer date keys are sorted too
        return dict(sorted(showtimes.items()))


class Schedule(ClusterableModel):
    start_date = models.DateField()
    end_date = models.DateField()
    film = ParentalKey(
        "Film",
        on_delete=models.CASCADE,
        related_name="schedules",
    )

    panels = [
        FieldPanel("start_date"),
        FieldPanel("end_date"),
        InlinePanel("showtimes", label="Showtimes"),
    ]

    def __str__(self):
        return f"{self.film.title} ({self.start_date} - {self.end_date})"


class Showtime(ClusterableModel):
    schedule = ParentalKey(
        Schedule,
        on_delete=models.CASCADE,
        related_name="showtimes",
    )
    start_date_time = models.DateTimeField()

    panels = [
        FieldPanel("start_date_time"),
    ]

    def __str__(self):
        return f"{self.schedule.film.title} - {self.start_date_time}"

    @property
    def is_matinee(self):
        return self.start_date_time.hour < MATINEE_HOUR_THRESHOLD


# Page Models
class HomePage(SeoMixin, Page):
    max_count = 1
    subpage_types = ["website.BlogRoll"]
    seo_content = SeoType.WEBSITE
    content_panels = Page.content_panels + []
    promote_panels = SeoMixin.seo_panels

    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request, *args, **kwargs)
        context["recent_posts"] = self._get_recent_posts()
        context["now_playing"] = self._get_now_playing()
        return context

    def _get_now_playing(self):
        """This method gets films, where a schedule's start date is in the past and end date is in the future"""
        now = timezone.now()
        active_schedules = Schedule.objects.filter(
            start_date__lte=now, end_date__gte=now
        ).select_related("film")
        # Use a set to avoid duplicate films
        return list({schedule.film for schedule in active_schedules})

    def _get_recent_posts(self):
        blog_roll = self.get_children().live().public().type(BlogRoll).first()
        all_posts = (
            blog_roll.get_children()
            .live()
            .public()
            .specific()  # <- important: cast to subclass like MovieReviewPage
            if blog_roll
            else None
        )
        return sorted(
            [post for post in all_posts if hasattr(post, "post_date")],
            key=lambda p: p.post_date,
            reverse=True,
        )[:3]


class BlogRoll(SeoMixin, Page):
    max_count = 1
    parent_page_types = ["website.HomePage"]
    promote_panels = SeoMixin.seo_panels

    def get_context(self, request, *args, **kwargs):
        """THIS IS TEMPORARY"""
        context = super().get_context(request, *args, **kwargs)
        blog_roll = self.get_children().live().specific()
        context["recent_posts"] = sorted(
            [post for post in blog_roll if hasattr(post, "post_date")],
            key=lambda p: p.post_date,
            reverse=True,
        )
        return context


class MovieReviewPage(SeoMixin, Page):
    film = models.OneToOneField(
        Film,
        on_delete=models.RESTRICT,
        null=True,
        blank=True,
        related_name="review",
    )
    author = models.ForeignKey(
        BlogAuthor,
        on_delete=models.RESTRICT,
        null=True,
        blank=True,
        related_name="reviews",
    )
    post_date = models.DateField(null=True, blank=True)
    body = RichTextField(blank=True)

    parent_page_types = ["website.BlogRoll"]
    subpage_types = []
    seo_content_type = SeoType.ARTICLE
    content_panels = Page.content_panels + [
        FieldPanel("film"),
        FieldPanel("author"),
        FieldPanel("post_date"),
        FieldPanel("body"),
    ]
    promote_panels = SeoMixin.seo_panels
