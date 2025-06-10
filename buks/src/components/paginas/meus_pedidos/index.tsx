import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import './index.css'
import { formatarData } from '../../../utils/utils';

export default function Meus_pedidos() {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

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
    fetch(`http://localhost:3001/pedidos/${usuarioId}`)
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar pedidos');
        return res.json();
      })
      .then(data => setPedidos(data))
      .catch(() => setErro('Erro ao buscar pedidos'))
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
      });
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
    } catch {
      Swal.fire({
        title: 'Erro',
        text: 'Erro ao cancelar pedido',
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
                  <div className="">
                    Livro: {pedido.livro_nome}
                  </div>
                  <div className="">
                    Destinatário: {pedido.nome_destinatario} <br/>
                  </div>
                  <div className="">
                    Telefone: {pedido.telefone} <br/>
                  </div>
                  <div className="">
                    Preço: R$ {pedido.livro_preco} <br/>
                  </div>
                  <div className="">
                    Quantidade: {pedido.quantidade} <br/>
                  </div>
                  <div className="">
                    Pedido: {formatarData(pedido.data)}
                  </div>
                </div>
                <div className="acoes">
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