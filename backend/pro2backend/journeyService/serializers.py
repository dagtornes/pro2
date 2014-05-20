from restframework.serilizer import ModelSerializer

from journeyService.models import Journey


class JourneySerializer(ModelSerializer):
    class Meta:
        model = Journey
        fields = ('id', 'departure', 'destination', 'case')
