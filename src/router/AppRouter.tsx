import { Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import Main from '../pages/main/Main';
import Project from '../pages/project/Project';

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}
      >
        <Route
          index
          element={<Main />}
        />
        <Route
          path="project"
          element={<Project />}
        />
      </Route>
    </Routes>
  );
};
