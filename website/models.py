from django.db import models
from wagtail.admin.panels import FieldPanel
from wagtail.fields import RichTextField
from wagtail.models import Page
from wagtail.snippets.models import register_snippet
from wagtailseo.models import SeoMixin, SeoType


# Snippets Models
@register_snippet
class BlogAuthor(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


@register_snippet
class Film(models.Model):
    title = models.CharField(max_length=255)
    imdb_id = models.CharField(max_length=25, unique=True)


# Page Models


class HomePage(SeoMixin, Page):
    max_count = 1
    subpage_types = ["website.BlogRoll"]
    seo_content = SeoType.WEBSITE
    content_panels = Page.content_panels + []
    promote_panels = SeoMixin.seo_panels

    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request, *args, **kwargs)
        blog_roll = self.get_children().live().public().type(BlogRoll).first()
        context["recent_posts"] = (
            blog_roll.get_children()
            .live()
            .public()
            .order_by("-first_published_at")[:3]
            if blog_roll
            else []
        )
        return context


class BlogRoll(SeoMixin, Page):
    max_count = 1
    parent_page_types = ["website.HomePage"]
    promote_panels = SeoMixin.seo_panels


class MovieReviewPage(SeoMixin, Page):
    film = models.ForeignKey(
        Film,
        on_delete=models.RESTRICT,
        null=True,
        blank=True,
        related_name="reviews",
    )
    author = models.ForeignKey(
        BlogAuthor,
        on_delete=models.RESTRICT,
        null=True,
        blank=True,
        related_name="reviews",
    )
    post_date = models.DateField("Post Date", auto_now_add=True)
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
