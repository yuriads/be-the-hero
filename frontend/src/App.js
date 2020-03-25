import React, { useState } from 'react';

import './global.css'

import Routes from './routes';

function App() {
  return (
   <Routes />
  );
}

export default App;

// // O estado sempre retorna pra gente um array com duas posições. A primeira é o valor da variável, a segunda é uma função de atualização desse valor.
//   // Array {valor, funcaoDeAtualizacao}
//   // Usando o estado
//   const [counter, setCounter] = useState(0);//toda vez que precisarmos mudar o valor de counter, temos que chamar a função setCounter
  
//   function increment() {
//     setCounter(counter +1);

//     console.log(counter);
//   }

//   return (
//     <div>
//     <Header>Contador: {counter}</Header>
//     <button onClick={increment}>Incrementar</button>
//     </div>
//   );