import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState();

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'GET',
      });
      const data = await response.json();
      setTask(data);
    };
    fetchTasks();
  }, [taskId]);

  return (
    <div>
      <p>{task?.description}</p>
      <p>{task?.title}</p>
    </div>
  );
};

export default TaskDetailsPage;
