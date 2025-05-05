import React from 'react'
import './index.css'

interface CardProdutoProps {
    imagem: string;
    nome: string;
    preco: number;
}

function produtoInterna({nome, preco, imagem} : CardProdutoProps) {
  return (
    <div className="produto-interna">
        <div className="imagem-container"><img src={imagem} alt="" className="imagem" /></div>
        <div className="sub-titulo t1 nome"><p>{nome}</p></div>
        <div className="titulo t1 preco"><p>R$ {preco}</p></div>
        <div className="botao"><p>VER MAIS</p></div>
    </div>
  )
}

export default produtoInterna