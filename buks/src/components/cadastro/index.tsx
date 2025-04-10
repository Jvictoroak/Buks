import React from 'react'
import './index.css'

function Cadastro() {
    return (
        <div>
            <div className='conteudo-1140'>
                <div className="container">
                    <div className="left-panel titulo h1">
                        <h1>Bem-vindo de Volta!</h1>
                        <p>Para continuar conectado conosco<br />por favor entre com suas informações pessoais</p>
                        <button className="sign-in-btn">ENTRAR</button>
                    </div>
                    <div className="right-panel">
                        <h1>Criar Conta</h1>
                        <div className="social-icons">
                            <div className="social-icon">f</div>
                            <div className="social-icon">G+</div>
                            <div className="social-icon">in</div>
                        </div>
                        <div className="divider">ou use seu email para cadastro:</div>
                        <form>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Nome" required />
                            </div>
                            <div className="form-group">
                                <input type="email" className="form-control" placeholder="Email" required />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Senha" required />
                            </div>
                            <button type="submit" className="sign-up-btn">CADASTRAR</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cadastro