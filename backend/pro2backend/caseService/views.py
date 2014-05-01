from django.contrib.auth.models import User

from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.decorators import api_view

from caseService.models import Case
from caseService.models import ProcessStep
from caseService.serializers import CaseSerializer
from caseService.serializers import UserSerializer
from caseService.serializers import ProcessStepSerializer

class UserViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer

class CaseViewSet(viewsets.ModelViewSet):
    queryset = Case.objects.all()
    serializer_class = CaseSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def pre_save(self, obj):
        obj.owner = self.request.user


class ProcessStepViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ProcessStep.objects.all()
    serializer_class = ProcessStepSerializer

@api_view(['GET'])
def step_for_user(request):
	"""
	Return a map of step -> count for the given users cases
	"""

	step_map = Case.count_by_step(request.user)
	return Response(step_map)
		
