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
  Snackbar,
  Alert,
  Checkbox,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ChevronRight } from "@mui/icons-material";
import DeleteUserModal from "./DeleteUserModal";
import { useNavigate } from "react-router-dom";

interface GetUsersProps {
  onDeleteUser: (userId: string) => void;
}

const GetUsers: React.FC<GetUsersProps> = ({ onDeleteUser }) => {
  const { data, loading, error } = useQuery(GET_USERS);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [showDeleteSnackbar, setShowDeleteSnackbar] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const navigate = useNavigate();

  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_USERS }],
    onCompleted: () => {
      setShowDeleteSnackbar(true);
      setSelectedUserIds([]);
    },
    onError: (error) => console.error("Error deleting user:", error.message),
  });

  const handleDelete = () => {
    selectedUserIds.forEach((userId) => {
      deleteUser({ variables: { id: userId } });
    });
  };

  const handleDeleteModalOpen = () => {
    setOpenModal(true);
  };

  const handleDeleteModalClose = () => {
    setOpenModal(false);
  };

  const handleDeleteSnackbarClose = () => {
    setShowDeleteSnackbar(false);
  };

  const handleUserDetailsClick = (userId: string) => {
    navigate(`/user-details/${userId}`);
  };

  const handleCheckboxChange = (userId: string) => {
    if (selectedUserIds.includes(userId)) {
      setSelectedUserIds(selectedUserIds.filter((id) => id !== userId));
    } else {
      setSelectedUserIds([...selectedUserIds, userId]);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <DeleteUserModal
        userIds={selectedUserIds}
        open={openModal}
        onClose={handleDeleteModalClose}
        onDelete={handleDelete}
        showSnackbar={showSnackbar}
        setShowSnackbar={setShowSnackbar}
      />

      <Snackbar
        open={showDeleteSnackbar}
        autoHideDuration={6000}
        onClose={handleDeleteSnackbarClose}
      >
        <Alert
          onClose={handleDeleteSnackbarClose}
          severity={typeof error === "string" ? "error" : "success"}
        >
          {typeof error === "string" ? error : "User(s) deleted successfully!"}
        </Alert>
      </Snackbar>

      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
      </Box>
        <TableContainer className="container"
          component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "2rem" }}>Action</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>User name</TableCell>
                <TableCell>User email</TableCell>
                <TableCell style={{ width: "2rem" }}>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ flex: 1, overflowY: "auto" }}>
              {data.users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>
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
                      <TableCell>
                        <Checkbox
                          checked={selectedUserIds.includes(_id)}
                          onChange={() => handleCheckboxChange(_id)}
                        />
                      </TableCell>
                      <TableCell>{_id}</TableCell>
                      <TableCell>{username}</TableCell>
                      <TableCell>{email}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleUserDetailsClick(_id)}
                          startIcon={<ChevronRight />}
                        />
                      </TableCell>
                    </TableRow>
                  )
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {selectedUserIds.length > 0 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleDeleteModalOpen}
            style={{ position: "fixed", bottom: 10, right: 20 }}
          >
            Delete
          </Button>
        )}
    </>
  );
};

export default GetUsers;
