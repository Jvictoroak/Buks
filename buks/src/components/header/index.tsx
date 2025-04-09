import React from 'react'
import './index.css'

function Cabecalho() {
  return (
    <header className='cabecalho'>
      <div className="conteudo-1140">
        <div className="conteudo">
          <div className="imagem-container logo">
            <img src="" />
          </div>
          <nav className="menu">
              <ul className='navegacao'>
                  <li className='pag'><a href="" className='texto t1'><p>Inicio</p></a></li>
                  <li className='pag'><a href="" className='texto t1'><p>Sobre</p></a></li>
                  <li className='pag'><a href="" className='texto t1'><p>Produtos</p></a></li>
                  <li className='pag'><a href="" className='texto t1'><p>Contato</p></a></li>
              </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Cabecalho