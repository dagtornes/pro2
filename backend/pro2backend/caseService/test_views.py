from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase

from django.contrib.auth.models import User

from caseService.models import Case

class ViewTestCase(APITestCase):

	def setUp(self):
		self.owner = User.objects.create(username='test')

	def test_case_view_no_cases(self):
		Case.objects.create(step=0, owner=self.owner)
		Case.objects.create(step=0, owner=self.owner)

		response = self.client.get(reverse('case-list'))

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(0, len(response.data))