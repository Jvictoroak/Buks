import React from 'react'
import './index.css'
// import produtos from '../../../data/produtos.json'
import { useEffect, useState } from 'react';
import CardProduto from '../../cards/produto'
import {toUrlFriendly} from '../../../utils/utils'

function Produto() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/produtos')
      .then(response => response.json())
      .then(data => setProdutos(data))
      .catch(error => console.error('Erro ao buscar produtos:', error));
  }, []);

interface Produto {
  nome: string;
  preco: number;
  imagem: string;
}

console.log(produtos)
  return (
      <section className='produto'>
        <div className="conteudo-1140">
            <div className="conteudo">
                <div className="titulo t1"><p>Nossos Produtos</p></div>
                <div className="cards">
                    {produtos.slice(0,8).map((produto: Produto, index: number) => (
                        <CardProduto nome={produto.nome} preco={produto.preco} imagem={produto.imagem} link={toUrlFriendly(produto.nome)} />
                    ))}
                </div>
            </div>
        </div>
    </section>
  )
}

export default Produto