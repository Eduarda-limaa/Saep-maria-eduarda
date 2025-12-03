import { useState } from "react";
import axios from "axios";
import ComboTipoProduto from "./ComboProduto";
import estilo from './Produto.module.css';

export default function ProdutoForm({ open, onClose, form, setForm, editId }) {
  const [loading, setLoading] = useState(false);

  if (!open) return null; // modal escondido quando não está aberto

  if (!form.especificacao) {
    setForm({ ...form, especificacao: {} });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    try {
      let produtoId;

      if (editId) {
        await axios.put(
          `http://127.0.0.1:8000/produto/${editId}/`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        produtoId = editId;
      } else {
        const res = await axios.post(
          "http://127.0.0.1:8000/produto/",
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        produtoId = res.data.id;
      }

      if (form.especificacao && Object.values(form.especificacao).some(v => v)) {
        const especData = { ...form.especificacao, produto: produtoId };

        if (form.especificacao.id) {
          await axios.put(
            `http://127.0.0.1:8000/especificacao/${form.especificacao.id}/`,
            especData,
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } else {
          await axios.post(
            "http://127.0.0.1:8000/especificacao/",
            especData,
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }
      }

      alert("Produto e especificação salvos com sucesso!");
      onClose(true);
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar produto ou especificação.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={estilo.modalOverlay}>
      <div className={estilo.modalContainer}>
        <button className={estilo.modalClose} onClick={() => onClose(false)}>×</button>

        <h2 className={estilo.modalTitle}>
          {editId ? "Editar Produto" : "Cadastrar Produto"}
        </h2>

        <form className={estilo.formProduto} onSubmit={handleSubmit}>
          {/* ===== Seção Produto ===== */}
          <ComboTipoProduto
            value={form.tipo}
            onChange={(tipo) => setForm({ ...form, tipo })}
          />

          <label>Nome *</label>
          <input
            type="text"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          />

          <label>Data Cadastro</label>
          <input
            type="text"
            value={form.data_cadastro}
            onChange={(e) => setForm({ ...form, data_cadastro: e.target.value })}
          />

          <label>Preço *</label>
          <input
            type="number"
            value={form.preco}
            onChange={(e) => setForm({ ...form, preco: e.target.value })}
          />

          <label>Quantidade *</label>
          <input
            type="number"
            value={form.quantidade}
            onChange={(e) => setForm({ ...form, quantidade: e.target.value })}
          />

          <label>Estoque mínimo *</label>
          <input
            type="number"
            value={form.estoque_minimo}
            onChange={(e) =>
              setForm({ ...form, estoque_minimo: e.target.value })
            }
          />

          {/* ===== Seção Especificação ===== */}
          <h3 className={estilo.secaoTitulo}>Especificações do Produto</h3>

          <label>Tensão</label>
          <input
            type="text"
            value={form.especificacao.tensao || ""}
            onChange={(e) =>
              setForm({
                ...form,
                especificacao: { ...form.especificacao, tensao: e.target.value }
              })
            }
          />

          <label>Dimensões</label>
          <input
            type="text"
            value={form.especificacao.dimensoes || ""}
            onChange={(e) =>
              setForm({
                ...form,
                especificacao: { ...form.especificacao, dimensoes: e.target.value }
              })
            }
          />

          <label>Resolução da Tela</label>
          <input
            type="text"
            value={form.especificacao.resolucao_tela || ""}
            onChange={(e) =>
              setForm({
                ...form,
                especificacao: { ...form.especificacao, resolucao_tela: e.target.value }
              })
            }
          />

          <label>Memória</label>
          <input
            type="text"
            value={form.especificacao.capacidade_memoria || ""}
            onChange={(e) =>
              setForm({
                ...form,
                especificacao: { ...form.especificacao, capacidade_memoria: e.target.value }
              })
            }
          />

          <label>Conectividade</label>
          <input
            type="text"
            value={form.especificacao.conectividade || ""}
            onChange={(e) =>
              setForm({
                ...form,
                especificacao: { ...form.especificacao, conectividade: e.target.value }
              })
            }
          />

          <label>Descrição</label>
          <textarea
            value={form.especificacao.descricao || ""}
            onChange={(e) =>
              setForm({
                ...form,
                especificacao: { ...form.especificacao, descricao: e.target.value }
              })
            }
          />

          <button type="submit" className={estilo.modalSubmit} disabled={loading}>
            {loading ? "Salvando..." : editId ? "Salvar Alterações" : "Cadastrar Produto"}
          </button>
        </form>
      </div>
    </div>
  );
}
