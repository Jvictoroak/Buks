import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import './index.css'
import { formatarData } from '../../../utils/utils';

export default function Meus_pedidos() {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [editando, setEditando] = useState<number|null>(null);
  const [editTelefone, setEditTelefone] = useState('');
  const [editNome, setEditNome] = useState('');

  // Pega o id do usuário logado do token JWT
  let usuarioId = '';
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const usuario = jwtDecode(token);
      // @ts-ignore
      usuarioId = usuario.id;
    } catch {}
  }

  useEffect(() => {
    if (!usuarioId) return;
    fetch(`http://localhost:3001/pedidos/${usuarioId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.status === 401) {
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
          throw new Error('Sessão expirada');
        }
        if (!res.ok) throw new Error('Erro ao buscar pedidos');
        return res.json();
      })
      .then(data => setPedidos(data))
      .catch((e) => setErro(e.message))
      .finally(() => setLoading(false));
  }, [usuarioId]);

  // Função para cancelar pedido
  const cancelarPedido = async (pedido_id: number) => {
    const confirm = await Swal.fire({
      title: 'Cancelar pedido?',
      text: 'Tem certeza que deseja cancelar este pedido?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, cancelar',
      cancelButtonText: 'Não',
      customClass: {
        popup: 'swal-custom-popup',
        title: 'swal-custom-title',
        confirmButton: 'swal-custom-confirm',
        icon: 'swal-custom-icon',
      },
    });
    if (!confirm.isConfirmed) return;
    try {
      const response = await fetch(`http://localhost:3001/pedidos/${pedido_id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
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
      if (!response.ok) throw new Error('Erro ao cancelar pedido');
      setPedidos(pedidos.filter(p => p.pedido_id !== pedido_id));
      Swal.fire({
        title: 'Cancelado!',
        text: 'Pedido cancelado com sucesso.',
        icon: 'success',
        customClass: {
          popup: 'swal-custom-popup',
          title: 'swal-custom-title',
          confirmButton: 'swal-custom-confirm',
          icon: 'swal-custom-icon',
        },
        timer: 1800,
        showConfirmButton: false
      });
    } catch (e) {
      Swal.fire({
        title: 'Erro',
        text: e instanceof Error ? e.message : 'Erro ao cancelar pedido',
        icon: 'error',
        customClass: {
          popup: 'swal-custom-popup',
          title: 'swal-custom-title',
          confirmButton: 'swal-custom-confirm',
          icon: 'swal-custom-icon',
        },
      });
    }
  }

  const abrirEdicao = (pedido: any) => {
    setEditando(pedido.pedido_id);
    setEditTelefone(pedido.telefone);
    setEditNome(pedido.nome_destinatario);
  };

  const cancelarEdicao = () => {
    setEditando(null);
    setEditTelefone('');
    setEditNome('');
  };

  const salvarEdicao = async (pedido_id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/pedidos/${pedido_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ telefone: editTelefone, nome_destinatario: editNome })
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
      if (!response.ok) throw new Error('Erro ao editar pedido');
      setPedidos(pedidos.map(p => p.pedido_id === pedido_id ? { ...p, telefone: editTelefone, nome_destinatario: editNome } : p));
      cancelarEdicao();
      Swal.fire({
        title: 'Editado!',
        text: 'Pedido atualizado com sucesso.',
        icon: 'success',
        customClass: {
          popup: 'swal-custom-popup',
          title: 'swal-custom-title',
          confirmButton: 'swal-custom-confirm',
          icon: 'swal-custom-icon',
        },
        timer: 1800,
        showConfirmButton: false
      });
    } catch (e) {
      Swal.fire({
        title: 'Erro',
        text: e instanceof Error ? e.message : 'Erro ao editar pedido',
        icon: 'error',
        customClass: {
          popup: 'swal-custom-popup',
          title: 'swal-custom-title',
          confirmButton: 'swal-custom-confirm',
          icon: 'swal-custom-icon',
        },
      });
    }
  }

  return (
    <main className='meus_pedidos'>
      <div className="conteudo-1140">
        <div className="conteudo">
          <h2>Meus Pedidos</h2>
          {loading && <p>Carregando...</p>}
          {erro && <p style={{color: 'red'}}>{erro}</p>}
          {!loading && pedidos.length === 0 && <p>Nenhum pedido encontrado.</p>}
          <ul>
            {pedidos.map((pedido, index) => (
              <li key={pedido.pedido_id || index} className='card'>
                <div className="info">
                  <div className="">Livro: {pedido.livro_nome}</div>
                  <div className="">Destinatário: {editando === pedido.pedido_id ? (
                    <input type="text" value={editNome} onChange={e => setEditNome(e.target.value)} />
                  ) : (
                    pedido.nome_destinatario
                  )}</div>
                  <div className="">Telefone: {editando === pedido.pedido_id ? (
                    <input type="tel" value={editTelefone} onChange={e => setEditTelefone(e.target.value)} />
                  ) : (
                    pedido.telefone
                  )}</div>
                  <div className="">Preço: R$ {pedido.livro_preco}</div>
                  <div className="">Quantidade: {pedido.quantidade}</div>
                  <div className="">Pedido: {formatarData(pedido.data)}</div>
                </div>
                <div className="acoes" style={{display: 'flex', gap: 12}}>
                  {editando === pedido.pedido_id ? (
                    <>
                      <button className="texto t1" style={{background: '#A27B5C', color: '#fff', border: 0, borderRadius: 4, padding: '4px 12px'}} onClick={() => salvarEdicao(pedido.pedido_id)}>Salvar</button>
                      <button className="texto t1" style={{background: '#ccc', color: '#222', border: 0, borderRadius: 4, padding: '4px 12px'}} onClick={cancelarEdicao}>Cancelar</button>
                    </>
                  ) : (
                    <button className="texto t1" style={{background: '#A27B5C', color: '#fff', border: 0, borderRadius: 4, padding: '4px 12px'}} onClick={() => abrirEdicao(pedido)}>Editar</button>
                  )}
                  <div className="delete" style={{cursor: 'pointer'}} onClick={() => cancelarPedido(pedido.pedido_id)}>
                    <i className="bi bi-trash" style={{marginRight: 6, color: '#A27B5C', fontSize: '1.1em', verticalAlign: 'middle'}}></i>
                    <span>Cancelar Pedido</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}