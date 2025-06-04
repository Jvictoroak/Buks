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
import ProdutoInterna from './components/paginas/produto-interna';
import jwt_decode from "jwt-decode";

function AppContent() {
  const location = useLocation();
  useEffect(() => {
    // const usuario = localStorage.getItem('usuario');
    let usuario = null
    const token = localStorage.getItem('token');
    if(token){
      // usuario = jwt_decode(token);
    }
    console.log(usuario)
    if (!usuario && location.pathname !== '/login' && location.pathname !== '/cadastro') {
      window.location.replace('/login');
    }
  }, [location]);
  
  return (
    <>
      {((location.pathname != '/cadastro') && (location.pathname != '/login')) && <Cabecalho />}
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/cadastro" element={<Cadastro/>}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/produtos" element={<Produtos/>} />
        <Route path="/produtos/:produtoId" element={<ProdutoInterna/>} />
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