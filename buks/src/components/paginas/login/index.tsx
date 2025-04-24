import React from 'react'
import './index.css'
import logo from '../../../assets/img/logo.png'
import { Link } from 'react-router-dom';

function Login() {
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
                        <Link to="/Cadastro" className='link-cadastro'><p>Ir para o Cadastro</p></Link>
                    </div>
                    <div className="right-panel titulo h1">
                        <h1>Login</h1>
                        <form>
                            <div className="form-group">
                                <h2 className="subtitulo">Nome</h2>
                                <input id="nome" type="text" className="form-control" placeholder="" required />
                            </div>
                            <div className="form-group">
                                <h2 className="subtitulo">Senha</h2>
                                <input id="senha" type="password" className="form-control" placeholder="" required />
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