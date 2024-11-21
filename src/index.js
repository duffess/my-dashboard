import React from 'react';  // Importa o React para o uso de JSX
import ReactDOM from 'react-dom/client';  // Importa o ReactDOM para renderizar a aplicação no DOM
import App from './App';  // Importa o componente App
import reportWebVitals from './reportWebVitals';  // Importa a função reportWebVitals para métricas de desempenho

const root = ReactDOM.createRoot(document.getElementById('root'));  // Cria o "root" para renderizar a aplicação dentro do elemento com id 'root'
root.render(
  <React.StrictMode>  {/* Envolve a aplicação em StrictMode para verificar práticas e erros em desenvolvimento */}
    <App />  {/* Renderiza o componente principal da aplicação */}
  </React.StrictMode>
);

reportWebVitals();  // Chamado para medir o desempenho da aplicação (geralmente não é necessário em todas as aplicações)
