import { Box, Button, List, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Actions, CommentItem, Task } from '../../types/types';
import TaskComment from './TaskComment';
import AddCommentIcon from '@mui/icons-material/AddComment';

const CommentContent: React.FC<{ task: Task; taskComments: CommentItem[] }> = ({
  task,
  taskComments,
}) => {
  const dispatch = useDispatch();

  const [newComment, setNewComment] = useState('');

  return (
    <Box sx={{ marginTop: 1 }}>
      <Box sx={{ display: 'flex', overflow: 'hidden' }}>
        <TextField
          fullWidth
          variant="standard"
          value={newComment}
          placeholder="New comment"
          onChange={(e) => {
            setNewComment(e.target.value);
          }}
        />
        <Button
          onClick={() => {
            if (newComment) {
              taskComments.push({
                text: newComment,
                comments: [],
                id: taskComments.length ? taskComments[taskComments.length - 1].id + 1 : 1,
              });
              dispatch({
                type: Actions.AddComment,
                payload: {
                  task: task,
                  comments: [...task.comments],
                },
              });
              setNewComment('');
            }
          }}
          sx={{ whiteSpace: 'nowrap' }}
        >
          <AddCommentIcon sx={{ fontSize: '2rem' }} />
        </Button>
      </Box>
      {taskComments.length ? (
        <List sx={{ overflow: 'auto', maxHeight: '50vh' }}>
          {taskComments.map((item) => (
            <TaskComment
              key={item.id}
              comment={item}
              task={task}
              taskComments={taskComments}
            />
          ))}
        </List>
      ) : (
        <Typography>no comments</Typography>
      )}
    </Box>
  );
};

export default CommentContent;
