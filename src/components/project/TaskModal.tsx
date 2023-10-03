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
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { msToTime } from '../../helpers/time';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import DeleteTaskModal from './DeleteTaskModal';
import SubtaskModal from './SubtaskModal';
import CommentContent from './CommentContent';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 320,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
  boxSizing: 'border-box',
};

const TaskModal: React.FC<{
  modalOpen: false | true;

  setModalOpen: React.Dispatch<React.SetStateAction<false | true>>;

  task: Task;
}> = ({ modalOpen, setModalOpen, task }) => {
  const handleClose = () => {
    setEdit(false);
    setModalOpen(false);
  };

  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();

  const [taskUpdate, setTaskUpdate] = useState(task);

  const [deleteModal, setDeleteModal] = useState(false);

  const [subtasksModal, setSubtasksModal] = useState(false);

  const [commentsOpen, setCommentsOpen] = useState(false);

  const comments = task.comments && task.comments;

  const deleteTask = () => {
    dispatch({
      type: Actions.DeleteTask,
      payload: { projectId: task.projectId, taskNumber: task.number },
    });
    setEdit(false);
  };

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
          setEdit(false);
        }}
      >
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
        <Box sx={{ maxHeight: '80vh', overflow: 'auto' }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{ marginBottom: 1, display: 'flex', overflow: 'hidden' }}
          >
            Name:{' '}
            {edit ? (
              <TextField
                fullWidth
                multiline
                variant="standard"
                type="input"
                value={taskUpdate.name}
                onChange={(e) => {
                  setTaskUpdate({ ...taskUpdate, name: e.target.value });
                }}
                sx={{ marginLeft: 1 }}
              />
            ) : (
              task.name
            )}
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            sx={{ marginBottom: 1, display: 'flex', overflow: 'hidden' }}
          >
            Description:{' '}
            {edit ? (
              <TextField
                fullWidth
                multiline
                rows={5}
                variant="standard"
                type="input"
                value={taskUpdate.description}
                onChange={(e) => {
                  setTaskUpdate({ ...taskUpdate, description: e.target.value });
                }}
                sx={{ marginLeft: 1 }}
              />
            ) : (
              task.description
            )}
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            sx={{ marginBottom: 1, display: 'flex', overflow: 'hidden' }}
          >
            {`Date of creation: ${new Date(task.dateCreate).toLocaleString()}`}
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            sx={{ marginBottom: 1 }}
          >
            {`Time at work: ${msToTime(Date.now() - task.dateCreate)}`}
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            sx={{ marginBottom: 1, display: 'flex', overflow: 'hidden' }}
          >
            Priority:{' '}
            {edit ? (
              <FormControl required>
                <Select
                  value={taskUpdate.priority}
                  onChange={(e) => {
                    setTaskUpdate({ ...taskUpdate, priority: e.target.value as Priority });
                  }}
                  sx={{ marginLeft: 1 }}
                  variant="standard"
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
            variant="h5"
            component="h2"
            sx={{ marginBottom: 1, display: 'flex', overflow: 'hidden' }}
          >
            Status:{' '}
            {edit ? (
              <FormControl required>
                <Select
                  value={taskUpdate.status}
                  onChange={(e) => {
                    setTaskUpdate({ ...taskUpdate, status: e.target.value as Status });
                  }}
                  sx={{ marginLeft: 1 }}
                  variant="standard"
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
          <Button
            variant="contained"
            sx={{ margin: 0.5 }}
            onClick={() => setSubtasksModal(true)}
          >
            Subtasks{' '}
            {task.subtasks
              ? task.subtasks?.length
                ? task.subtasks?.filter((item) => item.complete === false).length
                : 0
              : 0}{' '}
            / {task.subtasks ? task.subtasks?.length : 0}
          </Button>
          <Button
            variant="contained"
            sx={{ margin: 0.5 }}
            onClick={() => setCommentsOpen(!commentsOpen)}
          >
            Comments {comments ? (comments.length ? comments.length : 0) : 0}
          </Button>
          {commentsOpen && (
            <CommentContent
              task={task}
              taskComments={task.comments}
            />
          )}
          <DeleteTaskModal
            open={deleteModal}
            setOpen={setDeleteModal}
            deleteTask={deleteTask}
          />
          <SubtaskModal
            modalOpen={subtasksModal}
            setModalOpen={setSubtasksModal}
            task={task}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default TaskModal;
