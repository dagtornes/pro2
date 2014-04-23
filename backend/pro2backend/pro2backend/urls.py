from django.conf.urls import patterns, include, url
from django.contrib import admin

from rest_framework.routers import DefaultRouter

from caseService import views

router = DefaultRouter()
router.register(r'cases', views.CaseViewSet)
router.register(r'users', views.UserViewSet)

admin.autodiscover()

urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(router.urls)),
	url(r'^api/cases/step-for-user', views.step_for_user, name='step-for-user'),
    url(r'^auth/', include('rest_framework.urls', namespace='rest_framework')),
)
