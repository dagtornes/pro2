# encoding: utf8
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('addressService', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='address',
            name='person',
            field=models.ForeignKey(to='personService.Person', default=1, to_field='id'),
            preserve_default=False,
        ),
    ]
