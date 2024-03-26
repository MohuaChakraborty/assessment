import React from 'react';
import { Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../graphql/queries';
import SubHeader from './SubHeader';

interface UserDetailsPageProps {
  userId?: string;
}

const UserDetailsPage: React.FC<UserDetailsPageProps> = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: userId },
  });

  const handleBack = () => {
    navigate('/users');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { username, email, registrationDate, accountStatus, roles } = data.user;

  return (
    <Box sx={{ margin: '1rem' }}>
      <SubHeader title="User Details Page" showBackButton={true} />

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell variant="head">User ID</TableCell>
              <TableCell>{userId}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Username</TableCell>
              <TableCell>{username}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Email</TableCell>
              <TableCell>{email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Registration Date</TableCell>
              <TableCell>{registrationDate ? new Date(registrationDate).toLocaleDateString() : 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Account Status</TableCell>
              <TableCell>{accountStatus}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Roles</TableCell>
              <TableCell>{roles && roles.length > 0 ? roles.join(', ') : 'N/A'}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserDetailsPage;
