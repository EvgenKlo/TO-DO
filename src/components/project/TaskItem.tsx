import { Task } from '../../types/types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import { useDrag } from 'react-dnd';

const TaskItem: React.FC<{ item: Task }> = ({ item }) => {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: 'BOX',
    item: item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <Card
      sx={{ margin: 1, backgroundColor: item.priority }}
      ref={dragPreview}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <CardActionArea ref={drag}>
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
  );
};

export default TaskItem;
