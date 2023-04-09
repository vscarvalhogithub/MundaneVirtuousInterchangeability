import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

function Login({ onLogin, onSignUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Autenticar o usuário com Firebase
      await signInWithEmailAndPassword(auth, email, password);
      // Chamar a função onLogin passada como prop
      onLogin();
    } catch (error) {
      console.error('Erro ao efetuar login:', error.message);
      setError('Email ou senha inválidos. Por favor, tente novamente.');
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      // Cadastrar o usuário com Firebase
      const newUser = await createUserWithEmailAndPassword(auth, email, password);
      // Chamar a função onSignUp passada como prop
      onSignUp();
    } catch (error) {
      console.error('Erro ao criar conta:', error.message);
      setError('Erro ao criar conta. Por favor, tente novamente.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" align="center">
          Sistema de cadastro de dados
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
        {error && (
          <Box sx={{ mb: 2 }}>
            <Typography color="error">{error}</Typography>
          </Box>
        )}
      </form>
    </Container>
  );
}

export default Login;
