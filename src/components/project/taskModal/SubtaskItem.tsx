import { Box, Button, Checkbox, Divider, Typography } from '@mui/material';
import { Actions, Subtask, Task } from '../../../types/types';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';

const SubtaskItem: React.FC<{ subtask: Subtask; task: Task }> = ({ subtask, task }) => {
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: Actions.ChangeSubtaskStatus,
      payload: { task: task, subtaskId: subtask.id, subtaskStatus: event.target.checked },
    });
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Checkbox
          checked={subtask.complete}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        <Typography
          variant="body2"
          sx={{
            textDecoration: subtask.complete ? 'line-through' : 'none',
            color: subtask.complete ? 'gray' : 'black',
            fontSize: '1.2rem',
            margin: 1,
          }}
        >
          {subtask.description}
        </Typography>
        <Button
          sx={{ marginLeft: 'auto' }}
          onClick={() => {
            dispatch({
              type: Actions.DeleteSubtask,
              payload: { task: task, subtaskId: subtask.id },
            });
          }}
        >
          <DeleteIcon />
        </Button>
      </Box>
      <Divider />
    </>
  );
};

export default SubtaskItem;
