from rest_framework import serializers
from .models import Produto, Movimentacao, Especificacao


class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = '__all__'
        read_only_fields = ['data_cadastro']


class EspecificacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Especificacao
        fields = '__all__'


class MovimentacaoSerializer(serializers.ModelSerializer):
    responsavel = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Movimentacao
        fields = '__all__'
        read_only_fields = ['responsavel', 'data_operacao']

    def create(self, validated_data):
        request = self.context.get('request')
        user = getattr(request, 'user', None)

        movimentacao = Movimentacao.objects.create(
            responsavel=user,
            **validated_data
        )

        return movimentacao
