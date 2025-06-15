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

        // Validação do nome
        const nomeRegex = /^[A-Za-zÀ-ÿ\s]{3,20}$/;
        if (!nomeRegex.test(form.nome)) {
            showSwal({
                icon: 'warning',
                title: 'Nome inválido',
                text: 'O nome deve ter entre 3 e 20 letras e conter apenas letras e espaços.'
            });
            return;
        }

        // Validação da data de nascimento
        const hoje = new Date();
        const dataNasc = new Date(form.dataNascimento);
        if (!form.dataNascimento || dataNasc > hoje) {
            showSwal({
                icon: 'warning',
                title: 'Data de nascimento inválida',
                text: 'A data de nascimento não pode ser futura.'
            });
            return;
        }

        // Validação de senha forte
        const senhaForteRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
        if (!senhaForteRegex.test(form.senha)) {
            showSwal({
                icon: 'warning',
                title: 'Senha fraca',
                text: 'A senha deve ter pelo menos 8 caracteres, incluindo maiúscula, minúscula, número e caractere especial.'
            });
            return;
        }

        // Validação de email
        if (!form.email) {
            showSwal({
                icon: 'warning',
                title: 'E-mail obrigatório',
                text: 'O campo de e-mail não pode estar vazio.'
            });
            return;
        }
        if (!form.email.includes('@')) {
            showSwal({
                icon: 'warning',
                title: 'E-mail inválido',
                text: 'O e-mail deve conter o caractere @.'
            });
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            showSwal({
                icon: 'warning',
                title: 'E-mail inválido',
                text: 'Digite um e-mail válido no formato: exemplo@dominio.com.'
            });
            return;
        }

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
                                <input id="dataNascimento" type="date" className="form-control" placeholder="" required value={form.dataNascimento} onChange={handleChange} max={new Date().toISOString().split('T')[0]} />
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