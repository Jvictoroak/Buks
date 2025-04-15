import React from 'react'
import './index.css'

interface CardAutorProps {
    imagem: string;
    nome: string;
    link: string;
}

export default function cardAutor({nome, link, imagem}: CardAutorProps) {
  return (
    <a href={link} className='card-autor'>
        <div className="imagem-container"><img src={imagem} alt="" className="imagem" /></div>
        <div className="sub-titulo t1 nome"><p>{nome}</p></div>
    </a>
  )
}
