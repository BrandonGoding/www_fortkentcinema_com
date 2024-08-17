from datetime import datetime, timedelta
from django.utils import timezone
from django.shortcuts import render
from django.views.generic import TemplateView
from core.models import Film, ShowTime


# Create your views here.
class HomePage(TemplateView):
    template_name = 'core/index.html'

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super().get_context_data(**kwargs)
        # Add in a QuerySet of all the books
        context["films"] = Film.objects.all()
        context['week_dates'] = self._get_week_dates()
        context['films_by_date'] = self._films_for_week_dates()
        return context

    @staticmethod
    def _get_week_dates():
        # Start with today's date
        today = datetime.today()
        # Find the start of the week (Monday)
        start_of_week = today - timedelta(days=today.weekday())
        # Create a list with dates for the week
        week_dates = [(start_of_week + timedelta(days=i)).strftime('%a') for i in range(7)]
        return week_dates

    @staticmethod
    def _films_for_week_dates():
        # TODO: Fix repeating code
        # Start with today's date
        today = datetime.today()
        # Find the start of the week (Monday)
        start_of_week = today - timedelta(days=today.weekday())
        # Create a list with dates for the week
        week_dates = [(start_of_week + timedelta(days=i)) for i in range(7)]
        films_by_date = {}

        for date in week_dates:
            # Find all showtimes for the specific date
            showtimes = ShowTime.objects.filter(start_time__date=date)
            # Get the films associated with those showtimes
            films = Film.objects.filter(showtime__in=showtimes).distinct()
            films_by_date[date] = films
        return films_by_date

