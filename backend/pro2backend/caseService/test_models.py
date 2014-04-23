from django.test import TestCase
from django.contrib.auth.models import User

from caseService.models import Case, ProcessSteps

class CaseTestCase(TestCase):
    
    def test_user_should_have_one_case(self):
        me = User.objects.create(username='dag')
        Case.objects.create(owner=me)

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

    def test_count_by_step_one_user(self):
        me = User.objects.create(username='me')

        Case.objects.create(owner=me, step=0)
        Case.objects.create(owner=me, step=0)
        Case.objects.create(owner=me, step=1)
        Case.objects.create(owner=me, step=1)
        Case.objects.create(owner=me, step=1)

        case_map = Case.count_by_step(me)

        self.assertEqual(2, case_map[0])
        self.assertEqual(3, case_map[1])

    def test_count_by_step_two_users(self):
        me = User.objects.create(username='me')
        him = User.objects.create(username='him')

        Case.objects.create(owner=me, step=0)
        Case.objects.create(owner=me, step=0)
        Case.objects.create(owner=me, step=1)
        Case.objects.create(owner=me, step=1)
        Case.objects.create(owner=me, step=1)

        Case.objects.create(owner=him, step=0)
        Case.objects.create(owner=him, step=1)
        Case.objects.create(owner=him, step=1)

        cases_me = Case.count_by_step(me)
        cases_him = Case.count_by_step(him)

        self.assertEqual({0: 2, 1: 3}, cases_me)
        self.assertEqual({0: 1, 1: 2}, cases_him)