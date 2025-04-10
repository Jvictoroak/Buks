import React from 'react'
import Banner from '../banner'

export default function home() {
  return (
    <>
        <Banner/>
        <section className="sobre">
            <div className="conteudo-1140">
                <div className="conteudo">
                    <div className="imagens">
                        <div className="imagem-container"><img src="" alt="" className="imagem" /></div>
                    </div>
                    <div className="textos">
                        <h1 className='titulo t1'>Sobre nós</h1>
                        <p className='texto t1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.</p>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
