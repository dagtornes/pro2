from django.contrib.auth.models import User

from rest_framework import permissions
from rest_framework import viewsets

from caseService.models import Case
from caseService.serializers import CaseSerializer
from caseService.serializers import UserSerializer

class UserViewSet(viewsets.ReadOnlyModelViewSet):

	queryset = User.objects.all()
	serializer_class = UserSerializer

class CaseViewSet(viewsets.ModelViewSet):
	queryset = Case.objects.all()
	serializer_class = CaseSerializer
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

	def pre_save(self, obj):
		obj.owner = self.request.user	
