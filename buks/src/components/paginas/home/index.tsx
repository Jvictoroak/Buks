import React from 'react'
import Banner from '../../sections/banner'
import './index.css'

export default function home() {
  return (
    <main className="home">
        <Banner/>
        <section className="sobre">
            <div className="conteudo-1140">
                <div className="conteudo">
                    <div className="imagens">
                        <div className="imagem-container"><img src="" alt="" className="imagem" /></div>
                    </div>
                    <div className="textos">
                        <div className="titulo t1"><p>Sobre nós</p></div>
                        <div className="texto t1">
                           <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit voluptatem error facilis distinctio ratione esse ea id asperiores nam rem vel quisquam, commodi harum, a accusantium adipisci itaque veritatis consectetur?</p>
                           <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit voluptatem error facilis distinctio ratione esse ea id asperiores nam rem vel quisquam, commodi harum, a accusantium adipisci itaque veritatis consectetur?</p>
                           <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit voluptatem error facilis distinctio ratione esse ea id asperiores nam rem vel quisquam, commodi harum, a accusantium adipisci itaque veritatis consectetur?</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
  )
}
