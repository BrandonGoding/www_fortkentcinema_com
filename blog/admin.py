from django.contrib import admin
from blog import models as blog_models

# Register your models here.
admin.site.register(blog_models.Post)
admin.site.register(blog_models.Category)
admin.site.register(blog_models.Tag)
admin.site.register(blog_models.Comment)
admin.site.register(blog_models.Author)