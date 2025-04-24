import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import './assets/modules/css/boot.css';
import './assets/modules/css/reset.css';
import Cabecalho from './components/sections/header';
import Rodape from './components/sections/footer';
import Home from './components/paginas/home';
import Cadastro from './components/paginas/cadastro';
import Login from './components/paginas/login';

function AppContent() {
  const location = useLocation();
  return (
    <>
      {location.pathname != '/cadastro' && <Cabecalho />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
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