from django.core.exceptions import ValidationError
from django.db import models
import calendar
from django.core.validators import MaxValueValidator, MinValueValidator

month_choices = [(str(i), calendar.month_name[i]) for i in range(1,13)]

class Indices (models.Model):
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    acumulado_meses = models.DecimalField(max_digits=5, decimal_places=2)
    acumulado_ano = models.DecimalField(max_digits=5, decimal_places=2)


            