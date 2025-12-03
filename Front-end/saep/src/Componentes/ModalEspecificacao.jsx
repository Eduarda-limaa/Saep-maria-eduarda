import { useState, useEffect } from "react";
import axios from "axios";
import estilo from "./ModalEspecificacao.module.css";

export default function ModalEspecificacao({ open, onClose, produto }) {
  const [form, setForm] = useState({
    tensao: "",
    dimensoes: "",
    resolucao_tela: "",
    capacidade_memoria: "",
    conectividade: "",
    descricao: "",
    produto: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!produto) return;

    if (produto.especificacao) {
      setForm({
        tensao: produto.especificacao.tensao ?? "",
        dimensoes: produto.especificacao.dimensoes ?? "",
        resolucao_tela: produto.especificacao.resolucao_tela ?? "",
        capacidade_memoria: produto.especificacao.capacidade_memoria ?? "",
        conectividade: produto.especificacao.conectividade ?? "",
        descricao: produto.especificacao.descricao ?? "",
        produto: produto.id,
      });
    } else {
      setForm({
        tensao: "",
        dimensoes: "",
        resolucao_tela: "",
        capacidade_memoria: "",
        conectividade: "",
        descricao: "",
        produto: produto.id,
      });
    }
  }, [produto]);

  if (!open) return null;

  async function salvar(e) {
    e.preventDefault();

    try {
      if (produto.especificacao) {
        await axios.put(
          `http://127.0.0.1:8000/especificacao/${produto.especificacao.id}/`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          "http://127.0.0.1:8000/especificacao/",
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      alert("Especificação salva com sucesso!");
      onClose(true);
    } catch (error) {
      console.log(error);
      alert("Erro ao salvar.");
    }
  }

  async function excluir() {
    if (!confirm("Excluir especificação?")) return;

    await axios.delete(
      `http://127.0.0.1:8000/especificacao/${produto.especificacao.id}/`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Especificação removida.");
    onClose(true);
  }

  return (
    <div className={estilo.overlay}>
      <div className={estilo.modal}>
        <button className={estilo.close} onClick={() => onClose(false)}>×</button>

        <h2>Especificações de {produto.nome}</h2>

        <form onSubmit={salvar}>
          <label>Tensão</label>
          <input
            value={form.tensao}
            onChange={(e) => setForm({ ...form, tensao: e.target.value })}
          />

          <label>Dimensões</label>
          <input
            value={form.dimensoes}
            onChange={(e) => setForm({ ...form, dimensoes: e.target.value })}
          />

          <label>Resolução da Tela</label>
          <input
            value={form.resolucao_tela}
            onChange={(e) => setForm({ ...form, resolucao_tela: e.target.value })}
          />

          <label>Memória</label>
          <input
            value={form.capacidade_memoria}
            onChange={(e) =>
              setForm({ ...form, capacidade_memoria: e.target.value })
            }
          />

          <label>Conectividade</label>
          <input
            value={form.conectividade}
            onChange={(e) => setForm({ ...form, conectividade: e.target.value })}
          />

          <label>Descrição</label>
          <textarea
            value={form.descricao}
            onChange={(e) => setForm({ ...form, descricao: e.target.value })}
          />

          <button type="submit" className={estilo.salvarBtn}>
            Salvar
          </button>

          {produto.especificacao && (
            <button
              type="button"
              className={estilo.excluirBtn}
              onClick={excluir}
            >
              Excluir Especificação
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
