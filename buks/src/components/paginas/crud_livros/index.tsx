import React, { useEffect, useState } from 'react'
import './index.css'
import logo from '../../../assets/img/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { showSwal } from '../../../utils/alertasSwal';

function Crud_Livros() {
    const [livros, setLivros] = useState<any[]>([]);
    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [livroEditado, setLivroEditado] = useState<any>({});
    const [adicionando, setAdicionando] = useState(false);
    const [novoLivro, setNovoLivro] = useState<any>({ nome: '', descricao: '', preco: '', imagem: null, imagemFile: null, estoque: '' });
    const [imagemPopup, setImagemPopup] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:3001/livros')
            .then(response => response.json())
            .then(data => setLivros(data))
            .catch(error => console.error('Erro ao buscar livros:', error));
    }, []);

    const handleEditar = (livro: any) => {
        setEditandoId(livro.id);
        setLivroEditado({ ...livro });
    };

    const handleCancelar = () => {
        setEditandoId(null);
        setLivroEditado({});
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setLivroEditado((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setLivroEditado((prev: any) => ({
                ...prev,
                imagem: URL.createObjectURL(file),
                imagemFile: file // opcional, caso queira enviar depois
            }));
        }
    };

    const handleSalvar = async (id: number) => {
        // Aqui você pode fazer o fetch para atualizar o livro na API
        // Exemplo:
        try {
            const response = await fetch(`http://localhost:3001/livros/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(livroEditado)
            });
            if (response.ok) {
                setLivros(livros.map(l => l.id === id ? { ...livroEditado, id } : l));
                setEditandoId(null);
                setLivroEditado({});
                showSwal({ icon: 'success', title: 'Sucesso', text: 'Livro atualizado!' });
            } else {
                showSwal({ icon: 'error', title: 'Erro', text: 'Erro ao atualizar livro.' });
            }
        } catch {
            showSwal({ icon: 'error', title: 'Erro', text: 'Erro ao conectar com o servidor.' });
        }
    };

    const handleExcluir = async (id: number) => {
        if (!window.confirm('Tem certeza que deseja excluir este livro?')) return;
        try {
            const response = await fetch(`http://localhost:3001/livros/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setLivros(livros.filter(l => l.id !== id));
                showSwal({ icon: 'success', title: 'Sucesso', text: 'Livro excluído!' });
            } else {
                showSwal({ icon: 'error', title: 'Erro', text: 'Erro ao excluir livro.' });
            }
        } catch {
            showSwal({ icon: 'error', title: 'Erro', text: 'Erro ao conectar com o servidor.' });
        }
    };

    const handleAdicionar = () => {
        setAdicionando(true);
        setNovoLivro({ nome: '', descricao: '', preco: '', imagem: null, imagemFile: null, estoque: '' });
    };

    const handleNovoLivroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNovoLivro((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleNovoLivroFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setNovoLivro((prev: any) => ({
                ...prev,
                imagem: URL.createObjectURL(file),
                imagemFile: file
            }));
        }
    };

    const handleSalvarNovoLivro = async () => {
        try {
            let imagemBase64 = null;
            if (novoLivro.imagemFile) {
                const file = novoLivro.imagemFile;
                const reader = new FileReader();
                reader.onloadend = async () => {
                    imagemBase64 = (reader.result as string).split(',')[1];
                    await salvarLivroComImagem(imagemBase64);
                };
                reader.readAsDataURL(file);
            } else {
                // Não envia imagem, backend salva como NULL
                await salvarLivroComImagem(null);
            }
        } catch {
            showSwal({ icon: 'error', title: 'Erro', text: 'Erro ao adicionar livro.' });
        }
    };

    const salvarLivroComImagem = async (imagemBase64: string | null) => {
        const body = {
            nome: novoLivro.nome,
            descricao: novoLivro.descricao,
            preco: novoLivro.preco,
            estoque: novoLivro.estoque,
            imagem: imagemBase64
        };
        const response = await fetch('http://localhost:3001/livros', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        if (response.ok) {
            const data = await response.json();
            setLivros([...livros, { ...body, id: data.id }]);
            setAdicionando(false);
            setNovoLivro({ nome: '', descricao: '', preco: '', imagem: null, imagemFile: null, estoque: '' });
            showSwal({ icon: 'success', title: 'Sucesso', text: 'Livro adicionado!' });
        } else {
            showSwal({ icon: 'error', title: 'Erro', text: 'Erro ao adicionar livro.' });
        }
    };

    const handleCancelarNovoLivro = () => {
        setAdicionando(false);
        setNovoLivro({ nome: '', descricao: '', preco: '', imagem: null, imagemFile: null, estoque: '' });
    };

    return (
        <div className="crud_livros">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h2 className="titulo t1">Gerenciar Livros</h2>
                <button className="btn btn-primary" onClick={handleAdicionar} disabled={adicionando} style={{ marginLeft: 16 }}>Adicionar Livro</button>
            </div>
            <table className="tabela-livros">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Imagem</th>
                        <th>Estoque</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {livros.map((livro) => (
                        <tr key={livro.id}>
                            <td>{livro.id}</td>
                            <td>
                                {editandoId === livro.id ? (
                                    <input name="nome" value={livroEditado.nome} onChange={handleChange} />
                                ) : (
                                    livro.nome
                                )}
                            </td>
                            <td>
                                {editandoId === livro.id ? (
                                    <textarea name="descricao" value={livroEditado.descricao} onChange={handleChange} />
                                ) : (
                                    livro.descricao
                                )}
                            </td>
                            <td>
                                {editandoId === livro.id ? (
                                    <input name="preco" type="number" value={livroEditado.preco} onChange={handleChange} />
                                ) : (
                                    `R$ ${Number(livro.preco).toFixed(2)}`
                                )}
                            </td>
                            <td>
                                {editandoId === livro.id ? (
                                    <input name="imagem" type="file" accept="image/*" onChange={handleFileChange} />
                                ) : (
                                    livro.imagem || livro.imagem === null ? (
                                        <img
                                            src={`http://localhost:3001/livros/${livro.id}/imagem`}
                                            alt={livro.nome}
                                            className="imagem-livro"
                                            onClick={() => setImagemPopup(`http://localhost:3001/livros/${livro.id}/imagem`)}
                                            onError={e => (e.currentTarget.src = require('../../../assets/img/livro_default.png'))}
                                        />
                                    ) : (
                                        <img
                                            src={require('../../../assets/img/livro_default.png')}
                                            alt="Livro padrão"
                                            className="imagem-livro"
                                        />
                                    )
                                )}
                            </td>
                            <td>
                                {editandoId === livro.id ? (
                                    <input name="estoque" type="number" value={livroEditado.estoque} onChange={handleChange} />
                                ) : (
                                    livro.estoque
                                )}
                            </td>
                            <td>
                                {editandoId === livro.id ? (
                                    <>
                                        <i className="bi bi-check2-square icone-acao icone-salvar" title="Salvar" onClick={() => handleSalvar(livro.id)}></i>
                                        <i className="bi bi-x-square icone-acao icone-cancelar" title="Cancelar" onClick={handleCancelar}></i>
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-pencil-square icone-acao icone-editar" title="Editar" onClick={() => handleEditar(livro)}></i>
                                        <i className="bi bi-trash icone-acao icone-excluir" title="Excluir" onClick={() => handleExcluir(livro.id)}></i>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                    {adicionando && (
                        <tr>
                            <td>-</td>
                            <td><input name="nome" value={novoLivro.nome} onChange={handleNovoLivroChange} /></td>
                            <td><textarea name="descricao" value={novoLivro.descricao} onChange={handleNovoLivroChange} /></td>
                            <td><input name="preco" type="number" value={novoLivro.preco} onChange={handleNovoLivroChange} /></td>
                            <td><input name="imagem" type="file" accept="image/*" onChange={handleNovoLivroFileChange} /></td>
                            <td><input name="estoque" type="number" value={novoLivro.estoque} onChange={handleNovoLivroChange} /></td>
                            <td>
                                <i className="bi bi-check2-square icone-acao icone-salvar" title="Salvar" onClick={handleSalvarNovoLivro}></i>
                                <i className="bi bi-x-square icone-acao icone-cancelar" title="Cancelar" onClick={handleCancelarNovoLivro}></i>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {imagemPopup && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(0,0,0,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999
                }} onClick={() => setImagemPopup(null)}>
                    <img src={imagemPopup} alt="Livro" style={{ maxWidth: '80vw', maxHeight: '80vh', borderRadius: 12, boxShadow: '0 4px 32px #0008' }} />
                </div>
            )}
        </div>
    )
}

export default Crud_Livros