from django.db import models

ProcessSteps = (
	(0, "Created"),
	(1, "Distributed"),
	(2, "Assigned"),
	(3, "Completed"),
	(4, "Finished"),
)

def create_case(owner, step):
	step = filter(lambda on: on[1] == step, ProcessSteps)[0][0]
	return Case(owner=owner, step=step)


# Create your models here.
class Case(models.Model):
	owner = models.ForeignKey('auth.User', related_name='cases')

	created = models.DateTimeField(auto_now_add=True)
	step = models.SmallIntegerField(choices=ProcessSteps)