from django.contrib import admin
from . import (
    models as core_models,
)  # Adjust the import if your models are in a different module


class ShowTimeInline(admin.TabularInline):
    model = core_models.ShowTime
    extra = 1  # This determines how many empty forms are shown by default


class FilmAdmin(admin.ModelAdmin):
    inlines = [ShowTimeInline]


admin.site.register(core_models.Film, FilmAdmin)
admin.site.register(
    core_models.ShowTime
)  # This is optional if you want to also have a separate admin for ShowTime
