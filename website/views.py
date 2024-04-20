from datetime import timezone

from django.views.generic import TemplateView

from website.models import Post


# Create your views here.
class HomePageTemplateView(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['posts'] = Post.objects.all().order_by('-pub_date')[:3]
        return context
