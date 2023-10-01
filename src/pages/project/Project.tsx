import { useParams, Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Button, Container, Grid, Typography } from '@mui/material';
import AddTaskModal from '../../components/project/AddTaskModal';
import { useState } from 'react';
import ProjectColumn from '../../components/project/ProjectColumn';
import { Status } from '../../types/types';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EditIcon from '@mui/icons-material/Edit';
import EditProjectModal from '../../components/project/EditProjectModal';

const columnNames = ['Queue', 'Development', 'Done'] as Status[];

const Project = () => {
  const { id } = useParams();

  const state = useAppSelector((state) => state.projects);

  const project = id && state.find((item) => item.id === +id);

  const [modalOpen, setModalOpen] = useState(false);

  const [editProjectModalOpen, setEditProjectModalOpen] = useState(false);

  return (
    <Container>
      {!project ? (
        <div>Project not found</div>
      ) : (
        <>
          <Typography variant="h4">{project.name}</Typography>
          <Typography variant="body1">{project.description}</Typography>
          <Link to={'/'}>
            <Button
              sx={{ margin: '0px 0px 16px 16px' }}
              variant="contained"
            >
              <KeyboardBackspaceIcon sx={{ marginRight: 1 }} />
              back to projects
            </Button>
          </Link>
          <Button
            onClick={() => {
              setModalOpen(true);
            }}
            sx={{ margin: '0px 0px 16px 16px' }}
            variant="contained"
          >
            <AddCircleOutlineIcon sx={{ marginRight: 1 }} /> Create task
          </Button>
          <Button
            sx={{ margin: '0px 0px 16px 16px' }}
            variant="contained"
            onClick={() => setEditProjectModalOpen(true)}
          >
            <EditIcon />
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
          <EditProjectModal
            modalOpen={editProjectModalOpen}
            setModalOpen={setEditProjectModalOpen}
            project={project}
          />
        </>
      )}
    </Container>
  );
};

export default Project;
