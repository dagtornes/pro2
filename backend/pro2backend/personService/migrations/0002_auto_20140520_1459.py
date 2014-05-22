# encoding: utf8
from __future__ import unicode_literals

from django.db import models, migrations
import personService.models


class Migration(migrations.Migration):

    dependencies = [
        ('personService', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='person',
            name='ssn',
            field=models.CharField(unique=True, max_length=11, validators=[personService.models.valid_ssn]),
        ),
    ]
