import React from 'react'
import './index.css'
import { useParams } from 'react-router-dom';
import produtos from '../../../data/produtos.json'
import { toUrlFriendly } from '../../../utils/utils'
import { useEffect, useState } from 'react';

interface Produto {
  nome: string;
  preco: number;
  imagem: string;
  descricao: string;
  estoque: number;
}

function ProdutoInterna() {
//  const [produtos, setProdutos] = useState([]);
  const { produtoId } = useParams<{ produtoId: string }>();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produto, setProduto] = useState<Produto | undefined>(undefined);

  useEffect(() => {
    fetch('http://localhost:3001/produtos')
      .then(response => response.json())
      .then(data => setProdutos(data))
      .catch(error => console.error('Erro ao buscar produtos:', error));
  }, []);

  useEffect(() => {
    if (produtos.length && produtoId) {
      const encontrado = produtos.find((p) => toUrlFriendly(p.nome) === produtoId);
      setProduto(encontrado);
    }
  }, [produtos, produtoId]);

  if (!produto) {
    return <></>;
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
              {/* <div className="texto t2 descricao"><p>{produto.descricao}</p></div> */}
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