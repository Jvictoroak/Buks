import React from 'react'
import './index.css'
import produtos from '../../../data/produtos.json'
import CardProduto from '../../cards/produto'
import {toUrlFriendly} from '../../../utils/utils'

function index() {
  return (
    <section className='produto'>
        <div className="conteudo-1140">
            <div className="conteudo">
                <div className="titulo t1"><p>Nossos Produtos</p></div>
                <div className="cards">
                    {produtos.slice(0,8).map((produto, index) => (
                        <CardProduto nome={produto.nome} preco={produto.preco} imagem={produto.imagem} link={toUrlFriendly(produto.nome)} />
                    ))}
                </div>
            </div>
        </div>
    </section>
  )
}

export default index