import { Box, Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Project, Task } from '../../types/types';
import { useState } from 'react';
import SearchTasksModal from './SearchTasksModal';

const SearchTask: React.FC<{ project: Project }> = ({ project }) => {
  const [numberSearch, setNumberSearch] = useState('');

  const [nameSearch, setNameSearch] = useState('');

  const [open, setOpen] = useState(false);

  const [tasks, setTasks] = useState([] as Task[]);

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', marginBottom: 1, marginLeft: 2 }}>
      <Box
        sx={{ flexWrap: 'nowrap', display: 'flex' }}
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          const number = +numberSearch;
          if (!isNaN(number)) {
            const result = project.tasks?.filter((task) => task.number === number);
            setTasks(result ? result : []);
            setOpen(true);
            setNumberSearch('');
          }
        }}
      >
        <TextField
          required
          variant="standard"
          type="input"
          value={numberSearch}
          label={'search by number'}
          placeholder={'search by number'}
          onChange={(e) => setNumberSearch(e.target.value)}
          error={isNaN(+numberSearch)}
          helperText={isNaN(+numberSearch) ? 'this field can only contain numbers' : null}
        />
        <Button type="submit">
          <SearchIcon />
        </Button>
      </Box>
      <Box
        sx={{ flexWrap: 'nowrap', display: 'flex' }}
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          const result = project.tasks?.filter((task) => task.name.indexOf(nameSearch) >= 0);
          setTasks(result ? result : []);
          setOpen(true);
          setNameSearch('');
        }}
      >
        <TextField
          required
          variant="standard"
          type="input"
          value={nameSearch}
          label={'search by name'}
          placeholder={'search by name'}
          onChange={(e) => setNameSearch(e.target.value)}
        />
        <Button type="submit">
          <SearchIcon />
        </Button>
      </Box>
      <SearchTasksModal
        tasks={tasks}
        open={open}
        setOpen={setOpen}
      />
    </Box>
  );
};

export default SearchTask;
