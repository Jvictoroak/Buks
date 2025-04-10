import React from 'react'
import './index.css'
import logo from '../../assets/img/logo.png'

function Cabecalho() {
  return (
    <header className='cabecalho'>
      <div className="conteudo-1140">
        <div className="conteudo">
          <a href='' className="imagem-container logo">
            <img src={logo} className='imagem'/>
          </a>
          <nav className="menu">
              <ul className='navegacao'>
                  <li className='pag  ativo'><a href="" className='texto t1'><p>Inicio</p></a></li>
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