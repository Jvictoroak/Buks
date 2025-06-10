import React from 'react'
import Banner from '../../sections/banner'
import CardProduto from '../../cards/produto'
import CardAutor from '../../cards/autor' 
import './index.css'
// import produtos from '../../../data/produtos.json'
import autores from '../../../data/autores.json'
import {toUrlFriendly} from '../../../utils/utils'
import { useEffect, useState } from 'react';

export default function Home() {

    const [produtos, setProdutos] = useState([]);
    
    useEffect(() => {
    fetch('http://localhost:3001/livros')
        .then(response => response.json())
        .then(data => setProdutos(data))
        .catch(error => console.error('Erro ao buscar produtos:', error));
    }, []);
    
    interface Produto {
        nome: string;
        preco: number;
        imagem: string;
    }
    return (
    <main className="home">
        <Banner/>
        <section className="categoria">
            <div className="conteudo-1140">
                <div className="conteudo">
                    <div className="cards">
                        <div className="card"><div className="sub-titulo t1"><p>Categoria</p></div></div>
                        <div className="card"><div className="sub-titulo t1"><p>Categoria</p></div></div>
                        <div className="card"><div className="sub-titulo t1"><p>Categoria</p></div></div>
                        <div className="card"><div className="sub-titulo t1"><p>Categoria</p></div></div>
                    </div>
                </div>
            </div>
        </section>
        <section className='produto'>
            <div className="conteudo-1140">
                <div className="conteudo">
                    <div className="titulo t1"><p>Nossos Produtos</p></div>
                    <div className="cards">
                        {produtos.slice(0,8).map((produto: Produto, index: number) => (
                            <CardProduto nome={produto.nome} preco={produto.preco} imagem={produto.imagem} link={toUrlFriendly(produto.nome)} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
        <section className="autores">
            <div className="conteudo-1140">
                <div className="conteudo">
                    <div className="titulo t1"><p>Nossos Autores</p></div>
                    <div className="cards">
                        {autores.slice(0,5).map((autor, index) => (
                            <CardAutor nome={autor.nome} imagem={autor.imagem} link={toUrlFriendly(autor.nome)}/>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    </main>
  )
}
