from django import template
from django.urls import reverse

register = template.Library()


@register.simple_tag(takes_context=True)
def active_url(context, url_name):
    request = context["request"]
    current_path = request.path

    try:
        # Reverse the URL pattern to get the base path
        url_path = reverse(url_name)
    except:
        return ""

    # Special handling for home URL
    if url_path == "/" and current_path == "/":
        return "active"

    # Check if the current path starts with the base path
    if url_path != "/" and current_path.startswith(url_path):
        return "active"

    return ""
