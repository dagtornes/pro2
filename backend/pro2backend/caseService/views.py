from django.contrib.auth.models import User

from rest_framework import permissions
from rest_framework import viewsets
from rest_framework.decorators import link

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

    @link()
    def by_user(self, request):
        """
        Gets cases by user
        """

        cases = Case.get_by_user(request.user)
        serializer = CaseSerializer(data=cases)

        if serializer.is_valid():
            return Response(serializer.data)
