import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { Actions, Project } from '../../types/types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 320,
  bgcolor: 'background.paper',
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
  boxSizing: 'border-box',
};

const EditProjectModal: React.FC<{
  modalOpen: false | true;

  setModalOpen: React.Dispatch<React.SetStateAction<false | true>>;

  project: Project;
}> = ({ modalOpen, setModalOpen, project }) => {
  const handleClose = () => {
    setModalOpen(false);
  };

  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();

  const [projectUpdate, setProjectUpdate] = useState(project);

  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={style}
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: Actions.EditProject, payload: { project: projectUpdate } });
          setEdit(false);
          setModalOpen(false);
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            margin: '-32px -32px 32px -32px',
            background: '#ffe0007a',
            borderRadius: '20px 20px 0 0',
            height: 50,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            sx={{ marginRight: 'auto', padding: '10px' }}
          >
            Project number: {project.id}
          </Typography>
          {edit ? (
            <>
              <Button
                sx={{ minWidth: 45 }}
                type="submit"
              >
                <DoneIcon />
              </Button>
              <Button
                sx={{ minWidth: 45 }}
                onClick={() => {
                  setEdit(false);
                  setProjectUpdate(project);
                }}
              >
                <ClearIcon />
              </Button>
            </>
          ) : (
            <>
              <Button
                sx={{ minWidth: 45 }}
                onClick={(e) => {
                  e.preventDefault();
                  setEdit(true);
                }}
              >
                <EditIcon />
              </Button>
              <Button
                sx={{ minWidth: 45 }}
                onClick={(e) => {
                  e.preventDefault();
                  setModalOpen(false);
                }}
              >
                <CloseIcon />
              </Button>
            </>
          )}
        </Box>
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h2"
          sx={{ marginBottom: 1, display: 'flex', overflow: 'hidden' }}
        >
          Name:{' '}
          {edit ? (
            <TextField
              fullWidth
              multiline
              variant="standard"
              type="input"
              value={projectUpdate.name}
              onChange={(e) => {
                setProjectUpdate({ ...projectUpdate, name: e.target.value });
              }}
              sx={{ marginLeft: 1 }}
            />
          ) : (
            project.name
          )}
        </Typography>
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h2"
          sx={{ marginBottom: 1, display: 'flex', overflow: 'hidden' }}
        >
          Description:{' '}
          {edit ? (
            <TextField
              fullWidth
              multiline
              rows={2}
              variant="standard"
              type="input"
              value={projectUpdate.description}
              onChange={(e) => {
                setProjectUpdate({ ...projectUpdate, description: e.target.value });
              }}
              sx={{ marginLeft: 1 }}
            />
          ) : (
            project.description
          )}
        </Typography>
      </Box>
    </Modal>
  );
};

export default EditProjectModal;
