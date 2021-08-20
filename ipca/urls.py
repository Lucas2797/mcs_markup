from django.urls import path
from . import views
from django.views.generic import TemplateView


urlpatterns = [
    path('home/', views.HomeView.as_view(), name='home'),
    path('list/', views.ListView.as_view(), name='list'),
    path('listing/', views.ListingView.as_view(), name='listing'),
    path('home_js/', (TemplateView.as_view(template_name="js/home.js", content_type='text/javascript', )), name='home_js'),
    path('list_js/', (TemplateView.as_view(template_name="js/list.js", content_type='text/javascript', )), name='list_js'),
]