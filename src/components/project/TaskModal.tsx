import { Box, Modal } from '@mui/material';
import { Actions, Status, Task } from '../../types/types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { style } from '../../styles/modalStyle';
import TaskFields from './taskModal/TaskFields';
import TaskManage from './taskModal/TaskManage';
import DeleteTaskModal from './taskModal/DeleteTaskModal';
import SubtaskModal from './taskModal/SubtaskModal';

const TaskModal: React.FC<{
  modalOpen: false | true;

  setModalOpen: React.Dispatch<React.SetStateAction<false | true>>;

  task: Task;
}> = ({ modalOpen, setModalOpen, task }) => {
  const handleClose = () => {
    setEdit(false);
    setModalOpen(false);
  };

  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();

  const [taskUpdate, setTaskUpdate] = useState(task);

  const [deleteModal, setDeleteModal] = useState(false);

  const [subtasksModal, setSubtasksModal] = useState(false);

  const deleteTask = () => {
    dispatch({
      type: Actions.DeleteTask,
      payload: { projectId: task.projectId, taskNumber: task.number },
    });
    setEdit(false);
  };

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
          dispatch({
            type: Actions.EditTask,
            payload: {
              projectId: task.projectId,
              task: {
                ...taskUpdate,
                expirationDate: taskUpdate.status === Status.Done ? Date.now() : 0,
              },
            },
          });
          setEdit(false);
        }}
      >
        <TaskManage
          task={task}
          edit={edit}
          setEdit={setEdit}
          setTaskUpdate={setTaskUpdate}
          setDeleteModal={setDeleteModal}
          setModalOpen={setModalOpen}
        />
        <TaskFields
          task={task}
          edit={edit}
          taskUpdate={taskUpdate}
          setTaskUpdate={setTaskUpdate}
          setSubtasksModal={setSubtasksModal}
        />
        <DeleteTaskModal
          open={deleteModal}
          setOpen={setDeleteModal}
          deleteTask={deleteTask}
        />
        <SubtaskModal
          modalOpen={subtasksModal}
          setModalOpen={setSubtasksModal}
          task={task}
        />
      </Box>
    </Modal>
  );
};

export default TaskModal;
