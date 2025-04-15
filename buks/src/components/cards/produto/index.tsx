
import React from 'react'
import './index.css'

interface CardProdutoProps {
    imagem: string;
    nome: string;
    preco: number;
    link: string;
}

export default function cardProduto({nome, preco, imagem, link}: CardProdutoProps) {
  return (
    <div className="card-produto">
        <div className="imagem-container"><img src={imagem} alt="" className="imagem" /></div>
        <div className="sub-titulo t1 nome"><p>{nome}</p></div>
        <div className="titulo t1 preco"><p>R$ {preco}</p></div>
        <a href={link} className="botao"><p>VER MAIS</p></a>
    </div>
  )
}
