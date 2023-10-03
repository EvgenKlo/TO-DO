import { Box, Button, FormControl, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Priority, Status, Task } from '../../../types/types';
import CommentContent from './CommentContent';
import { useState } from 'react';
import { msToTime } from '../../../helpers/time';

const TaskFields: React.FC<{
  task: Task;
  edit: boolean;
  taskUpdate: Task;
  setTaskUpdate: React.Dispatch<React.SetStateAction<Task>>;
  setSubtasksModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ task, edit, taskUpdate, setTaskUpdate, setSubtasksModal }) => {
  const comments = task.comments && task.comments;

  const [commentsOpen, setCommentsOpen] = useState(false);

  return (
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
        {`Time at work: ${
          task.expirationDate
            ? msToTime(task.expirationDate - task.dateCreate)
            : msToTime(Date.now() - task.dateCreate)
        }`}
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
              {Object.keys(Priority).map((priority) => {
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
              {Object.keys(Status).map((status) => {
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
      {!!task.expirationDate && (
        <Typography
          variant="h5"
          component="h2"
          sx={{ marginBottom: 1 }}
        >
          {`Expiration date: ${new Date(task.expirationDate).toLocaleString()}`}
        </Typography>
      )}
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
        <Box sx={{ overflow: 'auto', maxHeight: '50vh' }}>
          <CommentContent
            task={task}
            taskComments={task.comments}
          />
        </Box>
      )}
    </Box>
  );
};

export default TaskFields;
