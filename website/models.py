from wagtail.models import Page
from wagtailseo.models import SeoMixin


class HomePage(SeoMixin, Page):
    max_count = 1

    content_panels = Page.content_panels + []
    promote_panels = SeoMixin.seo_panels
