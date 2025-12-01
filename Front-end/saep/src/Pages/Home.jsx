import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiUser, FiBox, FiList, FiLogOut } from "react-icons/fi";
import estilo from './Home.module.css'

export default function Home() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("username");
    setNome(user);
  }, []);

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="user-info">
          <FiUser className="user-icon" />
          <span className="user-name">
            Olá, {nome ? nome : "usuário"}!
          </span>
        </div>

        <button className="logout-btn" onClick={logout}>
          <FiLogOut /> Sair
        </button>
      </header>

      <main className="home-content">
        <h1 className="home-title">Menu principal</h1>

        <div className="home-cards">
          <button 
            className="home-card"
            onClick={() => navigate("/cadastro-produto")}
          >
            <FiBox className="card-icon" />
            <span>Cadastro de Produto</span>
          </button>

          <button 
            className="home-card"
            onClick={() => navigate("/gestao-estoque")}
          >
            <FiList className="card-icon" />
            <span>Gestão de Estoque</span>
          </button>
        </div>
      </main>
    </div>
  );
}
