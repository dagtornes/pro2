from django.db import models
from django.db.models import Count

from django.contrib.auth.models import User


optional = {'blank': True, 'null': True}


class Case(models.Model):
    owner = models.ForeignKey('auth.User', related_name='cases', **optional)

    created = models.DateTimeField(auto_now_add=True)
    step = models.ForeignKey('ProcessStep', **optional)

    person = models.ForeignKey('personService.Person',
                               blank=True, null=True)
    address = models.ForeignKey('addressService.Address',
                                blank=True, null=True)

    def __unicode__(self):
        return 'Case[%d]: step=%s' % (self.pk, self.step)

    @classmethod
    def get_by_user(cls, user):
        return cls.objects.filter(owner=user)

    @classmethod
    def count_by_step(cls, user):
        cases = cls.get_by_user(user)
        step_map = cases.values('step').annotate(cnt=Count('step'))
        count_map = {v['step']: v['cnt'] for v in step_map}
        return count_map


class ProcessStep(models.Model):
    name = models.CharField(max_length=32)

    transitions = models.ManyToManyField(
        'self', symmetrical=False,
        related_name='+', blank=True, null=True)
    default_transition = models.ForeignKey('self', blank=True, null=True)

    def __unicode__(self):
        return 'ProcessStep[%d]: name=%s' % (self.pk, self.name)


class UserExtras(models.Model):
    user = models.OneToOneField(User, related_name='extra')
    region = models.CharField(max_length=32)
    office = models.CharField(max_length=32)
