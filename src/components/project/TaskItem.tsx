import { Task } from '../../types/types';

const TaskItem: React.FC<{ item: Task }> = ({ item }) => {
  return <div>{item.name}</div>;
};

export default TaskItem;
