import React from 'react'
import './index.css'
// import produtos from '../../../data/produtos.json'
import { useEffect, useState } from 'react';
import CardProduto from '../../cards/produto'
import {toUrlFriendly} from '../../../utils/utils'
import Swal from 'sweetalert2';

function Produto() {
  const [produtos, setProdutos] = useState([]);

  const token = localStorage.getItem('token');
  useEffect(() => {
    fetch('http://localhost:3001/livros', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
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
          throw new Error('Sessão expirada');
        }
        return response.json();
      })
      .then(data => setProdutos(data))
      .catch(error => console.error('Erro ao buscar produtos:', error));
  }, []);

interface Produto {
  id: number;
  nome: string;
  preco: number;
  imagem?: string;
}

  return (
      <section className='produto'>
        <div className="conteudo-1140">
            <div className="conteudo">
                <div className="titulo t1"><p>Nossos Produtos</p></div>
                <div className="cards">
                    {produtos.map((produto: Produto, index: number) => (
                        <CardProduto
                            nome={produto.nome}
                            preco={produto.preco}
                            imagem={`http://localhost:3001/livros/${produto.id}/imagem`}
                            link={toUrlFriendly(produto.nome)}
                        />
                    ))}
                </div>
            </div>
        </div>
    </section>
  )
}

export default Produto