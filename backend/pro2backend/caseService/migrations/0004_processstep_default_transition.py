# encoding: utf8
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('caseService', '0003_processstep_transitions'),
    ]

    operations = [
        migrations.AddField(
            model_name='processstep',
            name='default_transition',
            field=models.ForeignKey(to_field='id', blank=True, to='caseService.ProcessStep', null=True),
            preserve_default=True,
        ),
    ]
