from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from django.views.generic import TemplateView

from core import views as core_views
from django_distill import distill_path

from core.models import Film

app_name = "core"


def get_all_films():
    for film in Film.objects.all():
        yield {"slug": film.slug}


urlpatterns = [
    distill_path("", core_views.HomePage.as_view(), name="homepage"),
    distill_path("rent-the-fort-kent-cinema", core_views.RentTheCinemaPage.as_view(), name="rent-the-cinema"),
    distill_path("<slug:slug>", core_views.FilmDetailView.as_view(), distill_func=get_all_films, name="film_detail"),
]
