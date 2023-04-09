import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import api from './api';

function DataEntry() {
  const [value, setValue] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/users/2');
        console.log(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Salve os dados no Firestore
      await addDoc(collection(db, 'data'), { value, cpf, phone });
      setValue('');
      setCpf('');
      setPhone('');
      setMessage('Dados salvos com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar dados:', error.message);
      setMessage('Ocorreu um erro ao salvar os dados. Por favor, tente novamente.');
    }
  };

  return (
    <div>
      <h2>Salvar dados</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Insira seu nome aqui"
            required
          />
        </label>
        <label>
          CPF:
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="Insira seu CPF"
            required
          />
        </label>
        <label>
          Telefone:
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Insira seu telefone"
            required
          />
        </label>
        <button type="submit">Salvar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default DataEntry;
