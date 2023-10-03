import { Box, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { Task } from '../../../types/types';

const TaskManage: React.FC<{
  task: Task;
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<false | true>>;
  setTaskUpdate: React.Dispatch<React.SetStateAction<Task>>;
  setDeleteModal: React.Dispatch<React.SetStateAction<false | true>>;
  setModalOpen: React.Dispatch<React.SetStateAction<false | true>>;
}> = ({ task, edit, setEdit, setTaskUpdate, setDeleteModal, setModalOpen }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        margin: '-32px -32px 10px -32px',
        background: '#ffe0007a',
        borderRadius: '20px 20px 0 0',
        height: 50,
      }}
    >
      <Typography
        id="modal-modal-title"
        variant="h5"
        component="h2"
        sx={{ marginRight: 'auto', padding: '10px' }}
      >
        Task number: {task.number}
      </Typography>
      {edit ? (
        <>
          <Button
            sx={{ minWidth: 45 }}
            type="submit"
          >
            <DoneIcon />
          </Button>
          <Button
            sx={{ minWidth: 45 }}
            onClick={() => {
              setEdit(false);
              setTaskUpdate(task);
            }}
          >
            <ClearIcon />
          </Button>
        </>
      ) : (
        <>
          <Button
            sx={{ minWidth: 45 }}
            onClick={(e) => {
              e.preventDefault();
              setEdit(true);
            }}
          >
            <EditIcon />
          </Button>
          <Button
            sx={{ minWidth: 45 }}
            onClick={(e) => {
              e.preventDefault();
              setDeleteModal(true);
            }}
          >
            <DeleteIcon />
          </Button>
          <Button
            sx={{ minWidth: 45 }}
            onClick={(e) => {
              e.preventDefault();
              setModalOpen(false);
            }}
          >
            <CloseIcon />
          </Button>
        </>
      )}
    </Box>
  );
};

export default TaskManage;
