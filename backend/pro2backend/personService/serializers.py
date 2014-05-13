from rest_framework import serializers

from personService.models import Person
from addressService.serializers import AddressSerializer


class PersonSerializer(serializers.ModelSerializer):
    address_nested = AddressSerializer(source='address_set', read_only=True,
                                       many=True)

    class Meta:
        model = Person
        fields = ('id', 'first_name', 'last_name', 'ssn', 'address_nested')
