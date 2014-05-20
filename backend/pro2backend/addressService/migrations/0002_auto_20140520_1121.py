# encoding: utf8
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('addressService', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='address',
            name='street',
            field=models.CharField(max_length=60, null=True, blank=True),
        ),
        migrations.AlterField(
            model_name='address',
            name='subnum',
            field=models.CharField(max_length=5, null=True, blank=True),
        ),
        migrations.AlterField(
            model_name='address',
            name='number',
            field=models.CharField(max_length=5, null=True, blank=True),
        ),
    ]
