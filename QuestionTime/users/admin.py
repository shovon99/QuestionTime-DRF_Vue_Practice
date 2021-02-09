from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from users.models import CustomUser


# Register your models here.

#admin.site.register(CustomUser)

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display=["username", "email", "is_staff"]


admin.site.register(CustomUser, CustomUserAdmin)