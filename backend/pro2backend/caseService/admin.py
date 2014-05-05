from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User

from caseService.models import Case, ProcessStep, UserExtras


class UserExtrasInline(admin.StackedInline):
    model = UserExtras
    can_delete = False

class UserAdmin(UserAdmin):
    inlines = (UserExtrasInline,)


admin.site.register(Case)
admin.site.register(ProcessStep)
admin.site.unregister(User)
admin.site.register(User, UserAdmin)
