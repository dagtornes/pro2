# encoding: utf8
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('personService', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('street', models.CharField(max_length=60)),
                ('number', models.CharField(max_length=5)),
                ('subnum', models.CharField(max_length=5)),
                ('postid', models.CharField(max_length=4)),
                ('person', models.ForeignKey(to='personService.Person', to_field='id')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
