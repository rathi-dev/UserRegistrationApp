from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # Custom fields
    mobile_number = models.CharField(max_length=15, null=True, blank=True)
    linked_in_id = models.CharField(max_length=255, null=True, blank=True)
    naukri_id = models.CharField(max_length=255, null=True, blank=True)

    # Explicitly define related_name to avoid clashes
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_set',  # Custom related name for groups
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_permissions_set',  # Custom related name for user permissions
        blank=True
    )
