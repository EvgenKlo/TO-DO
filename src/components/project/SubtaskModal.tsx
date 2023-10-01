import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Actions, Subtask, Task } from '../../types/types';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

const SubtaskModal: React.FC<{
  modalOpen: false | true;

  setModalOpen: React.Dispatch<React.SetStateAction<false | true>>;

  task: Task;
}> = ({ modalOpen, setModalOpen, task }) => {
  const handleClose = () => setModalOpen(false);

  const [newSubtask, setNewSubtask] = useState('');

  const dispatch = useDispatch();

  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Task name: {task.name}
        </Typography>
        <Box>
          <TextField
            variant="standard"
            value={newSubtask}
            onChange={(e) => {
              setNewSubtask(e.target.value);
            }}
          />
          <Button
            variant="contained"
            onClick={() => {
              dispatch({
                type: Actions.AddSubtask,
                payload: {
                  task: task,
                  subtask: {
                    description: newSubtask,
                    id: task.subtasks?.length ? task.subtasks.length + 1 : 1,
                    complete: false,
                  } as Subtask,
                },
              });
              setNewSubtask('');
            }}
          >
            Add subtask
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SubtaskModal;
