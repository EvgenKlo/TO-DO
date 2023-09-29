import { Grid } from '@mui/material';
import TaskItem from './TaskItem';
import { useDrop } from 'react-dnd';
import { Actions, Project, Task } from '../../types/types';
import { useDispatch } from 'react-redux';

const ProjectColumn: React.FC<{ project: Project; columnName: string }> = ({
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
          task: { ...item, status: columnName.toLocaleLowerCase() },
        },
      });
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <Grid
      item
      sx={{
        width: '32%',
        textAlign: 'center',
        border: '1px solid black',
        borderRadius: 2,
      }}
      ref={drop}
      role={'Dustbin'}
      style={{ backgroundColor: isOver ? 'red' : 'white' }}
    >
      {columnName}
      {project.tasks
        ?.filter((item) => item.status === columnName.toLocaleLowerCase())
        .map((item) => (
          <TaskItem
            item={item}
            key={`${project.id}.${item.number}`}
          />
        ))}
    </Grid>
  );
};

export default ProjectColumn;
