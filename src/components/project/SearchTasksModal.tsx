import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Task } from '../../types/types';
import TaskItem from './TaskItem';
import { Button, List, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { style } from '../../styles/modalStyle';

const SearchTasksModal: React.FC<{
  tasks: Task[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<false | true>>;
}> = ({ tasks, open, setOpen }) => {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
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
            Found items: {tasks.length}
          </Typography>
          <Button
            sx={{ minWidth: 45 }}
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon />
          </Button>
        </Box>
        <List>
          {tasks.map((item) => (
            <TaskItem
              item={item}
              key={item.number}
            />
          ))}
        </List>
      </Box>
    </Modal>
  );
};

export default SearchTasksModal;
