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
    nome_destinatario: '',
    complemento: '',
    telefone: '',
    cep: '',
    rua: '',
    numero: '',
    fk_usuario_id: usuarioId,
    livro_id: produto?.id || '',
    quantidade: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Busca endereço pelo CEP ao digitar 8 dígitos
    if (name === 'cep' && value.replace(/\D/g, '').length === 8) {
      fetch(`https://viacep.com.br/ws/${value.replace(/\D/g, '')}/json/`)
        .then(res => res.json())
        .then(data => {
          if (!data.erro) {
            setForm(f => ({
              ...f,
              rua: data.logradouro || '',
            }));
          }
        });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Gera a data atual no formato YYYY-MM-DD
    const dataAtual = new Date().toISOString().slice(0, 10);
    const pedido = { ...form, data: dataAtual };
    try {
      const response = await fetch('http://localhost:3001/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(pedido),
      });
      if (response.status === 401) {
        Swal.fire({
          title: 'Sessão expirada',
          text: 'Faça login novamente para continuar.',
          icon: 'warning',
          customClass: {
            popup: 'swal-custom-popup',
            title: 'swal-custom-title',
            confirmButton: 'swal-custom-confirm',
            icon: 'swal-custom-icon',
          },
        }).then(() => {
          localStorage.removeItem('token');
          window.location.href = '/login';
        });
        return;
      }
      if (response.ok) {
        Swal.fire('Sucesso', 'Pedido realizado com sucesso!', 'success');
        setForm({
          nome_destinatario: '',
          complemento: '',
          telefone: '',
          cep: '',
          rua: '',
          numero: '',
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

          <div className="titulo t1">
            <p>{produto?.nome || ''}</p>
            <p>R$ {produto?.preco || ''}</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <label className='texto t1'>Nome do Destinatário:</label>
              <input type="text" name="nome_destinatario" value={form.nome_destinatario} onChange={handleChange} required />            
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
              <label className='texto t1'>Rua:</label>
              <input type="text" name="rua" value={form.rua} onChange={handleChange} required />
            </div>
            <div>
              <label className='texto t1'>Número:</label>
              <input type="text" name="numero" value={form.numero} onChange={handleChange} required />
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