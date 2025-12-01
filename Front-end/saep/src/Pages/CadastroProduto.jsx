import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CampoBusca from "../Componentes/CampoBusca";
import ProdutoForm from "../Componentes/ProdutoForm";
import ProdutoTabela from "../Componentes/ProdutoTabela";


export default function CadastroProduto() {
  const navigate = useNavigate();

  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");
  const [erro, setErro] = useState("");

  const [form, setForm] = useState({
    nome: "",
    tipo: "",
    descricao: "",
    quantidade: "",
    preco: "",
    estoque_minimo: "",
  });

  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  async function carregarProdutos() {
    const resp = await axios.get("http://127.0.0.1:8000/produto/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProdutos(resp.data);
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function buscar() {
    setErro("");

    if (busca.trim() === "") {
      setErro("Digite algo para buscar.");
      return;
    }

    try {
      const resp = await axios.get(
        `http://127.0.0.1:8000/produto/?search=${busca}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProdutos(resp.data);
    } catch {
      setErro("Erro ao buscar produtos.");
    }
  }

  async function salvar(e) {
    e.preventDefault();
    setErro("");

    if (!form.nome || !form.tipo || !form.preco || !form.quantidade || !form.estoque_minimo) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }

    if (isNaN(Number(form.preco))) {
      setErro("O preço deve ser um número.");
      return;
    }

    try {
      if (editId) {
        await axios.put(
          `http://127.0.0.1:8000/produto/${editId}/`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post("http://127.0.0.1:8000/produto/", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      carregarProdutos();
      setEditId(null);
      setForm({
        nome: "",
        tipo: "",
        descricao: "",
        quantidade: "",
        preco: "",
        estoque_minimo: "",
      });

    } catch {
      setErro("Erro ao salvar produto.");
    }
  }

  async function excluir(id) {
    if (!confirm("Confirmar exclusão?")) return;

    await axios.delete(`http://127.0.0.1:8000/produto/${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    carregarProdutos();
  }

  return (
    <div className="cadastro-container">
      <h1>Cadastro de Produtos</h1>

      {erro && <p className="erro">{erro}</p>}

      <CampoBusca value={busca} onChange={setBusca} onSearch={buscar} />

      <ProdutoForm
        form={form}
        setForm={setForm}
        onSubmit={salvar}
        editId={editId}
      />

      <ProdutoTabela
        produtos={produtos}
        onEdit={(produto) => {
          setEditId(produto.id);
          setForm(produto);
        }}
        onDelete={excluir}
      />

      <button onClick={() => navigate("/Inicial")} className="voltar-btn">
        Voltar
      </button>
    </div>
  );
}



