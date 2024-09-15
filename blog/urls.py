from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from django.views.generic import TemplateView
from blog.models import Post

from blog import views as blog_views
from django_distill import distill_path

app_name = "blog"


def get_all_blogposts():

    for post in Post.objects.all():
        yield {"slug": post.slug}


urlpatterns = [
    distill_path("", blog_views.BlogRoll.as_view(), name="blog-roll"),
    distill_path(
        "<slug:slug>/",
        blog_views.BlogDetailView.as_view(),
        distill_func=get_all_blogposts,
        name="blog_detail",
    ),
]
