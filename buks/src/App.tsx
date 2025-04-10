import React from 'react';
import './App.css';
import './assets/modules/css/boot.css';
import './assets/modules/css/reset.css';
import Cabecalho from './components/header';
import Rodape from './components/footer';
import Home from './components/home';
import Cadastro from './components/cadastro';

function App() {
  return (
    <>
      <Cabecalho/>
      <Home/>
      <Cadastro/>
      <Rodape/>
    </>
  );
}

export default App;
