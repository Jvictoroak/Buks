import React from 'react'
import Banner from '../../sections/banner'
import CardProduto from '../../cards/produto'
import CardAutor from '../../cards/autor'
import './index.css'
// import produtos from '../../../data/produtos.json'
// import autores from '../../../data/autores.json'
import { toUrlFriendly } from '../../../utils/utils'
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function Home() {
    const [produtos, setProdutos] = useState<any[]>([]);
    const token = localStorage.getItem('token');
    useEffect(() => {
        fetch('http://localhost:3001/livros', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.status === 401) {
                    Swal.fire({
                        title: 'Sessão expirada',
                        text: 'Faça login novamente para continuar.',
                        icon: 'warning',
                        customClass: {
                            popup: 'swal-custom-popup',
                            title: 'swal-custom-title',
                            confirmButton: 'swal-custom-confirm',
                            icon: 'swal-custom-icon',
                        },
                    }).then(() => {
                        localStorage.removeItem('token');
                        window.location.href = '/login';
                    });
                    throw new Error('Sessão expirada');
                }
                return response.json();
            })
            .then(data => Array.isArray(data) ? setProdutos(data) : setProdutos([]))
            .catch(error => console.error('Erro ao buscar produtos:', error));
    }, []);

    interface Produto {
        id: number;
        nome: string;
        preco: number;
        imagem?: string;
    }
    return (
        <main className="home">
            <Banner />
            <section className="categoria">
                <div className="conteudo-1140">
                    <div className="conteudo">
                        <div className="cards">
                            <div className="card"><div className="sub-titulo t1"><p>Fantasia</p></div></div>
                            <div className="card"><div className="sub-titulo t1"><p>Romance</p></div></div>
                            <div className="card"><div className="sub-titulo t1"><p>Ficção</p></div></div>
                            <div className="card"><div className="sub-titulo t1"><p>Drama</p></div></div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='produto'>
                <div className="conteudo-1140">
                    <div className="conteudo">
                        <div className="titulo t1"><p>Nossos Produtos</p></div>
                        <div className="cards">
                            {produtos.slice(0, 8).map((produto: Produto, index: number) => (
                                <CardProduto
                                    nome={produto.nome}
                                    preco={produto.preco}
                                    imagem={`http://localhost:3001/livros/${produto.id}/imagem`}
                                    link={toUrlFriendly(produto.nome)}
                                />
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
                           
                                <CardAutor
                                    key={0}
                                    nome={`Agata Christie`}
                                    imagem={'../../../assets/img/Agatha.jpeg'}
                                    link={""}
                                />
                                <CardAutor
                                    key={1}
                                    nome={`J.K. Rowling`}
                                    imagem={'../../../assets/img/jk_roling.jpeg'}
                                    link={""}
                                />
                                <CardAutor
                                    key={2}
                                    nome={`Charles Darwin`}
                                    imagem={'../../../assets/img/darwin.jpeg'}
                                    link={""}
                                />
                                <CardAutor
                                    key={3}
                                    nome={`Syou Ishida`}
                                    imagem={'../../../assets/img/ishida.jpeg'}
                                    link={""}
                                />
                                <CardAutor
                                    key={4}
                                    nome={`David Goggins`}
                                    imagem={'../../../assets/img/goggins.webp'}
                                    link={""}
                                />
                                
        
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
