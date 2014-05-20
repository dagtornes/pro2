from django.db import models

from caseService.models import Case
from addressService.models import Address


class Journey(models.Model):

    case = models.ForeignKey(Case)

    departure = models.ForeignKey(Address, related_name='departure')
    destination = models.ForeignKey(Address, related_name='destination')
