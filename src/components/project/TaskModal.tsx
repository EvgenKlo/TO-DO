import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Actions, Priority, Status, Task } from '../../types/types';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { msToTime } from '../../helpers/time';

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

const TaskModal: React.FC<{
  modalOpen: false | true;

  setModalOpen: React.Dispatch<React.SetStateAction<false | true>>;

  task: Task;
}> = ({ modalOpen, setModalOpen, task }) => {
  const handleClose = () => setModalOpen(false);

  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();

  const [taskUpdate, setTaskUpdate] = useState(task);

  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={style}
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({
            type: Actions.EditTask,
            payload: { projectId: task.projectId, task: taskUpdate },
          });
          setModalOpen(false);
        }}
      >
        {edit ? (
          <Box
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              borderRadius: '100%',
            }}
          >
            <Button type="submit">
              <DoneIcon />
            </Button>
            <Button onClick={() => setEdit(false)}>
              <HighlightOffIcon />
            </Button>
          </Box>
        ) : (
          <Button
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              borderRadius: '100%',
              width: 50,
              height: 50,
            }}
            onClick={() => setEdit(true)}
          >
            <EditIcon />
          </Button>
        )}

        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h2"
          sx={{ marginBottom: 1 }}
        >
          Task number: {task.number}
        </Typography>
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h2"
          sx={{ marginBottom: 1 }}
        >
          Name:{' '}
          {edit ? (
            <TextField
              type="input"
              value={taskUpdate.name}
              onChange={(e) => {
                setTaskUpdate({ ...taskUpdate, name: e.target.value });
              }}
            ></TextField>
          ) : (
            task.name
          )}
        </Typography>
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h2"
          sx={{ marginBottom: 1 }}
        >
          Description:{' '}
          {edit ? (
            <TextField
              type="input"
              value={taskUpdate.description}
              onChange={(e) => {
                setTaskUpdate({ ...taskUpdate, description: e.target.value });
              }}
            ></TextField>
          ) : (
            task.description
          )}
        </Typography>
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h2"
          sx={{ marginBottom: 1 }}
        >
          {`Date of creation: ${new Date(task.dateCreate).toString()}`}
        </Typography>
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h2"
          sx={{ marginBottom: 1 }}
        >
          {`Time at work: ${msToTime(Date.now() - task.dateCreate)}`}
        </Typography>
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h2"
          sx={{ marginBottom: 1 }}
        >
          Priority:{' '}
          {edit ? (
            <FormControl required>
              <Select
                value={taskUpdate.priority}
                onChange={(e) => {
                  setTaskUpdate({ ...taskUpdate, priority: e.target.value as Priority });
                }}
              >
                {['low', 'medium', 'high'].map((priority) => {
                  return (
                    <MenuItem
                      key={priority}
                      value={priority}
                    >
                      {priority}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          ) : (
            task.priority
          )}
        </Typography>
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h2"
          sx={{ marginBottom: 1 }}
        >
          Status:{' '}
          {edit ? (
            <FormControl required>
              <Select
                value={taskUpdate.status}
                onChange={(e) => {
                  setTaskUpdate({ ...taskUpdate, status: e.target.value as Status });
                }}
              >
                {['Queue', 'Development', 'Done'].map((status) => {
                  return (
                    <MenuItem
                      key={status}
                      value={status}
                    >
                      {status}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          ) : (
            task.status
          )}
        </Typography>
      </Box>
    </Modal>
  );
};

export default TaskModal;
