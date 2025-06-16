import React from 'react'
import './index.css'
import bannerImg from '../../../assets/img/banner.jpg'
import { useTypewriter } from './useTypewriter'

export default function Banner() {
  const words = [
    'Buks', ', acreditamos que cada leitura é uma jornada,',
    'e estamos aqui para embarcar com você na próxima!'
  ];
  const text = useTypewriter(words);

  return (
    <div className='banner'>
      <div className='banner-text'>
        {text.startsWith('Buks') ? (
          <>
            <span className='buks-highlight'>Buks</span>{text.slice(4)}
          </>
        ) : text}
      </div>
      <img src={bannerImg} alt="Banner de livros" className="banner-img" />
    </div>
  )
}


