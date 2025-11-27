from rest_framework import serializers
from .models import Produto, Movimentacao, Especificacao

class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = '__all__'
        
class MovimentacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model= Movimentacao
        fields = '__all__'
        
class EspecificacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Especificacao
        fields = '__all__'