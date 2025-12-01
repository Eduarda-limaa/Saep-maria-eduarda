import { useEffect, useState } from "react";
import axios from "axios";

export default function EspecificacaoProduto({ produtoId, token }) {
  const [esp, setEsp] = useState(null);

  const [form, setForm] = useState({
    tensao: "",
    dimensoes: "",
    resolucao_tela: "",
    capacidade_memoria: "",
    conectividade: "",
    descricao: "",
  });

  async function carregar() {
    try {
      const resp = await axios.get(
        `http://127.0.0.1:8000/especificacao/${produtoId}/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEsp(resp.data);
      setForm(resp.data);
    } catch {
      // Se não existir especificação, esp fica null e mostra formulário vazio
      setEsp(null);
    }
  }

  async function salvar() {
    const url = `http://127.0.0.1:8000/especificacao/${produtoId}/`;

    if (esp) {
      // EDITAR
      await axios.put(url, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      // CRIAR
      await axios.post(url, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    carregar();
  }

  useEffect(() => {
    if (produtoId) carregar();
  }, [produtoId]);

  function atualizar(campo, valor) {
    setForm({ ...form, [campo]: valor });
  }

  return (
    <div className="box-especificacao">
      <h3>Especificações do Produto</h3>

      <label>Tensão</label>
      <input
        value={form.tensao}
        onChange={(e) => atualizar("tensao", e.target.value)}
      />

      <label>Dimensões</label>
      <input
        value={form.dimensoes}
        onChange={(e) => atualizar("dimensoes", e.target.value)}
      />

      <label>Resolução da Tela</label>
      <input
        value={form.resolucao_tela}
        onChange={(e) =>
          atualizar("resolucao_tela", e.target.value)
        }
      />

      <label>Capacidade de Memória</label>
      <input
        value={form.capacidade_memoria}
        onChange={(e) =>
          atualizar("capacidade_memoria", e.target.value)
        }
      />

      <label>Conectividade</label>
      <input
        value={form.conectividade}
        onChange={(e) =>
          atualizar("conectividade", e.target.value)
        }
      />

      <label>Descrição</label>
      <textarea
        value={form.descricao}
        onChange={(e) =>
          atualizar("descricao", e.target.value)
        }
      />

      <button onClick={salvar}>
        {esp ? "Salvar Alterações" : "Cadastrar Especificações"}
      </button>
    </div>
  );
}
