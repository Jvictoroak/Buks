import React from 'react'
import './index.css'
import logo from '../../../assets/img/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { showSwal } from '../../../utils/alertasSwal';

function Cadastro() {
    const [form, setForm] = useState({ nome: '', dataNascimento: '', email: '', senha: '' });
    const [mensagem, setMensagem] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMensagem('');
        try {
            const response = await fetch('http://localhost:3001/usuarios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nome: form.nome,
                    email: form.email,
                    senha: form.senha,
                    dataNascimento: form.dataNascimento
                })
            });
            if (response.ok) {
                setMensagem('Usuário cadastrado com sucesso!');
                setForm({ nome: '', dataNascimento: '', email: '', senha: '' });
                showSwal({
                    icon: 'success',
                    title: 'Sucesso',
                    text: 'Usuário cadastrado com sucesso!'
                });
                setTimeout(() => navigate('/login'), 100);
            } else {
                const data = await response.json();
                setMensagem(data.error || 'Erro ao cadastrar usuário');
                showSwal({
                    icon: 'error',
                    title: 'Erro',
                    text: data.error || 'Erro ao cadastrar usuário'
                });
            }
        } catch (error) {
            setMensagem('Erro ao conectar com o servidor');
            showSwal({
                icon: 'error',
                title: 'Erro',
                text: 'Erro ao conectar com o servidor'
            });
        }
    };

    return (
        <div className="cadastro">
            <div className='conteudo-1140'>
                <div className="container">
                    <div className="left-panel titulo h1">
                        <h1>Bem-vindo!</h1>
                        <p>Bom ter você aqui conosco,<br />por favor cadastre suas informações pessoais</p>
                        <a href='' className="imagem-container logo">
                            <img src={logo} className='imagem' />
                        </a>
                        <Link to="/login" className='link-login'><p>Ir para o Login</p></Link>
                    </div>
                    <div className="right-panel titulo h1">
                        <h1>Cadastro</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <h2 className="subtitulo">Nome</h2>
                                <input id="nome" type="text" className="form-control" placeholder="" required value={form.nome} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <h2 className="subtitulo">Data de Nascimento</h2>
                                <input id="dataNascimento" type="date" className="form-control" placeholder="" required value={form.dataNascimento} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <h2 className="subtitulo">Email</h2>
                                <input id="email" type="email" className="form-control" placeholder="" required value={form.email} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <h2 className="subtitulo">Senha</h2>
                                <input id="senha" type="password" className="form-control" placeholder="" required value={form.senha} onChange={handleChange} />
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