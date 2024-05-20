from django.db import models
from wagtail import blocks

from wagtail.models import Page
from wagtail.fields import RichTextField, StreamField

# import MultiFieldPanel:
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from website import blocks as website_blocks
from wagtail.search import index
from wagtail.snippets.models import register_snippet


@register_snippet
class Movie(models.Model):
    title = models.CharField(max_length=255)
    imdb_id = models.CharField(max_length=12)

    def __str__(self):
        return self.title


class HomePage(Page):
    template = 'home.html'
    max_count = 1

    body = StreamField([
        ('default_hero_section', website_blocks.DefaultHeroSectionBlock()),
        ('cta_section_with_checklist', website_blocks.CtaSectionWithChecklistBlock()),
        ],
        null=True, blank=True
    )

    content_panels = Page.content_panels + [
        FieldPanel('body'),
    ]


class BlogIndexPage(Page):
    template = 'blogs/post_list.html'

    parent_page_types = ['website.HomePage']
    subpage_types = ['website.BlogPage']

    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request, *args, **kwargs)

        # Add extra variables and return the updated context
        context['blog_entries'] = BlogPage.objects.child_of(self).live()
        return context


@register_snippet
class BlogAuthor(models.Model):
    first_name = models.CharField(max_length=25)
    last_name = models.CharField(max_length=25)

    def __str__(self):
        return f'{self.last_name}, {self.first_name}'

    class Meta:
        ordering = ['last_name', 'first_name']


class BlogPage(Page):
    template = 'blogs/post_detail.html'
    author = models.ForeignKey(BlogAuthor, on_delete=models.PROTECT, null=True, blank=True)
    movie = models.ForeignKey(Movie, on_delete=models.PROTECT, null=True, blank=True)
    body = StreamField([
        ('paragraph', blocks.RichTextBlock()),
    ])
    date = models.DateField('Post date')
    feed_image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

    search_fields = Page.search_fields + [
        index.SearchField('body'),
        index.FilterField('date'),
    ]

    content_panels = Page.content_panels + [
        FieldPanel('date'),
        FieldPanel('author'),
        FieldPanel('body'),
        FieldPanel('movie')
    ]

    promote_panels = [
        MultiFieldPanel(Page.promote_panels, "Common page configuration"),
        FieldPanel('feed_image'),
    ]

    parent_page_types = ['website.BlogIndexPage']
    subpage_types = []

