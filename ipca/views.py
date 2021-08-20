import datetime
from django.shortcuts import redirect, render
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from .models import Indices
from requests import Session
import json
from .extras import date_changer
from dateutil.relativedelta import relativedelta
from .models import Indices
from rest_framework.response import Response
from django.core import serializers
from .serializer import IndicesSerializer




class HomeView(APIView):
    template_name = 'home.html'

    def get(self, request):
        return render(request, self.template_name)

    def post(self, request):
        for obj in request.data:

            date = obj['data']
            to_obj = date_changer(date)
            url = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados'
            parameters = {
                'formato':'json',
                'dataInicial':date_changer(to_obj - relativedelta(months = 11)),
                'dataFinal':date,
            }
            headers = {
                'Accepts': 'application/json',
            }
            session = Session()
            session.headers.update(headers)
            try:
                response = session.get(url, params=parameters)
                data = json.loads(response.text)
                acumulado_ano = 0
                for o in data:
                    acumulado_ano += float(o['valor'])
                acumulado_meses = 0
                for o in reversed(data):
                    acumulado_meses += float(o['valor'])
                    if date_changer(o['data']).month == 1:
                        break

                if Indices.objects.filter(date=date_changer(date)).exists():
                    print("não salvo")
                else:
                    new_ipca = Indices(valor = float(obj['valor']), date=date_changer(date), acumulado_ano=acumulado_ano, acumulado_meses=acumulado_meses)
                    new_ipca.save()
            except Exception as e:
                return(e.with_traceback(e.__traceback__))
        return Response("ok")
                
class ListView(APIView):
    
    template_name = 'list.html'

    def get(self, request):
        return render(request, self.template_name, context = {'json':serializers.serialize("json", Indices.objects.all())})

    def delete(self, request):
        for obj in Indices.objects.all():
            obj.delete()
        return redirect('list')

class ListingView(APIView):

    def get(self, request):
        query = Indices.objects.all()
        return Response(IndicesSerializer(query, many=True).data)
