from rest_framework import viewsets

from personService.serializers import PersonSerializer
from personService.models import Person


class PersonViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = Person.objects.all()
    serializer_class = PersonSerializer
