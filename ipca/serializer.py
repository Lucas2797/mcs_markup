from re import I
from rest_framework.serializers import ModelSerializer
from .models import Indices


class IndicesSerializer(ModelSerializer):
    class Meta:
        model = Indices
        fields = ['valor', 'date', 'acumulado_ano', 'acumulado_meses']


