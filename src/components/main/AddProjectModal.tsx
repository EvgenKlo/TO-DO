import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import { Actions, Project } from '../../types/types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/useAppSelector';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 320,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 10,
  boxSizing: 'border-box',
};

const AddProjectModal: React.FC<{
  modalOpen: false | true;

  setModalOpen: React.Dispatch<React.SetStateAction<false | true>>;

  projectId: number;
}> = ({ modalOpen, setModalOpen, projectId }) => {
  const state = useAppSelector((state) => state.projects);

  const handleClose = () => setModalOpen(false);

  const dispatch = useDispatch();

  const [project, setProject] = useState({
    name: '',
    description: '',
    id: projectId,
  } as Project);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newProjects = [...state, { ...project, id: projectId }];
    localStorage.setItem('01MyToDoList23', JSON.stringify(newProjects));

    dispatch({ type: Actions.AddProject, payload: { ...project, id: projectId, tasks: [] } });

    handleClose();
  };

  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h2"
          sx={{ marginBottom: 1 }}
        >
          Project number {projectId}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
        >
          <Stack spacing={2}>
            <TextField
              required
              placeholder="Enter the project name"
              label="Enter the project name"
              onChange={(event) => {
                setProject({ ...project, name: event.target.value });
              }}
            />
            <TextField
              required
              placeholder="What is the project about?"
              label="What is the project about?"
              onChange={(event) => {
                setProject({ ...project, description: event.target.value });
              }}
            />
            <Button type="submit">Add project</Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddProjectModal;
