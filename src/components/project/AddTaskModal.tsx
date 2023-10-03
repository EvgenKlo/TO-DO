import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import { Actions, Priority, Status, Task } from '../../types/types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { style } from '../../styles/modalStyle';

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
          status: Status.Queue,
          number: taskId,
          priority: Priority.low,
          projectId: projectId,
          subtasks: [],
          comments: [],
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
