from django.utils import timezone
from django.views.generic import TemplateView, DetailView
from datetime import timedelta, datetime
from .models import Film, ShowTime


class HomePage(TemplateView):
    template_name = "core/index.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["week_dates"] = self._get_week_dates()
        context["films_by_date"] = self._films_for_week_dates(context["week_dates"])
        context["films"] = self._get_films_in_next_two_weeks()
        context["upcoming_films"] = self._get_upcoming_films()
        return context

    @staticmethod
    def _get_week_dates():
        today = timezone.now().date()
        start_of_week = today - timedelta(days=today.weekday())
        week_dates = [(start_of_week + timedelta(days=i)) for i in range(7)]
        return week_dates

    @staticmethod
    def _films_for_week_dates(week_dates):
        films_by_date = {}
        for date in week_dates:
            start_of_day = timezone.make_aware(
                datetime.combine(date, datetime.min.time())
            )
            end_of_day = timezone.make_aware(
                datetime.combine(date, datetime.max.time())
            )
            films = Film.objects.filter(
                showtime__start_time__range=(start_of_day, end_of_day)
            ).distinct()
            films_by_date[date] = films
        return films_by_date

    @staticmethod
    def _get_films_in_next_two_weeks():
        today = timezone.now()
        two_weeks_from_now = today + timedelta(weeks=2)

        # Get films with showtimes within the next two weeks
        films = (
            Film.objects.filter(showtime__start_time__range=(today, two_weeks_from_now))
            .distinct()
            .order_by("showtime__start_time")
        )
        return films[:2]  # Get the first two films

    @staticmethod
    def _get_upcoming_films():
        today = timezone.now()
        end_of_today = timezone.make_aware(datetime.combine(today, datetime.max.time()))

        # Get films that are playing today or in the past
        films_playing_today_or_past = Film.objects.filter(
            showtime__start_time__lt=end_of_today
        ).distinct()

        # Get distinct upcoming films, excluding those playing today or in the past
        upcoming_films = (
            Film.objects.filter(showtime__start_time__gte=end_of_today)
            .exclude(id__in=films_playing_today_or_past.values_list("id", flat=True))
            .distinct()
        )

        # Sort by the next available showtime
        return sorted(upcoming_films, key=lambda film: film.showtime_set.first().start_time)


class RentTheCinemaPage(TemplateView):
    template_name = "core/rent-the-cinema.html"


class FilmDetailView(DetailView):
    model = Film

    # def get_context_data(self, **kwargs):
    #     context = super().get_context_data(**kwargs)
    #     showtime_list = {}
    #
    #     # Fetch showtimes and order by start_time (date and time are ordered)
    #     showtimes = self.object.showtime_set.all().order_by("start_time")
    #
    #     # Populate the showtime_list dictionary with dates as keys and showtimes as values
    #     for showtime in showtimes:
    #         showtime_date = showtime.start_time.date()
    #
    #         # Initialize the date key if it doesn't exist
    #         if showtime_date not in showtime_list:
    #             showtime_list[showtime_date] = []
    #
    #         # Append the showtime to the correct date
    #         showtime_list[showtime_date].append(showtime.start_time)
    #
    #     # Add the showtime list to the context
    #     context["showtime_list"] = showtime_list
    #     return context

