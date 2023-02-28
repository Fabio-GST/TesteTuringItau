import React, { useState } from 'react';
import axios from 'axios';
import '../style/Login.css'
import LoginModal from '../components/LoginModal';
import {useNavigate} from 'react-router-dom';


function Login(props) {

  const [login, setLogin] = useState();
  const [senha, setSenha] = useState();
  const [nome, setNome] = useState();

  const [exibirFormRegistro, setExibirFormRegistro] = useState(false);
  const [exibirModal, setExibirModal] = useState(true);

  const navigate = useNavigate();

  function fecharModal() {
    setExibirModal(false);
  }

  function toggleForm() {
    setExibirFormRegistro(!exibirFormRegistro);
  }

  const autenticar = () => {
    const api = axios.create({
      baseURL: "http://localhost:8091/api/v1/",
    });

    api.post('/usuario/autenticar', {
      'login': login,
      'senha': senha
    })
      .then((Response) => {
        props.updateUser(Response.data);
        navigate('/');
      })
      .catch((err) => alert(err.response.data.err))
  }

  const cadastrar = () => {
    if (nome && login && senha) {
      // Todos os campos estão definidos
      const api = axios.create({
        baseURL: "http://localhost:8091/api/v1/",
      });
      const data = {
        'nome': nome,
        'login': login,
        'senha': senha,
        'saldo': 0
      };
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      api.post('/usuario', JSON.stringify(data), config)
        .then((response) => alert('Usuário criado com sucesso'))
        .catch((err) => alert(err.response.data.err))
    } else {
      alert('Preencha todos os campos antes de cadastrar o usuário')
    }
  }

  return (
    <div>
    {exibirModal && (
      <LoginModal onClose={fecharModal}>
        <h2>Sobre o Projeto</h2>
        <p>Aqui você pode colocar uma descrição do projeto.</p>
      </LoginModal>
    )}
        < div
      style={{
        fontFamily:'EB Garamond , serif',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        fontSize: '1.5rem'
      }
      }
    >
      <div style={{ maxWidth: 500, width: '100%', padding: 30, border: "3px solid #ccc" , borderRadius:'20px'}}>
        <h2 style={{ textAlign: "center", margin: "0 0 20px" }}>
          {exibirFormRegistro ? "Formulário de Cadastro" : "Formulário de Login"}
        </h2>
        <div>
          {exibirFormRegistro ? (
            <div>
              <label>
                Nome:
                <input
                  type="text"
                  onChange={(e) => setNome(e.target.value)}
                />
              </label>
              <div>
                <label>
                  Login:
                  <input
                    type="text"
                    onChange={(e) => setLogin(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label>
                  Senha:
                  <input
                    type="password"
                    onChange={(e) => setSenha(e.target.value)}
                  />
                </label>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: '20px' }}>
                <button onClick={toggleForm} style={{ width: "45%", boxSizing: "border-box" }}>
                  {exibirFormRegistro ? "Tela De Login" : "Tela De Cadastro"}
                </button>
                <button onClick={cadastrar} style={{ width: "45%", boxSizing: "border-box", color:'lightgreen', border:'lightgreen solid 3px'  }}>
                  Registrar
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div>
                <label>
                  Login:
                  <input
                    type="text"
                    onChange={(e) => setLogin(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label>
                  Senha:
                  <input
                    type="password"
                    onChange={(e) => setSenha(e.target.value)}
                  />
                </label>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: '20px' }}>
                <button onClick={toggleForm} style={{ width: "45%", boxSizing: "border-box" }}>
                  {exibirFormRegistro ? "Tela De Login" : "Tela De Cadastro"}
                </button>
                <button onClick={autenticar} style={{ width: "45%", boxSizing: "border-box", color:'lightgreen', border:'lightgreen solid 3px' }}>
                  Entrar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div >
  </div>
  );
}

export default Login;