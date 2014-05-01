from django.test import TestCase
from django.contrib.auth.models import User

from caseService.models import Case, ProcessStep


class CaseTestCase(TestCase):

    def test_user_should_have_one_case(self):
        me = User.objects.create(username='dag')
        step = ProcessStep.create("Test")
        Case.objects.create(owner=me, step=step)

        cases = Case.get_by_user(me)

        self.assertEqual(1, len(cases))

    def test_user_should_have_two_cases(self):
        me = User.objects.create(username='dag')
        Case.objects.create(owner=me)
        Case.objects.create(owner=me)

        cases = Case.get_by_user(me)

        self.assertEqual(2, len(cases))

    def test_two_users_with_cases(self):
        me = User.objects.create(username='me')
        him = User.objects.create(username='him')

        Case.objects.create(owner=me)
        Case.objects.create(owner=me)

        Case.objects.create(owner=him)
        Case.objects.create(owner=him)
        Case.objects.create(owner=him)

        cases_me = Case.get_by_user(me)
        cases_him = Case.get_by_user(him)

        self.assertEqual(2, len(cases_me))
        self.assertEqual(3, len(cases_him))
