import { FiEdit, FiTrash2 } from "react-icons/fi";
import estilo from "../Pages/Cadastro.module.css";

export default function ProdutoTabela({ produtos, onEdit, onDelete, onEspecificacao }) {
  return (
    <div className={estilo.tabelaWrapper}>

      <table className={estilo.produtoTabela}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Qtd</th>
            <th>Preço</th>
            <th>Especificação</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {produtos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nome}</td>
              <td>{p.tipo}</td>
              <td>{p.quantidade}</td>
              <td>R$ {p.preco}</td>
            

              <td>
                <button
                  className={estilo.especificacaoBtn}
                  onClick={() => onEspecificacao(p)}
                >
                  Ver
                </button>
              </td>
              <td>
                <div className={estilo.acao}>
                  <button className={estilo.editBtn} onClick={() => onEdit(p)}>
                    <FiEdit />
                  </button>

                  <button className={estilo.deleteBtn} onClick={() => onDelete(p.id)}>
                    <FiTrash2 />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
