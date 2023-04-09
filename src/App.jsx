import React, { useState } from 'react';
import { auth } from './firebase';

import Login from './Login';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (email, password) => {
    try {
      // Autenticar o usuário com Firebase
      await auth.signInWithEmailAndPassword(email, password);
      // Se o login for bem-sucedido, atualize o estado isLoggedIn
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Erro ao efetuar login:', error.message);
      // Aqui você pode lidar com erros de login, por exemplo, mostrar uma mensagem de erro para o usuário
    }
  };

  return (
    <div>
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>Você está logado!</div>
      )}
    </div>
  );
}

export default App;
