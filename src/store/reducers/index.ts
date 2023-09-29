import { combineReducers } from 'redux';
import { projectsReducer } from './../reducers/ProjectsReducer';

export const rootReducer = combineReducers({
  projects: projectsReducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;
