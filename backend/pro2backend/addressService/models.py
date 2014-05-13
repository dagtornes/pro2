from django.db import models

from personService.models import Person


class Address(models.Model):

    street = models.CharField(max_length=60)
    number = models.CharField(max_length=5)
    subnum = models.CharField(max_length=5)

    postid = models.CharField(max_length=4)

    person = models.ForeignKey(Person)
