import React, { useState, FormEvent } from 'react';
import { useMutation } from '@apollo/client';
import { TextField, Button, Snackbar, Grid } from '@mui/material';
import { Alert } from '@mui/material';
import { GET_USERS, ADD_USER } from '../graphql/queries';

const AddUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const [addUser, { loading }] = useMutation(ADD_USER, {
    onCompleted: () => setOpen(true),
    onError: (error) => setError(error.message)
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addUser({
      variables: { username, password, email },
      refetchQueries: [{ query: GET_USERS }]
    });
  };

  return (
    <Grid container spacing={2} style={{ marginBottom: '20px' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          User added successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ paddingY: '6px' }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ paddingY: '6px' }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ paddingY: '6px' }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" disabled={loading}>
                Add User
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default AddUser;
