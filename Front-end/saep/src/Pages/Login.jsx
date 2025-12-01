import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function fazerLogin(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/token/",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      console.log("RESPOSTA LOGIN:", response.data);

      // Salva o token
      localStorage.setItem("token", response.data.access);

      // Salva o nome do usuário
      localStorage.setItem("username", username);

      // Redireciona para a home
      navigate("/Inicial");

    } catch (err) {
      console.log("ERRO NO LOGIN:", err);
      alert("Usuário ou senha incorretos");
    }
  }

  return (
    <form onSubmit={fazerLogin}>
      <h1>Login</h1>

      <input
        type="text"
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Entrar</button>
    </form>
  );
}
