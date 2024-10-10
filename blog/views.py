from django.views.generic import ListView, DetailView
from blog.models import Post, Category, Tag
from django.db.models import Count


class BlogRoll(ListView):
    context_object_name = "blog_posts"
    queryset = Post.objects.all().order_by("-published_date")
    paginate_by = 20

    def get_context_data(self, **kwargs):
        context = super(BlogRoll, self).get_context_data(**kwargs)
        context["categories"] = Category.objects.all()
        context["tags"] = Tag.objects.annotate(blog_count=Count("post")).filter(
            blog_count__gt=0
        )
        return context


class BlogDetailView(DetailView):
    model = Post

    def get_context_data(self, **kwargs):
        context = super(BlogDetailView, self).get_context_data(**kwargs)
        context["categories"] = Category.objects.all()
        context["tags"] = Tag.objects.annotate(blog_count=Count("post")).filter(
            blog_count__gt=0
        )
        return context
