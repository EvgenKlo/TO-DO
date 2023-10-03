import { Box, Button, Modal, Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import { style } from '../../../styles/modalStyle';

const DeleteTaskModal: React.FC<{
  open: false | true;
  setOpen: React.Dispatch<React.SetStateAction<false | true>>;
  deleteTask: () => void;
}> = ({ open, setOpen, deleteTask }) => {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style, minWidth: 0, width: 350, display: 'flex' }}>
        <WarningIcon
          color="secondary"
          sx={{ textAlign: 'end', fontSize: '7rem' }}
        />
        <Box>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            display={'flex'}
            textAlign={'center'}
            marginBottom={3}
          >
            Are you sure you want to delete the task?
          </Typography>
          <Button
            variant="contained"
            color="info"
            sx={{ marginRight: 2 }}
            onClick={deleteTask}
          >
            Yes
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setOpen(false);
            }}
          >
            No
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteTaskModal;
