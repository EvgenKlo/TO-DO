import Stack from '@mui/material/Stack';

import { useAppSelector } from '../../hooks/useAppSelector';
import { Button, Container } from '@mui/material';
import AddProjectModal from '../../components/main/AddProjectModal';
import { useState } from 'react';
import ProjectCard from '../../components/main/ProjectCard';

const Main = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const state = useAppSelector((state) => state.projects);

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Stack spacing={2}>
        <Button
          sx={{ width: 350 }}
          onClick={() => setModalOpen(true)}
        >
          Add new project
        </Button>
        {state.map((item) => (
          <ProjectCard
            key={item.id}
            item={item}
          />
        ))}
      </Stack>
      <AddProjectModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        projectId={state[state.length - 1].id + 1}
      />
    </Container>
  );
};

export default Main;
