from django.contrib import admin
from .models import Indices


class IndicesConfig(admin.ModelAdmin):
    model = Indices
    list_display = ('date', 'valor', 'acumulado_ano', 'acumulado_meses')


admin.site.register(Indices, IndicesConfig)




