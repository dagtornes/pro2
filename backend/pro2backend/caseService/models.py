from django.db import models
from django.db.models import Count

class Case(models.Model):
    owner = models.ForeignKey('auth.User', related_name='cases', blank=True, null=True)

    created = models.DateTimeField(auto_now_add=True)
    step = models.ForeignKey('ProcessStep')

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

class ProcessStep(models.Model):
    name = models.CharField(max_length=32)

    transitions = models.ManyToManyField('self', blank=True, null=True, symmetrical=False, related_name='+')
    default_transition = models.ForeignKey('self', blank=True, null=True)

    def __unicode__(self):
        return "ProcessStep[%d]: name=%s" % (self.pk, self.name)
