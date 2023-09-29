import { Actions, Project, Status, Task } from '../../types/types';

interface AddProject {
  type: Actions.AddProject;
  payload: Project;
}

interface AddTask {
  type: Actions.AddTask;
  payload: {
    project: number;
    task: Task;
  };
}

interface EditTask {
  type: Actions.EditTask;
  payload: {
    projectId: number;
    task: Task;
  };
}

interface ChangeStatus {
  type: Actions.ChangeStatus;
  payload: {
    projectId: number;
    taskNumber: number;
    taskStatus: Status;
  };
}

type UserAction = AddProject | AddTask | EditTask | ChangeStatus;

const localStorageData = localStorage.getItem('01MyToDoList23');

const initialState: Project[] = localStorageData
  ? (JSON.parse(localStorageData) as Project[])
  : [{ name: 'New project', description: 'Test project', id: 1, tasks: [] }];

export function projectsReducer(state = initialState, action: UserAction): Project[] {
  switch (action.type) {
    case Actions.AddProject:
      state.push(action.payload);
      return state;
    case Actions.AddTask:
      state.find((item) => item.id === action.payload.project)?.tasks?.push(action.payload.task);
      localStorage.setItem('01MyToDoList23', JSON.stringify(state));
      return state;
    case Actions.EditTask:
      state = state.map((item) =>
        item.id === action.payload.projectId
          ? {
              ...item,
              tasks: item.tasks?.map((task) =>
                task.number === action.payload.task.number ? action.payload.task : task
              ),
            }
          : item
      );
      localStorage.setItem('01MyToDoList23', JSON.stringify(state));
      return state;
    case Actions.ChangeStatus:
      state = state.map((item) =>
        item.id === action.payload.projectId
          ? {
              ...item,
              tasks: item.tasks?.map((task) =>
                task.number === action.payload.taskNumber
                  ? { ...task, status: action.payload.taskStatus }
                  : task
              ),
            }
          : item
      );
      localStorage.setItem('01MyToDoList23', JSON.stringify(state));
      return state;
    default:
      return state;
  }
}
