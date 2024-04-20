from django.db import models


class BlogCategory(models.Model):
    name = models.CharField(max_length=65)
    slug = models.SlugField()
    description = models.TextField()

    def __str__(self):
        return self.name


class BlogTag(models.Model):
    name = models.CharField(max_length=65)
    slug = models.SlugField()
    description = models.TextField()

    def __str__(self):
        return self.name


class BlogAuthor(models.Model):
    last_name = models.CharField(max_length=65)
    first_name = models.CharField(max_length=65)
    avatar = models.ImageField(upload_to='static/img/blog_author/%Y/%m')
    slug = models.SlugField()

    def __str__(self):
        return f"{self.last_name}, {self.first_name}"


class Post(models.Model):
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255)
    banner_image = models.ImageField(upload_to='static/img/banner_images/%Y/%m', blank=True, null=True)
    content = models.TextField()
    author = models.ForeignKey(BlogAuthor, on_delete=models.PROTECT)
    pub_date = models.DateField('date published')
    category = models.ForeignKey(BlogCategory, on_delete=models.PROTECT)
    tags = models.ManyToManyField(BlogTag, blank=True)

    def __str__(self):
        return self.title
