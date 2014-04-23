from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase

from django.contrib.auth.models import User

from caseService.models import Case

class ViewTestCase(APITestCase):

    def setUp(self):
        self.owner = User.objects.create(username='test', password='test')

    def test_step_view_no_steps(self):
        self.client.force_authenticate(user=self.owner)
        response = self.client.get(reverse('step-for-user'))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(0, len(response.data))

    def test_step_view_one_step(self):
        Case.objects.create(step=0, owner=self.owner)
        self.client.force_authenticate(user=self.owner)
        response = self.client.get(reverse('step-for-user'))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(1, len(response.data))

    def test_step_view_two_steps(self):                             
        Case.objects.create(step=0, owner=self.owner)              
        Case.objects.create(step=0, owner=self.owner)              
        Case.objects.create(step=1, owner=self.owner)              

        self.client.force_authenticate(user=self.owner)            
        response = self.client.get(reverse('step-for-user'))       
                                                                   
        self.assertEqual(response.status_code, status.HTTP_200_OK) 
        self.assertEqual(2, len(response.data))                    
        self.assertEqual(2, response.data[0])
        self.assertEqual(1, response.data[1])

    def test_step_view_one_step_two_owners(self):                              
        test2 = User.objects.create(username='test2')
        Case.objects.create(step=0, owner=self.owner)                
        Case.objects.create(step=0, owner=self.owner)                
        Case.objects.create(step=1, owner=test2)                
                                                                     
        self.client.force_authenticate(user=self.owner)              
        response = self.client.get(reverse('step-for-user'))         
                                                                     
        self.assertEqual(response.status_code, status.HTTP_200_OK)   
        self.assertEqual(1, len(response.data))                      
