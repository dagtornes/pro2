# encoding: utf8
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('caseService', '__first__'),
        ('addressService', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='Journey',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('case', models.ForeignKey(to='caseService.Case', to_field='id')),
                ('departure', models.ForeignKey(to='addressService.Address', to_field='id')),
                ('destination', models.ForeignKey(to='addressService.Address', to_field='id')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
