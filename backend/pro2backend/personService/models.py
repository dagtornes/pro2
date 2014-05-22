from django.db import models
from django.core.exceptions import ValidationError


def valid_ssn(ssn):
    """
    Return true if ssn is a valid ssn in Norway.
    """

    if len(ssn) != 11:
        raise ValidationError("SSN must be 11 digits, len(%s) == %d"
                              % (ssn, len(ssn)))


class Person(models.Model):

    first_name = models.CharField(max_length=60)
    last_name = models.CharField(max_length=60)
    ssn = models.CharField(max_length=11, unique=True, validators=[valid_ssn])

    def __unicode__(self):
        return ' '.join((self.first_name, self.last_name))
