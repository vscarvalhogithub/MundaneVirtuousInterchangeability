import React, { useState } from 'react';
import { auth } from './firebase';
import Login from './Login';
import DataEntry from './DataEntry';
import { signInWithEmailAndPassword } from 'firebase/auth';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (email, password) => {
    try {
      // Autenticar o usuário com Firebase
      await signInWithEmailAndPassword(auth, email, password);
      // Se o login for bem-sucedido, atualize o estado isLoggedIn
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Erro ao efetuar login:', error.message);
      // Aqui você pode lidar com erros de login, por exemplo, mostrar uma mensagem de erro para o usuário
    }
  };

  const handleSignUp = () => {
    // Atualize o estado isLoggedIn
    setIsLoggedIn(true);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} onSignUp={handleSignUp} />
      ) : (
        <DataEntry />
      )}
    </div>
  );
}

export default App;
