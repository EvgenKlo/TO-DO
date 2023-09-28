import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Button, Grid } from '@mui/material';
import AddTaskModal from '../../components/project/AddTaskModal';
import { useState } from 'react';
import TaskItem from '../../components/project/TaskItem';

const Project = () => {
  const { id } = useParams();

  const state = useAppSelector((state) => state.projects);

  const project = id && state.find((item) => item.id === +id);

  const [modalOpen, setModalOpen] = useState(false);

  return !project ? (
    <div>Project not found</div>
  ) : (
    <>
      <Button
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Create task
      </Button>
      <Grid
        container
        width={'100%'}
      >
        <Grid
          item
          sx={{ borderRadius: 3, width: '33%', textAlign: 'center' }}
        >
          Queue
          {project.tasks?.map((item, index) => (
            <TaskItem
              item={item}
              key={index}
            ></TaskItem>
          ))}
        </Grid>
        <Grid
          item
          sx={{ borderRadius: 3, width: '33%', textAlign: 'center' }}
        >
          Development
        </Grid>
        <Grid
          item
          sx={{ borderRadius: 3, width: '33%', textAlign: 'center' }}
        >
          Done
        </Grid>
      </Grid>
      <div>{project.name}</div>
      <AddTaskModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        taskId={project.tasks ? project.tasks[project.tasks.length - 1].number + 1 : 1}
        projectId={project.id}
      />
    </>
  );
};

export default Project;
