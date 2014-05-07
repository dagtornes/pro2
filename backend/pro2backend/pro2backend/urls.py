from django.conf.urls import patterns, include, url
from django.contrib import admin

from rest_framework.routers import DefaultRouter

from caseService import views as case_views
from personService import views as person_views


router = DefaultRouter()
router.register(r'cases', case_views.CaseViewSet)
router.register(r'users', case_views.UserViewSet)
router.register(r'process_step', case_views.ProcessStepViewSet)
router.register(r'persons', person_views.PersonViewSet)

admin.autodiscover()

urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(router.urls)),
    url(r'^api/cases/step-for-user', case_views.step_for_user, name='step-for-user'),
    url(r'^api/users/by_name/(?P<username>[a-z]+)/', case_views.user_by_name, name='user-by-name'),
    url(r'^auth/', include('rest_framework.urls', namespace='rest_framework')),
)
