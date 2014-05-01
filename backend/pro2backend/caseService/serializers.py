from django.contrib.auth.models import User
from rest_framework import serializers
from caseService.models import Case, ProcessStep

class CaseSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.Field(source='owner.username')

    class Meta:
        model = Case
        fields = ('url', 'id', 'created', 'owner', 'step')

class ProcessStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProcessStep
        fields = read_only_fields = ('id', 'name', 'default_transition')

class UserSerializer(serializers.ModelSerializer):
    cases = serializers.PrimaryKeyRelatedField(many=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'cases')
