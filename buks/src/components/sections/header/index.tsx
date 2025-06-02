import React, { useState } from 'react';
import './index.css'
import logo from '../../../assets/img/logo.png'
import { Link } from 'react-router-dom'; 
import PerfilModal from '../../PerfilModal';

function Cabecalho() {
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <header className='cabecalho'>
      <div className="conteudo-1140">
        <div className="conteudo">
          <a href='' className="imagem-container logo">
            <img src={logo} className='imagem'/>
          </a>
          <nav className="menu">
              <ul className='navegacao'>
                  <li className='ativo'><Link to='/' className='texto t1 pag'><p>Inicio</p></Link></li>
                  <li className=''><Link to="/produtos" className='texto t1 pag'><p>Produtos</p></Link></li>
                  <li className=''><Link to="/contato" className='texto t1 pag'><p>Contato</p></Link></li>
                  <li className=''><button className='texto t1 pag' style={{background:'none',border:'none',cursor:'pointer'}} onClick={()=>setModalAberto(true)}><p>Meu Perfil</p></button></li>
              </ul>
          </nav>
        </div>
      </div>
      <PerfilModal isOpen={modalAberto} onClose={()=>setModalAberto(false)} />
    </header>
  )
}

export default Cabecalho