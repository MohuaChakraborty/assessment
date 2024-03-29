import React, { useState, useEffect, FormEvent } from 'react';
import { useMutation } from '@apollo/client';
import { TextField, Button, Snackbar, Grid, CircularProgress } from '@mui/material';
import { Alert } from '@mui/material';
import { GET_USERS, ADD_USER } from '../graphql/queries';

const AddUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [loadingMutation, setLoadingMutation] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const [addUser, { loading }] = useMutation(ADD_USER, {
    onCompleted: () => {
      setOpen(true);
      setUsername('');
      setPassword('');
      setEmail('');
      setLoadingMutation(false);
    },
    onError: (error) => {
      setError(error.message);
      setOpen(true);
      setLoadingMutation(false);
    }
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingMutation(true);
    addUser({
      variables: { username, password, email },
      refetchQueries: [{ query: GET_USERS }]
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
      setError('');
    }, 4000);

    return () => clearTimeout(timer);
  }, [open]);

  return (
    <Grid container spacing={2}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={error ? "error" : "success"}>
          {error ? error : "User added successfully!"}
        </Alert>
      </Snackbar>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4.8}>
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item sm={1.2} xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type="submit" variant="contained" disabled={loading || loadingMutation}>
                {loadingMutation ? <CircularProgress size={24} /> : 'Add User'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default AddUser;
