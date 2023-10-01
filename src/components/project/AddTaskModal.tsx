import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import { Actions, Priority, Status, Task } from '../../types/types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

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
};

const AddTaskModal: React.FC<{
  modalOpen: false | true;

  setModalOpen: React.Dispatch<React.SetStateAction<false | true>>;

  taskId: number;

  projectId: number;
}> = ({ modalOpen, setModalOpen, taskId, projectId }) => {
  const handleClose = () => setModalOpen(false);

  const dispatch = useDispatch();

  const [task, setTask] = useState({} as Task);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch({
      type: Actions.AddTask,
      payload: {
        project: projectId,
        task: {
          ...task,
          dateCreate: Date.now(),
          status: Status.queue,
          number: taskId,
          priority: Priority.low,
          projectId: projectId,
          subtasks: [],
        },
      },
    });

    handleClose();
  };

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
          variant="h5"
          component="h2"
          sx={{ marginBottom: 1 }}
        >
          Task number {taskId}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
        >
          <Stack spacing={2}>
            <TextField
              required
              placeholder="Enter the task name"
              label="Enter the task name"
              onChange={(event) => {
                setTask({ ...task, name: event.target.value });
              }}
            />
            <TextField
              required
              placeholder="What is the task about?"
              label="What is the task about?"
              onChange={(event) => {
                setTask({ ...task, description: event.target.value });
              }}
            />
            <Button
              type="submit"
              variant="contained"
            >
              Add task
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddTaskModal;
