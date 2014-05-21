from rest_framework.serializers import ModelSerializer

from journeyService.models import Journey
from addressService.serializers import AddressSerializer


class JourneySerializer(ModelSerializer):
    departure_nested = AddressSerializer(source='departure', read_only=True)
    destination_nested = AddressSerializer(source='destination', read_only=True)

    class Meta:
        model = Journey
        fields = ('id', 'departure', 'departure_nested',
                  'destination', 'destination_nested', 'case')
