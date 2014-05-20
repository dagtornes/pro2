from rest_framework import viewsets

from journeyService.models import Journey
from journeyService.serializers import JourneySerializer


class JourneyViewSet(viewsets.ModelViewSet):

    queryset = Journey.objects.all()
    serializer_class = JourneySerializer
