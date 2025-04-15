import React from 'react'
import './index.css'

function Cadastro() {
    return (
        <div className="cadastro">
            <div className='conteudo-1140'>
                <div className="container">
                    <div className="left-panel titulo h1">
                        <h1>Bem-vindo!</h1>
                        <p>Para continuar conectado conosco<br />por favor entre com suas informações pessoais</p>
                        <button className="entrar-btn">ENTRAR</button>
                    </div>
                    <div className="right-panel titulo h1">
                        <h1>Criar Conta</h1>
                        <form>
                            <div className="form-group">
                                <h2 className="subtitulo">Nome</h2>
                                <input id="nome" type="text" className="form-control" placeholder="" required />
                            </div>
                            <div className="form-group">
                                <h2 className="subtitulo">Data de Nascimento</h2>
                                <input id="data" type="date" className="form-control" placeholder="" required />
                            </div>
                            <div className="form-group">
                                <h2 className="subtitulo">Email</h2>
                                <input id="email" type="email" className="form-control" placeholder="" required />
                            </div>
                            <div className="form-group">
                                <h2 className="subtitulo">Senha</h2>
                                <input id="senha" type="password" className="form-control" placeholder="" required />
                            </div>
                            <button type="submit" className="cadastrar-btn">CADASTRAR</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Cadastro