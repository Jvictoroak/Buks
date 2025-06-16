import { useEffect, useState } from 'react';

export function useTypewriter(words: string[], wordDelay = 350, charDelay = 60) {
  const [displayed, setDisplayed] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (wordIndex >= words.length) return;
    if (charIndex < words[wordIndex].length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + words[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, charDelay);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + ' ');
        setWordIndex((prev) => prev + 1);
        setCharIndex(0);
      }, wordDelay);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, wordIndex, words, charDelay, wordDelay]);

  return displayed;
}
