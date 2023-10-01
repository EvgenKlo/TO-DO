export type Project = {
  name: string;
  description: string;
  id: number;
  tasks?: Task[];
};

export type AddProjectAction = {
  type: string;
  payload: Project;
};

export type NewTaskAction = {
  type: string;
  payload: {
    project: number;
    task: Task;
  };
};

export enum Actions {
  AddProject = 'ADD_PROJECT',
  AddTask = 'ADD_TASK',
  EditTask = 'EDIT_TASK',
  ChangeStatus = 'CHANGE_STATUS',
  DeleteTask = 'DELETE_TASK',
  EditProject = 'EDIT_PROJECT',
}

export type Task = {
  number: number;
  name: string;
  description: string;
  dateCreate: number;
  timeInWork: string;
  expirationDate: string;
  priority: Priority;
  files: string;
  status: Status;
  subtasks?: string;
  projectId: number;
};

export enum Status {
  queue = 'Queue',
  development = 'Development',
  done = 'Done',
}

export enum Priority {
  low = 'low',
  medium = 'medium',
  high = 'high',
}
