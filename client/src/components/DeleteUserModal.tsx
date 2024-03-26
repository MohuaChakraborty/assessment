import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  DialogContentText,
} from "@mui/material";


interface DeleteUserModalProps {
  userIds: string[];
  open: boolean;
  onClose: () => void;
  onDelete: (userIds: string[]) => void;
  showSnackbar: boolean;
  setShowSnackbar: (value: boolean) => void;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  userIds,
  open,
  onClose,
  onDelete,
  showSnackbar,
  setShowSnackbar,
}) => {
  const handleDelete = () => {
    onDelete(userIds);
    setShowSnackbar(true);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete User(s)</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete selected user(s)?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUserModal;
