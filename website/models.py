from django.db import models
from wagtail.fields import RichTextField
from wagtail.models import Page
from wagtailseo.models import SeoMixin, SeoType


class HomePage(SeoMixin, Page):
    max_count = 1
    subpage_types = ["website.BlogRoll"]
    seo_content = SeoType.WEBSITE
    content_panels = Page.content_panels + []
    promote_panels = SeoMixin.seo_panels


class BlogAuthor(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class BlogRoll(SeoMixin, Page):
    max_count = 1
    parent_page_types = ["website.HomePage"]
    promote_panels = SeoMixin.seo_panels


class MovieReviewPage(SeoMixin, Page):
    author = models.ForeignKey(
        BlogAuthor, on_delete=models.SET_NULL, null=True, blank=True
    )
    body = RichTextField(blank=True)

    parent_page_types = ["website.BlogRoll"]
    subpage_types = []
    seo_content_type = SeoType.ARTICLE
    content_panels = Page.content_panels + []
    promote_panels = SeoMixin.seo_panels
