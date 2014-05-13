# encoding: utf8
from __future__ import unicode_literals

from django.db import models, migrations
import personService.models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Person',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('first_name', models.CharField(max_length=60)),
                ('last_name', models.CharField(max_length=60)),
                ('ssn', models.CharField(max_length=11, validators=[personService.models.valid_ssn])),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
