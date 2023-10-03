import { Badge, Box, Button, ListItem, Typography } from '@mui/material';
import { Actions, CommentItem, Task } from '../../../types/types';
import { useState } from 'react';
import CommentContent from './CommentContent';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import CommentIcon from '@mui/icons-material/Comment';

const TaskComment: React.FC<{ comment: CommentItem; task: Task; taskComments: CommentItem[] }> = ({
  comment,
  task,
  taskComments,
}) => {
  const comments = comment.comments && comment.comments;

  const [commentsOpen, setCommentsOpen] = useState(false);

  const dispatch = useDispatch();

  return (
    <ListItem
      sx={{
        flexDirection: 'column',
        background: '#8080803b',
        padding: 0.5,
        margin: 0.5,
        borderRadius: 1,
        width: 'calc(100% - 8px)',
      }}
    >
      <Typography sx={{ marginRight: 'auto' }}>{comment.text}</Typography>
      <Box>
        <Button onClick={() => setCommentsOpen(!commentsOpen)}>
          <Badge
            badgeContent={comments.length}
            color="primary"
          >
            <CommentIcon />
          </Badge>
        </Button>
        <Button
          onClick={() => {
            const indexComment = taskComments.indexOf(comment);
            taskComments.splice(indexComment, 1);

            dispatch({
              type: Actions.AddComment,
              payload: {
                task: task,
                comments: [...task.comments],
              },
            });
          }}
        >
          <DeleteIcon />
        </Button>
      </Box>

      {commentsOpen && (
        <CommentContent
          task={task}
          taskComments={comment.comments}
        />
      )}
    </ListItem>
  );
};

export default TaskComment;
