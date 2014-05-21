# encoding: utf8
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('addressService', '0002_auto_20140520_1121'),
    ]

    operations = [
        migrations.AlterField(
            model_name='address',
            name='person',
            field=models.ForeignKey(to_field='id', blank=True, to='personService.Person', null=True),
        ),
    ]
