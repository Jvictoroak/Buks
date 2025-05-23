import React from 'react'
import './index.css'
import { useParams } from 'react-router-dom';
import produtos from '../../../data/produtos.json'
import { toUrlFriendly } from '../../../utils/utils'


function ProdutoInterna() {
  const { produtoId } = useParams();

  const produto = produtos.find((p) => toUrlFriendly(p.nome) === produtoId);
  if (!produto) {
    return (<></>);
  }

  return (
    <section className="produtos-interna">
      <div className="conteudo-1140">
        <div className="conteudo">
            <div className="imagens">
              <div className="imagem-container">
                <div className="imagem-container"><img src={produto.imagem} alt="" className="imagem" /></div>            
              </div>
            </div>
            <div className="textos">
              <div className="sub-titulo t1 nome"><p>{produto.nome}</p></div>
              <div className="texto t1 descricao"><p>{produto.descricao}</p></div>
              <div className="texto t2 descricao"><p>{produto.descricao}</p></div>
              <div className="texto t1 estoque"><p>Estoque: {produto.estoque}</p></div>
              <div className="titulo t1 preco"><p>R$ {produto.preco}</p></div>
              <div className="botao comprar"><p>Comprar</p></div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default ProdutoInterna