import React, { useState } from 'react'
import './index.css'
import logo from '../../../assets/img/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { showSwal } from '../../../utils/alertasSwal';

function Login() {

    const [email, serEmail] = useState('');
    const [senha, serSenha] = useState('');
    const navigate = useNavigate();

    const login = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });
            const data = await response.json();
            if (response.ok) {
                showSwal({
                    icon: 'success',
                    title: 'Bem-vindo!',
                    text: 'Login realizado com sucesso!'
                });
                setTimeout(() => navigate('/'), 100);
            } else {
                showSwal({
                    icon: 'error',
                    title: 'Erro',
                    text: data.error || 'Email ou senha inválidos'
                });
            }
        } catch (error) {
            showSwal({
                icon: 'error',
                title: 'Erro',
                text: 'Erro ao conectar com o servidor'
            });
        }
    }
        

    return (
        <div className="login">
            <div className='conteudo-1140'>
                <div className="container">
                    <div className="left-panel titulo h1">
                        <h1>Bem-vindo!</h1>
                        <p>Bom ter você aqui conosco,<br />por favor insira suas credenciais para acessar</p>
                        <a href='' className="imagem-container logo">
                            <img src={logo} className='imagem' />
                        </a>
                        <Link to="/cadastro" className='link-cadastro'><p>Ir para o Cadastro</p></Link>
                    </div>
                    <div className="right-panel titulo h1">
                        <h1>Login</h1>
                        <form onSubmit={login}>
                            <div className="form-group">
                                <h2 className="subtitulo">Email</h2>
                                <input id="email" type="email" className="form-control" onChange={(e) => serEmail(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <h2 className="subtitulo">Senha</h2>
                                <input id="senha" type="password" className="form-control" onChange={(e) => serSenha(e.target.value)} required />
                            </div>
                            <button type="submit" className="entrar-btn">ENTRAR</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login