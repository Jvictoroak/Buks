import React from 'react'
import './index.css'

function Cabecalho() {
  return (
    <header>
      <div className="conteudo-1140">
        <div className="conteudo">
          <div className="imagem-container logo">
            <img src="" />
          </div>
          <nav className="menu">
              <ul className='navegacao'>
                  <li><a href=""><p>Inicio</p></a></li>
                  <li><a href=""><p>Sobre</p></a></li>
                  <li><a href=""><p>Produtos</p></a></li>
                  <li><a href=""><p>Contato</p></a></li>
              </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Cabecalho