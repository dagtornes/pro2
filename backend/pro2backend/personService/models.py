from django.db import models


def valid_ssn(ssn):
    """
    Return true if ssn is a valid ssn in Norway.
    """

    return len(ssn) == 11


class Person(models.Model):

    first_name = models.CharField(max_length=60)
    last_name = models.CharField(max_length=60)
    ssn = models.CharField(max_length=11, validators=[valid_ssn])
