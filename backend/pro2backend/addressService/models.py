from django.db import models

from personService.models import Person


class Address(models.Model):

    street = models.CharField(max_length=60, blank=True, null=True)
    number = models.CharField(max_length=5, blank=True, null=True)
    subnum = models.CharField(max_length=5, blank=True, null=True)

    postid = models.CharField(max_length=4)

    person = models.ForeignKey(Person, blank=True, null=True)

    def __unicode__(self):
        return "%s %s%s, %s" % (self.street, self.number,
                                self.subnum, self.postid)
