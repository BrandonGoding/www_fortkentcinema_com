from django.contrib import admin
from website.models import BlogCategory, BlogTag, BlogAuthor, Post, Movie

# Register your models here.
admin.site.register(BlogCategory)
admin.site.register(BlogAuthor)
admin.site.register(BlogTag)
admin.site.register(Post)
admin.site.register(Movie)
