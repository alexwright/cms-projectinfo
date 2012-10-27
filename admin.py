from django.contrib import admin
from cms.admin.placeholderadmin import PlaceholderAdmin
from models import Project

class ProjectAdmin(admin.ModelAdmin):
    pass

admin.site.register(Project, ProjectAdmin)

