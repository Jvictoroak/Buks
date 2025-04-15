import React from 'react'
import Banner from '../../sections/banner'
import CardProduto from '../../cards/produto'
import './index.css'

export default function home() {
  return (
    <main className="home">
        <Banner/>
        <section className="categoria">
            <div className="conteudo-1140">
                <div className="conteudo">
                    <div className="cards">
                        <div className="card"><div className="sub-titulo t1"><p>Categoria</p></div></div>
                        <div className="card"><div className="sub-titulo t1"><p>Categoria</p></div></div>
                        <div className="card"><div className="sub-titulo t1"><p>Categoria</p></div></div>
                        <div className="card"><div className="sub-titulo t1"><p>Categoria</p></div></div>
                    </div>
                </div>
            </div>
        </section>
        <section className='produto'>
            <div className="conteudo-1140">
                <div className="conteudo">
                    <div className="titulo t1"><p>Nossos Produtos</p></div>
                    <div className="cards">
                        <CardProduto nome='produto' preco={99.99} imagem='' link='' />
                        <CardProduto nome='produto' preco={99.99} imagem='' link='' />
                        <CardProduto nome='produto' preco={99.99} imagem='' link='' />
                        <CardProduto nome='produto' preco={99.99} imagem='' link='' />
                        <CardProduto nome='produto' preco={99.99} imagem='' link='' />
                        <CardProduto nome='produto' preco={99.99} imagem='' link='' />
                        <CardProduto nome='produto' preco={99.99} imagem='' link='' />
                        <CardProduto nome='produto' preco={99.99} imagem='' link='' />
                    </div>
                </div>
            </div>
        </section>
    </main>
  )
}
