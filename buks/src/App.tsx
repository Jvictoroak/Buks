import React from 'react';
import './App.css';
import './assets/modules/css/boot.css';
import './assets/modules/css/reset.css';
import Cabecalho from './components/header';
import Rodape from './components/footer';

function App() {
  return (
    <>
      <Cabecalho/>
      <Rodape/>
    </>
  );
}

export default App;
