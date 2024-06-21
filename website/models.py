from django.db import models
from wagtail import blocks

from wagtail.models import Page
from wagtail.fields import  StreamField

from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from website import blocks as website_blocks, omdb_service
from wagtail.search import index
from wagtail.snippets.models import register_snippet


@register_snippet
class Movie(models.Model):
    title = models.CharField(max_length=255)
    imdb_id = models.CharField(max_length=12)
    omdb_response = models.JSONField(null=True, blank=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['title']

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


@register_snippet
class Theater(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class HomePage(Page):
    template = 'home.html'
    max_count = 1

    body = StreamField([
        ('logo_hero', website_blocks.LogoHeroBlock()),
        ('default_hero_section', website_blocks.DefaultHeroSectionBlock()),
        ('cta_section_with_checklist', website_blocks.CtaSectionWithChecklistBlock()),
        ],
        null=True, blank=True
    )

    content_panels = Page.content_panels + [
        FieldPanel('body'),
    ]

    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request, *args, **kwargs)
        context['blog_entries'] = BlogPage.objects.all().live()[:3]
        return context


class AboutPage(Page):
    template = 'about.html'
    max_count = 1

    parent_page_types = ['website.HomePage']
    subpage_types = []


class Membership(Page):
    template = 'membership.html'
    max_count = 1

    parent_page_types = ['website.HomePage']
    subpage_types = []


class SupportPage(Page):
    template = 'support.html'
    max_count = 1

    parent_page_types = ['website.HomePage']
    subpage_types = []


class BlogIndexPage(Page):
    template = 'blogs/post_list.html'
    max_count = 1

    parent_page_types = ['website.HomePage']
    subpage_types = ['website.BlogPage']

    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request, *args, **kwargs)

        # Add extra variables and return the updated context
        context['blog_entries'] = BlogPage.objects.child_of(self).live().order_by('-date')
        return context


@register_snippet
class BlogAuthor(models.Model):
    first_name = models.CharField(max_length=25)
    last_name = models.CharField(max_length=25)
    avatar = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

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

