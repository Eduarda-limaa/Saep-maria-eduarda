from django.shortcuts import render
from .serializers import ProdutoSerializer, EspecificacaoSerializer, MovimentacaoSerializer 
from .models import Produto, Movimentacao, Especificacao
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView 
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse


class ListCreateProduto(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer = ProdutoSerializer
    queryset = Produto.objects.all()
    
    
class RetrieveUpdateDestroyProduto(RetrieveUpdateDestroyAPIView):
    permission_classes= [IsAuthenticated]
    serializer = ProdutoSerializer
    queryset= Produto.objects.all()
    

class ListCreateEspecificacao(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer= EspecificacaoSerializer
    queryset = Especificacao.objects.all()
    

class RetrieveUpdateDestroyEspecificacao(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer = EspecificacaoSerializer
    queryset= Especificacao.objects.all()
    
