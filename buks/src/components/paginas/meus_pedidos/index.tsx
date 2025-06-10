import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
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
                    Quantidade: {pedido.quantidade} <br/>
                  </div>
                  <div className="">
                    Data: {formatarData(pedido.data)}
                  </div>
                </div>
                <div className="acoes">
                  <div className="delete">
                    <i className="bi bi-trash" style={{marginRight: 6, color: '#A27B5C', fontSize: '1.1em', verticalAlign: 'middle'}}></i>
                    <span>Cancelar Compra</span>
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