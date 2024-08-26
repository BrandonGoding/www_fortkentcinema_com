from django.utils import timezone
from django.shortcuts import render
from django.views.generic import TemplateView
from core.models import Film, ShowTime
from datetime import timedelta


class HomePage(TemplateView):
    template_name = 'core/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['week_dates'] = self._get_week_dates()
        context['films_by_date'] = self._films_for_week_dates(context['week_dates'])
        context["films"] = self._get_films_in_next_two_weeks()
        context['upcoming_films'] = self._get_upcoming_films()
        return context

    @staticmethod
    def _get_week_dates():
        today = timezone.now().date()
        start_of_week = today - timedelta(days=today.weekday())
        week_dates = [(start_of_week + timedelta(days=i)) for i in range(7)]
        return week_dates

    @staticmethod
    def _films_for_week_dates(week_dates):
        films_by_date = {
            date: Film.objects.filter(showtime__start_time__date=date).distinct()
            for date in week_dates
        }
        return films_by_date

    @staticmethod
    def _get_films_in_next_two_weeks():
        today = timezone.now()
        two_weeks_from_now = today + timedelta(weeks=2)

        # Filter showtimes within the next two weeks
        showtimes = ShowTime.objects.filter(
            start_time__range=(today, two_weeks_from_now)
        ).order_by('start_time')

        # Get distinct films based on the filtered showtimes
        film_ids = showtimes.values_list('film_id', flat=True).distinct()

        # Fetch the films by their IDs, preserving the order
        films = Film.objects.filter(id__in=film_ids).distinct()

        return films[:2]

    @staticmethod
    def _get_upcoming_films():
        today = timezone.now().date()
        end_of_today = today + timedelta(days=1)  # End of today

        # Exclude films with showtimes today
        films_playing_today = Film.objects.filter(
            showtime__start_time__date__lte=today
        ).distinct()

        # Include films with showtimes after today, excluding those playing today
        return Film.objects.filter(
            showtime__start_time__date__gte=end_of_today
        ).exclude(id__in=films_playing_today).distinct()

