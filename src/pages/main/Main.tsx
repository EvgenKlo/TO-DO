import { useAppSelector } from '../../hooks/useAppSelector';
import { Box, Button, Container } from '@mui/material';
import AddProjectModal from '../../components/main/AddProjectModal';
import { useState } from 'react';
import ProjectCard from '../../components/main/ProjectCard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Main = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const state = useAppSelector((state) => state.projects);

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Button
          sx={{ width: 250, minHeight: 80, margin: { xs: '10px auto', sm: 2 }, borderRadius: 2 }}
          onClick={() => setModalOpen(true)}
          variant="contained"
        >
          <AddCircleOutlineIcon />
          Add new project
        </Button>
        {state.map((item) => (
          <ProjectCard
            key={item.id}
            item={item}
          />
        ))}
      </Box>
      <AddProjectModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        projectId={state[state.length - 1].id + 1}
      />
    </Container>
  );
};

export default Main;
