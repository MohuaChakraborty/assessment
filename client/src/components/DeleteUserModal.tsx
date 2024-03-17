import {
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
  } from "@mui/material";
  import DeleteIcon from "@mui/icons-material/Delete"; 
  
  const DeleteUserModal = ({ userId, open, onClose, onDelete }: { userId: string, open: boolean, onClose:()=>void, onDelete:(userId: string)=>void}) => {
    const handleDelete = () => {
      onDelete(userId);
      onClose();
    };
  
    return (
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
    );
  };
  
  export default DeleteUserModal;
  