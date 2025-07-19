import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ArrowLeftIcon, ChevronRightIcon, TrashIcon } from '../assets/icons';
import Button from '../components/Button';
import Input from '../components/Input';
import Sidebar from '../components/Sidebar';
import TimeSelect from '../components/TimeSelect';

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

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
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        {/* barra do topo */}
        <div className="flex w-full justify-between">
          {/* parte da esquerda */}
          <div>
            <button
              onClick={handleBackClick}
              className="bg-brand-primary mb-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full"
            >
              <ArrowLeftIcon />
            </button>
            <div className="flex items-center gap-1 text-xs">
              <span
                className="text-brand-text-gray cursor-pointer"
                onClick={handleBackClick}
              >
                Minhas tarefas
              </span>
              <ChevronRightIcon className="text-brand-text-gray" />
              <span className="text-brand-primary font-semibold">
                {task?.title}
              </span>
            </div>
            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>

          {/* parte da direita */}
          <Button className="bg-brand-danger h-fit self-end" color="danger">
            <TrashIcon />
            Deletar tarefa
          </Button>
        </div>

        {/* dados da tarefa */}
        <div className="bg-brand-white space-y-6 rounded-xl p-6">
          <div>
            <Input id="title" label="Título" value={task?.title} />
          </div>

          <div>
            <TimeSelect value={task?.time} />
          </div>

          <div>
            <Input
              id="description"
              label="Descrição"
              value={task?.description}
            />
          </div>
        </div>

        <div className="flex w-full justify-end gap-3">
          <Button color="secondary" size="large">
            Cancelar
          </Button>
          <Button color="primary" size="large">
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
