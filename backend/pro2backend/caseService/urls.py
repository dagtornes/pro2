from django.conf.urls import patterns, url
from rest_framework.urlpatterns import format_suffix_patterns
from caseService.views import CaseList, CaseDetails, UserList, UserDetail

urlpatterns = patterns('caseService.views',
	url(r'^$', 'api_root'),
	url(r'cases/$', CaseList.as_view(), name='case-list'),
	url(r'cases/(?P<pk>\d+)/$', CaseDetails.as_view()),
	url(r'users/$', UserList.as_view(), name='user-list'),
	url(r'users/(?P<pk>\d+)/$', UserDetail.as_view()),
)

urlpatterns = format_suffix_patterns(urlpatterns)