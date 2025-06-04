import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
import './index.css';

function PedidoFormulario() {
  const location = useLocation();
  const produto = location.state?.produto;
  // Pega o id do usuário logado do token JWT
  let usuarioId = '';
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const usuario = jwtDecode(token);
      // @ts-ignore
      usuarioId = usuario.id;
    } catch { }
  }
  const [form, setForm] = useState({
    complemento: '',
    telefone: '',
    cep: '',
    fk_usuario_id: usuarioId,
    livro_id: produto?.id || '',
    quantidade: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Gera a data atual no formato YYYY-MM-DD
    const dataAtual = new Date().toISOString().slice(0, 10);
    const pedido = { ...form, data: dataAtual };
    try {
      const response = await fetch('http://localhost:3001/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedido),
      });
      if (response.ok) {
        Swal.fire('Sucesso', 'Pedido realizado com sucesso!', 'success');
        setForm({
          complemento: '',
          telefone: '',
          cep: '',
          fk_usuario_id: usuarioId,
          livro_id: produto?.id || '',
          quantidade: 1,
        });
      } else {
        Swal.fire('Erro', 'Erro ao realizar pedido', 'error');
      }
    } catch (error) {
      Swal.fire('Erro', 'Erro ao conectar com o servidor', 'error');
    }
  };

  return (
    <div className="pedido-formulario">
      <div className="conteudo-1140">
        <div className="conteudo">
          <h2 className="titulo t1">Novo Pedido</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label className='texto t1'>Livro:</label>
              <input type="text" name="livro_nome" value={produto?.nome || ''} readOnly required />
            </div>
            <div>
              <label className='texto t1'>Preço:</label>
              <input type="text" name="livro_preco" value={produto?.preco || ''} readOnly required />
            </div>
            <div>
              <label className='texto t1'>Quantidade:</label>
              <input type="number" name="quantidade" value={form.quantidade} min={1} max={produto?.estoque || 1} onChange={handleChange} required />
            </div>
            <div>
              <label className='texto t1'>Telefone:</label>
              <input type="tel" name="telefone" value={form.telefone} onChange={handleChange} required />
            </div>
            <div>
              <label className='texto t1'>CEP:</label>
              <input type="text" name="cep" value={form.cep} onChange={handleChange} maxLength={9} required />
            </div>
            <div>
              <label className='texto t1'>Complemento:</label>
              <input type="text" name="complemento" value={form.complemento} onChange={handleChange} maxLength={100} />
            </div>
            <button className="texto t1" type="submit">Enviar Pedido</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PedidoFormulario;