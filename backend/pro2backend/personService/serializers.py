from rest_framework import serializers

from personService.models import Person


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
