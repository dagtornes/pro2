from django.db import models
from django.db.models import Count

ProcessSteps = (
    (0, "Created"),
    (1, "Distributed"),
    (2, "Assigned"),
    (3, "Completed"),
    (4, "Finished"),
)

def create_case(owner, step):
    step = filter(lambda on: on[1] == step, ProcessSteps)[0][0]
    return Case(owner=owner, step=step)


# Create your models here.
class Case(models.Model):
    owner = models.ForeignKey('auth.User', related_name='cases')

    created = models.DateTimeField(auto_now_add=True)
    step = models.SmallIntegerField(choices=ProcessSteps, default=0)

    def __unicode__(self):
        return "Case[%d]: step=%s" % (self.pk, self.step)

    @classmethod
    def get_by_user(cls, user):
        return cls.objects.filter(owner=user)

    @classmethod
    def count_by_step(cls, user):
        step_map = cls.get_by_user(user).values('step').annotate(cnt=Count('step'))
        count_map = {v['step']: v['cnt'] for v in step_map}
        return count_map