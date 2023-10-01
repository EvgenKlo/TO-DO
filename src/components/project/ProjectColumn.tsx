import { Box, Grid } from '@mui/material';
import TaskItem from './TaskItem';
import { useDrop } from 'react-dnd';
import { Actions, Project, Status, Task } from '../../types/types';
import { useDispatch } from 'react-redux';
import emptyList from './../../assets/86a31126-7879-4283-9b92-f229b4748e84.png';

const ProjectColumn: React.FC<{ project: Project; columnName: Status }> = ({
  project,
  columnName,
}) => {
  const dispatch = useDispatch();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'BOX',
    drop: (item: Task) => {
      dispatch({
        type: Actions.ChangeStatus,
        payload: {
          projectId: project.id,
          taskNumber: item.number,
          taskStatus: columnName,
        },
      });
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const tasks = project.tasks?.filter((item) => item.status === columnName);

  return (
    <Grid
      item
      sx={{
        width: { xs: '100%', sm: '32%' },
        textAlign: 'center',
        borderRadius: 2,
      }}
      ref={drop}
      role={'Dustbin'}
      style={{ backgroundColor: isOver ? '#007b0421' : 'white', transition: '0.3s' }}
    >
      <Box
        sx={{
          fontSize: '1.5rem',
          backgroundColor: '#73562059',
          overflow: 'hidden',
          borderRadius: '8px 8px 0px 0px',
        }}
      >
        {columnName}
      </Box>

      {tasks?.length ? (
        tasks.map((item) => (
          <TaskItem
            item={item}
            key={`${project.id}.${item.number}`}
          />
        ))
      ) : (
        <img
          src={emptyList}
          width={'70%'}
          alt="empty list"
        ></img>
      )}
    </Grid>
  );
};

export default ProjectColumn;
