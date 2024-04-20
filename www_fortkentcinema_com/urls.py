"""
URL configuration for www_fortkentcinema_com project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView

from website import views as website_views

urlpatterns = [
    path("", website_views.HomePageTemplateView.as_view(), name="home"),
    path("blog/", TemplateView.as_view(template_name="blogs/blog_content.html"), name="blog_roll"),
    path("admin/", admin.site.urls)
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)