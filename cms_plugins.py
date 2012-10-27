from cms.plugin_base import CMSPluginBase
from cms.plugin_pool import plugin_pool
from models import ProjectPlugin
from django.utils.translation import ugettext as _
import json

class CMSProjectPlugin(CMSPluginBase):
    model = ProjectPlugin
    name = "Project Info"
    render_template = "project_info/main.html"
    def render(self, context, instance, placeholder):
        activity = self.get_commit_activity(instance.project)
        context.update({
            'project':instance.project,
            'activity':activity,
            'activity_json':json.dumps(activity),
            'object':instance,
            'placeholder':placeholder
        })
        return context

    def get_commit_activity(self, project):
        from datetime import date, timedelta
        from pygit2 import Repository
        from pygit2 import GIT_SORT_TIME
        repo = Repository(project.gitrepo)

        weeks = self.get_weeks()
        for commit in repo.walk(repo.head.oid, GIT_SORT_TIME):
            commit_time = date.fromtimestamp(commit.commit_time)
            commit_week = commit_time - timedelta(days=commit_time.weekday())

            if commit_week not in weeks:
                continue

            weeks[commit_week]['mine'] += 1

        counts = []
        max = 0
        for k in sorted(weeks.iterkeys()):
            counts.append({
                "week":     k.isoformat(),
                "mine":     weeks[k]['mine'],
                "others":   weeks[k]['others'],
            })
        return counts

    def get_weeks(self):
        from datetime import date, timedelta
        today = date.today()
        monday = today - timedelta(days=today.weekday())

        weeks = {}
        while len(weeks) < 26:
            weeks[monday] = {'mine':0, 'others': 0}
            monday = monday - timedelta(days=7)

        return weeks

plugin_pool.register_plugin(CMSProjectPlugin)

