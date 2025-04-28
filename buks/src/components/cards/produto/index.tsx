
import React from 'react'
import './index.css'
import { Link } from 'react-router-dom'
import { toUrlFriendly } from '../../../utils/utils'

interface CardProdutoProps {
    imagem: string;
    nome: string;
    preco: number;
    link: string;
}

export default function cardProduto({nome, preco, imagem, link}: CardProdutoProps) {
  return (
    <Link to={'/' + toUrlFriendly(nome)} className="card-produto">
        <div className="imagem-container"><img src={imagem} alt="" className="imagem" /></div>
        <div className="sub-titulo t1 nome"><p>{nome}</p></div>
        <div className="titulo t1 preco"><p>R$ {preco}</p></div>
        <div className="botao"><p>VER MAIS</p></div>
    </Link>
  )
}
