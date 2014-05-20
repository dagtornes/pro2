from django.contrib.auth.models import User
from rest_framework import serializers
from caseService.models import Case, ProcessStep
from caseService.models import UserExtras
from personService.serializers import PersonSerializer
from addressService.serializers import AddressSerializer
from journeyService.serializers import JourneySerializer


class CaseSerializer(serializers.ModelSerializer):
    owner = serializers.Field(source='owner.username')

    person_nested = PersonSerializer(source='person', read_only=True)
    address_nested = AddressSerializer(source='address', read_only=True)
    journeys_nested = JourneySerializer(source='journey_set', many=True)

    class Meta:
        model = Case
        fields = ('id', 'created', 'owner', 'step', 'address',
                  'address_nested', 'person', 'person_nested',
                  'journey_set', 'journeys_nested')


class ProcessStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProcessStep
        fields = read_only_fields = ('id', 'name', 'default_transition')


class UserExtrasSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserExtras
        fields = ('region', 'office')


class UserSerializer(serializers.ModelSerializer):
    cases = serializers.PrimaryKeyRelatedField(many=True)
    extra = UserExtrasSerializer()

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'cases',
                  'extra')
