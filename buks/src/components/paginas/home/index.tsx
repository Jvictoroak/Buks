import React from 'react'
import Banner from '../../sections/banner'
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
                        <div className="card">
                            <div className="imagem-container"><img src="" alt="" className="imagem" /></div>
                            <div className="sub-titulo t1 nome"><p>Produto</p></div>
                            <div className="titulo t1 preco"><p>R$ 999,99</p></div>
                            <div className="botao"><p>VER MAIS</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
  )
}
