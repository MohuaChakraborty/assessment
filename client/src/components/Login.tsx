import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface LoginPageProps {
  onLogin: () => void;
  onSignup: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); 

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    if (mode === 'login') {
      onLogin();
      navigate('/users');
    } else {
      onSignup();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom>{mode === 'login' ? 'Login' : 'Signup'}</Typography>
      <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">{mode === 'login' ? 'Login' : 'Signup'}</Button>
        {error && <Typography color="error">{error}</Typography>}
      </form>
      <Typography>
        {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
        <Button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} color="primary">
          {mode === 'login' ? 'Signup' : 'Login'}
        </Button>
      </Typography>
    </div>
  );
};

export default LoginPage;
