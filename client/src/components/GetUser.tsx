import React, { useRef } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_USER } from '../graphql/queries';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Typography } from '@mui/material';

const GetUser = () => {
  const inputIdRef = useRef<HTMLInputElement | null>(null);
  const [getUser, { loading, error, data }] = useLazyQuery(GET_USER);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getUser({ variables: { id: inputIdRef.current?.value } });
  };

  return (
    
    <Grid container spacing={2}>

      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item xs={9}>
              <TextField
                inputRef={inputIdRef}
                variant="outlined"
                label="User ID"
                placeholder="User ID"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <Button type="submit" variant="contained" color="primary">Get User</Button>
            </Grid>
          </Grid>
        </form>
      </Grid>

      <Grid item xs={12} sx={{ marginLeft: 1 }}>
        {loading && <p>'Submitting...'</p>}
        {error && <p>{error.message.includes('Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer') ? 'Invalid user ID' : 'Submission error!'}</p>}
      </Grid>

      {data && data.user && (
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label="User details" style={{ minWidth: 300 }}>
              <TableHead>
                <TableRow>
                  <TableCell>User ID</TableCell>
                  <TableCell>User name</TableCell>
                  <TableCell>User email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{data.user._id}</TableCell>
                  <TableCell>{data.user.username}</TableCell>
                  <TableCell>{data.user.email}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
    </Grid>
  );
};

export default GetUser;
