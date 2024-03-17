import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
} from "@mui/material";

const DeleteUserModal = ({
  userId,
  open,
  onClose,
  onDelete,
  showSnackbar,
  setShowSnackbar,
}: {
  userId: string;
  open: boolean;
  onClose: () => void;
  onDelete: (userId: string) => void;
  showSnackbar: boolean;
  setShowSnackbar: (value: boolean) => void;
}) => {
  const handleDelete = () => {
    onDelete(userId);
    onClose();
    setShowSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this user?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
   </>
  );
};

export default DeleteUserModal;
