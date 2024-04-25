from datetime import timezone

from django.views.generic import TemplateView, ListView, DetailView

from website.models import Post


# Create your views here.
class HomePageTemplateView(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['posts'] = Post.objects.all().order_by('-pub_date')[:3]
        return context


class MembershipTemplateView(TemplateView):
    template_name = 'membership.html'



class PostListView(ListView):
    template_name = 'blogs/post_list.html'
    model = Post
    context_object_name = 'posts'
    ordering = ['-pub_date']


class PostDetailView(DetailView):
    template_name = 'blogs/post_detail.html'
    model = Post
    context_object_name = 'post'
