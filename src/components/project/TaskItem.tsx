import { Priority, Task } from '../../types/types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useDrag } from 'react-dnd';
import { useState } from 'react';
import TaskModal from './TaskModal';

const TaskItem: React.FC<{ item: Task }> = ({ item }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: 'BOX',
    item: item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <>
      <Card
        sx={{
          margin: 1,
          backgroundColor:
            item.priority === Priority.low
              ? 'green'
              : item.priority === Priority.medium
              ? 'yellow'
              : 'red',
        }}
        ref={dragPreview}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <CardActionArea
          ref={drag}
          onClick={() => setModalOpen(true)}
        >
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
            >
              {item.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {item.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <TaskModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        task={item}
      />
    </>
  );
};

export default TaskItem;
