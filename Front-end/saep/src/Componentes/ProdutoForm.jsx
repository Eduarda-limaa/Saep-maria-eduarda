import ComboTipoProduto from "./ComboProduto";

export default function ProdutoForm({ form, setForm, onSubmit, editId }) {
  return (
    <form className="form-produto" onSubmit={onSubmit}>
      
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

      <label>Descrição</label>
      <input
        type="text"
        value={form.descricao}
        onChange={(e) => setForm({ ...form, descricao: e.target.value })}
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

      <button type="submit">
        {editId ? "Salvar Alterações" : "Cadastrar Produto"}
      </button>
    </form>
  );
}
