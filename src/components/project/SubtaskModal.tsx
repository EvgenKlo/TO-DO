import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Actions, Subtask, Task } from '../../types/types';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import emptyList from './../../assets/86a31126-7879-4283-9b92-f229b4748e84.png';
import SubtaskItem from './SubtaskItem';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 320,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
  boxSizing: 'border-box',
  textAlign: 'center',
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
          sx={{
            margin: '-32px -32px 10px -32px',
            background: '#3fbb306b',
            borderRadius: '20px 20px 0 0',
            padding: 1,
          }}
        >
          Task: {task.name}
        </Typography>
        <Box sx={{ display: 'flex', overflow: 'hidden', marginBottom: 1 }}>
          <TextField
            fullWidth
            variant="standard"
            value={newSubtask}
            placeholder="New subtask"
            onChange={(e) => {
              setNewSubtask(e.target.value);
            }}
          />
          <Button
            variant="contained"
            onClick={() => {
              newSubtask &&
                dispatch({
                  type: Actions.AddSubtask,
                  payload: {
                    task: task,
                    subtask: {
                      description: newSubtask,
                      id: task.subtasks?.length
                        ? task.subtasks[task.subtasks.length - 1].id + 1
                        : 1,
                      complete: false,
                    } as Subtask,
                  },
                });
              setNewSubtask('');
            }}
            sx={{ marginLeft: 1, whiteSpace: 'nowrap' }}
          >
            <AddCircleOutlineIcon sx={{ marginRight: 0.5 }} /> task
          </Button>
        </Box>
        {task.subtasks?.length ? (
          <Box sx={{ overflow: 'auto', maxHeight: '70vh' }}>
            {task.subtasks.map((subtask) => (
              <SubtaskItem
                subtask={subtask}
                task={task}
                key={subtask.id}
              />
            ))}
          </Box>
        ) : (
          <img
            src={emptyList}
            width={'70%'}
            alt="empty list"
            style={{ margin: 'auto' }}
          />
        )}
      </Box>
    </Modal>
  );
};

export default SubtaskModal;
