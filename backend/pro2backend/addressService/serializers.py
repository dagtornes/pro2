from rest_framework.serializers import ModelSerializer

from addressService.models import Address


class AddressSerializer(ModelSerializer):
    class Meta:
        model = Address
        fields = ('id', 'street', 'number', 'subnum', 'postid', 'person')
