from django.db import models
from cms.models import CMSPlugin

print "Hi!"

class Project(models.Model):
    name = models.CharField(max_length=30)
    gitrepo = models.CharField(max_length=120)

class ProjectPlugin(CMSPlugin):
    project = models.ForeignKey(Project)

