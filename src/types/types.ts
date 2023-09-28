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
}

export type Task = {
  number: number;
  name: string;
  description: string;
  dateCreate: string;
  timeInWork: string;
  expirationDate: string;
  priority: string;
  files: string;
  status: 'queue' | 'development' | 'done';
  subtasks?: string;
};
