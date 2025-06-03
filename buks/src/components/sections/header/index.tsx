import React, { useState } from 'react';
import './index.css'
import logo from '../../../assets/img/logo.png'
import { Link, useNavigate } from 'react-router-dom'; 
import PerfilModal from '../../PerfilModal';

function Cabecalho() {
  const [modalAberto, setModalAberto] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    navigate('/login');
  };

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
                  <li className=''><div className='texto t1 pag' onClick={()=>setModalAberto(true)}><p>Meu Perfil</p></div></li>
              </ul>
          </nav>
          <button className="logout-btn btn btn-outline-danger position-absolute top-0 end-0 mt-3 me-4" onClick={handleLogout} title="Sair">
            <span className="d-flex align-items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
              </svg>
            </span>
          </button>
        </div>
      </div>
      <PerfilModal isOpen={modalAberto} onClose={()=>setModalAberto(false)} />
    </header>
  )
}

export default Cabecalho