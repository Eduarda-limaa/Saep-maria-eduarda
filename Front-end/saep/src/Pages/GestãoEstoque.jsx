import { useEffect, useState } from "react";
import axios from "axios";

export default function GestaoEstoque() {
  const [produtos, setProdutos] = useState([]);
  const [produtoId, setProdutoId] = useState("");
  const [tipo, setTipo] = useState("entrada");
  const [quantidade, setQuantidade] = useState(0);
  const [mensagem, setMensagem] = useState("");
  const [historico, setHistorico] = useState([]);

  // Função auxiliar para pegar token
  function getToken() {
    return localStorage.getItem("token");
  }

  // Carregar produtos em ordem alfabética
  async function carregarProdutos() {
    try {
      const token = getToken();
      const resp = await axios.get("http://127.0.0.1:8000/produto/", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const ordenados = resp.data.sort((a, b) =>
        a.nome.localeCompare(b.nome)
      );

      setProdutos(ordenados);
    } catch (err) {
      console.error("Erro ao carregar produtos:", err);
      setMensagem("Erro ao carregar produtos.");
    }
  }

  // Listar histórico do produto
  async function carregarHistorico(id) {
    if (!id) {
      setHistorico([]);
      return;
    }

    try {
      const token = getToken();
      const resp = await axios.get(
        `http://127.0.0.1:8000/movimentacao/?produto=${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setHistorico(resp.data);
    } catch (err) {
      console.error("Erro ao carregar histórico:", err);
      setMensagem("Erro ao carregar histórico.");
    }
  }

  // Registrar Entrada/Saída
  async function registrarMovimentacao() {
    if (!produtoId || quantidade <= 0) {
      setMensagem("Preencha todos os campos!");
      return;
    }

    const produtoSelecionado = produtos.find(p => p.id == produtoId);

    let novoEstoque =
      tipo === "entrada"
        ? produtoSelecionado.quantidade + Number(quantidade)
        : produtoSelecionado.quantidade - Number(quantidade);

    // Verificação automática
    if (tipo === "saida" && novoEstoque < produtoSelecionado.estoque_minimo) {
      alert(
        `⚠️ Atenção: Estoque do produto ${produtoSelecionado.nome} está abaixo do mínimo!\n` +
        `Estoque Atual após saída: ${novoEstoque}\n` +
        `Estoque Mínimo: ${produtoSelecionado.estoque_minimo}`
      );
    }

    try {
      const token = getToken();
      await axios.post(
        "http://127.0.0.1:8000/movimentacao/",
        {
          produto: produtoId,
          tipo: tipo === "entrada" ? "ENTRADA" : "SAIDA",
          quantidade: Number(quantidade)
          // não enviar data_operacao, o backend gera sozinho
          // responsavel deve ser preenchido pelo backend com request.user
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMensagem("Movimentação registrada!");
      carregarProdutos();
      carregarHistorico(produtoId);
    } catch (err) {
      console.error("Erro ao registrar movimentação:", err);
      setMensagem("Erro ao registrar movimentação.");
    }
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  // Atualiza histórico ao trocar o produto
  useEffect(() => {
    carregarHistorico(produtoId);
  }, [produtoId]);

  return (
    <div className="container-mov">
      <h2>Gestão de Estoque</h2>

      {/* Combobox produtos */}
      <label>Selecione o produto:</label>
      <select
        value={produtoId}
        onChange={(e) => setProdutoId(e.target.value)}
      >
        <option value="">-- Escolher --</option>
        {produtos.map((p) => (
          <option key={p.id} value={p.id}>
            {p.nome} (Atual: {p.quantidade})
          </option>
        ))}
      </select>

      {/* Tipo */}
      <label>Tipo de movimentação:</label>
      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="entrada">Entrada</option>
        <option value="saida">Saída</option>
      </select>

      {/* Quantidade */}
      <label>Quantidade:</label>
      <input
        type="number"
        min="1"
        value={quantidade}
        onChange={(e) => setQuantidade(e.target.value)}
      />

      {/* Registrar */}
      <button onClick={registrarMovimentacao} className="btn-mov">
        Registrar
      </button>

      {mensagem && <p className="msg">{mensagem}</p>}

      {/* Histórico */}
      <h3>Histórico de Movimentações</h3>

      {historico.length === 0 ? (
        <p>Nenhuma movimentação encontrada.</p>
      ) : (
        <table className="tabela-historico">
          <thead>
            <tr>
              <th>Data</th>
              <th>Tipo</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {historico.map((h) => (
              <tr key={h.id}>
                <td>{h.data_operacao}</td>
                <td>{h.tipo}</td>
                <td>{h.quantidade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
