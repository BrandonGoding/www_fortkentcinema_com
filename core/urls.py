from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from django.views.generic import TemplateView

from core import views as core_views
from django_distill import distill_path

app_name = 'core'

urlpatterns = [
    distill_path('', core_views.HomePage.as_view(), name="homepage"),
]
