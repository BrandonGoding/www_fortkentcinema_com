from django.conf import settings
from storages.backends.s3boto3 import S3Boto3Storage


class StaticStorage(S3Boto3Storage):
    location = settings.STATICFILES_LOCATION
    custom_domain = settings.AWS_CLOUDFRONT_DOMAIN


class PublicMediaStorage(S3Boto3Storage):
    location = settings.AWS_PUBLIC_MEDIA_LOCATION
    file_overwrite = False
    custom_domain = settings.AWS_CLOUDFRONT_DOMAIN


class PrivateMediaStorage(S3Boto3Storage):
    location = settings.AWS_PRIVATE_MEDIA_LOCATION
    default_acl = "private"
    file_overwrite = False
    custom_domain = False