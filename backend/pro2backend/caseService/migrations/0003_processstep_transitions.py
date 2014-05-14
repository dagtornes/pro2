# encoding: utf8
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('caseService', '0002_case_step'),
    ]

    operations = [
        migrations.AddField(
            model_name='processstep',
            name='transitions',
            field=models.ManyToManyField(to='caseService.ProcessStep', null=True, blank=True),
            preserve_default=True,
        ),
    ]
