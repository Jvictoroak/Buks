import React from 'react';
import './index.css';

function Contato() {
  return (
    <main className='contato_adm'>
      <div className="conteudo-1140">
        <div className="conteudo">
          <h2>Contato do Administrador</h2>
          <ul>
            <li className='card'>
              <div className="info">
                <div><strong>Telefone:</strong> (11) 99999-8888</div>
                <div><strong>Email:</strong> suporte@livrariaficticia.com</div>
                <div><strong>SAC:</strong> 0800 123 4567</div>
              </div>
            </li>
          </ul>
          <p>Entre em contato para dúvidas, reclamações ou sugestões. Nosso time está disponível de segunda a sexta, das 9h às 18h.</p>
        </div>
      </div>
    </main>
  );
}

export default Contato;