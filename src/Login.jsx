import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { auth, db } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';



function Login({ onLogin, onSignUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Chamar a função onLogin passada como prop
    onLogin(email, password);
  };

  const handleSignUp = async (event) => {
  event.preventDefault();

  try {
    // Cadastrar o usuário com Firebase
    const newUser = await createUserWithEmailAndPassword(auth, email, password);
    // Adicionar informações do usuário ao banco de dados Firestore
    await db.collection('users').doc(newUser.user.uid).set({
      email: email,
    });
    // Chamar a função onSignUp passada como prop
    onSignUp();
  } catch (error) {
    console.error('Erro ao criar conta:', error.message);
    // Aqui você pode lidar com erros de cadastro, por exemplo, mostrar uma mensagem de erro para o usuário
  }
};


  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" align="center">
          Sistema de cadastro
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            required
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            required
            label="Senha"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Button fullWidth type="submit" variant="contained" color="primary">
            Entrar
          </Button>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Button fullWidth variant="outlined" color="primary" onClick={handleSignUp}>
            Cadastrar
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default Login;
