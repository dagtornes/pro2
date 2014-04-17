from django.contrib.auth.models import User
from rest_framework import serializers
from caseService.models import Case, ProcessSteps

class CaseSerializer(serializers.ModelSerializer):
	owner = serializers.Field(source='owner.username')

	class Meta:
		depth = 1
		model = Case
		fields = ('created', 'owner', 'step')

class UserSerializer(serializers.ModelSerializer):
	cases = serializers.PrimaryKeyRelatedField(many=True)

	class Meta:
		model = User
		fields = ('id', 'username', 'cases')