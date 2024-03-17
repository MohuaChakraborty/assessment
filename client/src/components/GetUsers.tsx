import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USERS, DELETE_USER } from "../graphql/queries";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteUserModal from "./DeleteUserModal";


interface GetUsersProps {
  onDeleteUser: (userId: string) => void;
}

const GetUsers: React.FC<GetUsersProps> = ({ onDeleteUser }) => {
  const { data, loading, error } = useQuery(GET_USERS);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");

  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  const handleDelete = (userId: string) => {
    deleteUser({ variables: { id: userId } })
      .then(() => {
        handleDeleteModalClose();
      })
      .catch((error) => {
        console.error("Error deleting user:", error.message);
        handleDeleteModalClose();
      });
  };

  const handleDeleteModalOpen = (userId: string) => {
    setSelectedUserId(userId);
    setOpenModal(true);
  };

  const handleDeleteModalClose = () => {
    setSelectedUserId("");
    setOpenModal(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <DeleteUserModal
        userId={selectedUserId}
        open={openModal}
        onClose={handleDeleteModalClose}
        onDelete={handleDelete} 
      />
      <TableContainer component={Paper}>
        <Table aria-label="Users table">
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>User name</TableCell>
              <TableCell>User email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <Typography>No users found</Typography>
                </TableCell>
              </TableRow>
            ) : (
              data.users.map(
                ({
                  _id,
                  username,
                  email,
                }: {
                  _id: string;
                  username: string;
                  email: string;
                }) => (
                  <TableRow key={_id}>
                    <TableCell>{_id}</TableCell>
                    <TableCell>{username}</TableCell>
                    <TableCell>{email}</TableCell>
                    <TableCell style={{width:'30px'}}>
                      <Button
                        onClick={() => handleDeleteModalOpen(_id)}
                        startIcon={<DeleteIcon />}
                      >
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default GetUsers;
