from django.db import models
from decimal import Decimal
from django.contrib.auth.models import User


class Produto(models.Model):
    TIPOS = [
        ('SMARTPHONE', 'Smartphone'),
        ('NOTEBOOK', 'Notebook'),
        ('SMARTTV', 'Smart TV'),
    ]

    nome = models.CharField(max_length=100)
    tipo = models.CharField(max_length=20, choices=TIPOS)
    quantidade = models.IntegerField()
    preco = models.DecimalField(max_digits=10, decimal_places=2)
    estoque_minimo = models.IntegerField()
    data_cadastro = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True) # exclusão lógica 

    def __str__(self):
        return f"{self.nome} ({self.get_tipo_display()})"


class Especificacao(models.Model):
    produto = models.OneToOneField(
        Produto,
        on_delete=models.CASCADE,
        related_name="especificacao"
    )

    tensao = models.CharField(max_length=20)
    dimensoes = models.CharField(max_length=50)
    resolucao_tela = models.CharField(max_length=50)
    capacidade_memoria = models.CharField(max_length=50)
    conectividade = models.CharField(max_length=50)
    descricao = models.TextField()

    def __str__(self):
        return f"Especificações de {self.produto.nome}"


class Movimentacao(models.Model):
    TIPO_MOV = [
        ('ENTRADA', 'Entrada'),
        ('SAIDA', 'Saída'),
    ]

    produto = models.ForeignKey(
        Produto,
        on_delete=models.CASCADE,
        related_name="movimentacoes"
    )

    tipo = models.CharField(max_length=10, choices=TIPO_MOV)
    quantidade = models.IntegerField()
    responsavel =  models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    data_operacao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.tipo} de {self.quantidade} un. - {self.produto.nome}"
