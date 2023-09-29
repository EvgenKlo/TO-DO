import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Button, Container, Grid, Typography } from '@mui/material';
import AddTaskModal from '../../components/project/AddTaskModal';
import { useState } from 'react';
import ProjectColumn from '../../components/project/ProjectColumn';

const columnNames = ['Queue', 'Development', 'Done'];

const Project = () => {
  const { id } = useParams();

  const state = useAppSelector((state) => state.projects);

  const project = id && state.find((item) => item.id === +id);

  const [modalOpen, setModalOpen] = useState(false);

  return !project ? (
    <div>Project not found</div>
  ) : (
    <Container>
      <Typography variant="h4">{project.name}</Typography>
      <Button
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Create task
      </Button>
      <Grid
        container
        gap={1}
      >
        {columnNames.map((item) => (
          <ProjectColumn
            project={project}
            columnName={item}
            key={item}
          />
        ))}
      </Grid>

      <AddTaskModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        taskId={project.tasks?.length ? project.tasks[project.tasks.length - 1].number + 1 : 1}
        projectId={project.id}
      />
    </Container>
  );
};

export default Project;
