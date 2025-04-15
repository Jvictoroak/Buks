import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import './assets/modules/css/boot.css';
import './assets/modules/css/reset.css';
import Cabecalho from './components/sections/header';
import Rodape from './components/sections/footer';
import Home from './components/paginas/home';
import Cadastro from './components/paginas/cadastro';

function AppContent() {
  const location = useLocation();
  return (
    <>
      {location.pathname != '/cadastre-se' && <Cabecalho />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastre-se" element={<Cadastro />} />
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