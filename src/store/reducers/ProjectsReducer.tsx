import { Actions, Project, Status, Subtask, Task, CommentItem } from '../../types/types';

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

interface DeleteTask {
  type: Actions.DeleteTask;
  payload: {
    projectId: number;
    taskNumber: number;
  };
}

interface EditProject {
  type: Actions.EditProject;
  payload: {
    project: Project;
  };
}

interface AddSubtask {
  type: Actions.AddSubtask;
  payload: {
    task: Task;
    subtask: Subtask;
  };
}

interface DeleteSubtask {
  type: Actions.DeleteSubtask;
  payload: {
    task: Task;
    subtaskId: number;
  };
}

interface ChangeSubtaskStatus {
  type: Actions.ChangeSubtaskStatus;
  payload: {
    task: Task;
    subtaskId: number;
    subtaskStatus: boolean;
  };
}

interface AddComment {
  type: Actions.AddComment;
  payload: {
    task: Task;
    comments: CommentItem[];
  };
}

type UserAction =
  | AddProject
  | AddTask
  | EditTask
  | ChangeStatus
  | DeleteTask
  | EditProject
  | AddSubtask
  | DeleteSubtask
  | ChangeSubtaskStatus
  | AddComment;

const localStorageData = localStorage.getItem('01MyToDoList23');

const initialState: Project[] = localStorageData
  ? (JSON.parse(localStorageData) as Project[])
  : [
      {
        name: 'Your first project',
        description: 'Use my application to realize your ideas',
        id: 1,
        tasks: [],
      },
    ];

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
                  ? {
                      ...task,
                      status: action.payload.taskStatus,
                      expirationDate: action.payload.taskStatus === Status.Done ? Date.now() : 0,
                    }
                  : task
              ),
            }
          : item
      );
      localStorage.setItem('01MyToDoList23', JSON.stringify(state));
      return state;
    case Actions.DeleteTask: {
      state = state.map((item) =>
        item.id === action.payload.projectId
          ? {
              ...item,
              tasks: item.tasks?.filter((task) => task.number !== action.payload.taskNumber),
            }
          : item
      );
      localStorage.setItem('01MyToDoList23', JSON.stringify(state));
      return state;
    }
    case Actions.EditProject: {
      state = state.map((item) =>
        item.id === action.payload.project.id
          ? {
              ...item,
              name: action.payload.project.name,
              description: action.payload.project.description,
            }
          : item
      );
      localStorage.setItem('01MyToDoList23', JSON.stringify(state));
      return state;
    }
    case Actions.AddSubtask:
      state = state.map((project) =>
        project.id === action.payload.task.projectId
          ? {
              ...project,
              tasks: project.tasks?.map((task) =>
                task.number === action.payload.task.number
                  ? { ...task, subtasks: [...(task.subtasks as Subtask[]), action.payload.subtask] }
                  : task
              ),
            }
          : project
      );
      localStorage.setItem('01MyToDoList23', JSON.stringify(state));
      return state;

    case Actions.DeleteSubtask:
      state = state.map((project) =>
        project.id === action.payload.task.projectId
          ? {
              ...project,
              tasks: project.tasks?.map((task) =>
                task.number === action.payload.task.number
                  ? {
                      ...task,
                      subtasks: task.subtasks?.filter(
                        (item) => item.id !== action.payload.subtaskId
                      ),
                    }
                  : task
              ),
            }
          : project
      );
      localStorage.setItem('01MyToDoList23', JSON.stringify(state));
      return state;

    case Actions.ChangeSubtaskStatus:
      state = state.map((project) =>
        project.id === action.payload.task.projectId
          ? {
              ...project,
              tasks: project.tasks?.map((task) =>
                task.number === action.payload.task.number
                  ? {
                      ...task,
                      subtasks: task.subtasks?.map((item) =>
                        item.id === action.payload.subtaskId
                          ? { ...item, complete: action.payload.subtaskStatus }
                          : item
                      ),
                    }
                  : task
              ),
            }
          : project
      );
      localStorage.setItem('01MyToDoList23', JSON.stringify(state));
      return state;

    case Actions.AddComment:
      state = state.map((project) =>
        project.id === action.payload.task.projectId
          ? {
              ...project,
              tasks: project.tasks?.map((task) =>
                task.number === action.payload.task.number
                  ? { ...task, comments: action.payload.comments }
                  : task
              ),
            }
          : project
      );
      localStorage.setItem('01MyToDoList23', JSON.stringify(state));
      return state;

    default:
      return state;
  }
}
