import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import './assets/modules/css/boot.css';
import './assets/modules/css/reset.css';
import Cabecalho from './components/sections/header';
import Rodape from './components/sections/footer';
import Home from './components/paginas/home';
import Cadastro from './components/paginas/cadastro';
import Login from './components/paginas/login';
import Produtos from './components/paginas/produto';
import Crud_Livros from './components/paginas/crud_livros';
import ProdutoInterna from './components/paginas/produto-interna';
import { jwtDecode } from "jwt-decode";
import PedidoFormulario from './components/paginas/pedido_formulario';
import Meus_pedidos from './components/paginas/meus_pedidos';

function AppContent() {
  const location = useLocation();
  useEffect(() => {
    let usuario = null
    const token = localStorage.getItem('token');
    if(token){
      usuario = jwtDecode(token);
    }
    if (!usuario && location.pathname !== '/login' && location.pathname !== '/cadastro') {
      window.location.replace('/login');
    }
  }, [location]);
  
  return (
    <>
      {((location.pathname !== '/cadastro') && (location.pathname !== '/login') && (location.pathname !== '/crud_livros')) && <Cabecalho />}
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/cadastro" element={<Cadastro/>}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/produtos" element={<Produtos/>} />
        <Route path="/crud_livros" element={<Crud_Livros/>} />
        <Route path="/produtos/:produtoId" element={<ProdutoInterna/>} />
        <Route path="/pedido" element={<PedidoFormulario/>} />
        <Route path="/pedido" element={<PedidoFormulario/>} />
        <Route path="/meus_pedidos" element={<Meus_pedidos/>} />
      </Routes>
      <Rodape />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;