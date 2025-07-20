import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LoaderIcon,
  TrashIcon,
} from '../assets/icons';
import Button from '../components/Button';
import Input from '../components/Input';
import Sidebar from '../components/Sidebar';
import TimeSelect from '../components/TimeSelect';

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState();
  const navigate = useNavigate();
  const [saveIsLoading, setSaveIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const titleRef = useRef();
  const timeRef = useRef();
  const descriptionRef = useRef();

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

  const handleSaveClick = async () => {
    setSaveIsLoading(true);
    const newErrors = [];
    const title = titleRef.current.value.trim();
    const time = timeRef.current.value;
    const description = descriptionRef.current.value.trim();
    if (!title) {
      newErrors.push({
        inputName: 'title',
        message: 'O título é obrigatório',
      });
    }
    if (!time) {
      newErrors.push({
        inputName: 'time',
        message: 'O horário é obrigatório',
      });
    }
    if (!description) {
      newErrors.push({
        inputName: 'description',
        message: 'A descrição é obrigatória',
      });
    }
    setErrors(newErrors);
    if (newErrors.length > 0) {
      return setSaveIsLoading(false);
    }

    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title,
        time,
        description,
      }),
    });

    if (!response.ok) {
      toast.error('Ocorreu um erro ao salvar a tarefa');
      setSaveIsLoading(false);
    }
    const newTask = await response.json();
    setTask(newTask);
    setSaveIsLoading(false);
    toast.success('Tarefa salva com sucesso!');
  };

  const titleError = errors.find((error) => error.inputName === 'title');
  const timeError = errors.find((error) => error.inputName === 'time');
  const descriptionError = errors.find(
    (error) => error.inputName === 'description'
  );

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
              <Link className="text-brand-text-gray cursor-pointer" to="/">
                Minhas tarefas
              </Link>
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
            <Input
              id="title"
              label="Título"
              defaultValue={task?.title}
              error={titleError?.message}
              ref={titleRef}
            />
          </div>

          <div>
            <TimeSelect
              defaultValue={task?.time}
              error={timeError?.message}
              ref={timeRef}
            />
          </div>

          <div>
            <Input
              id="description"
              label="Descrição"
              defaultValue={task?.description}
              error={descriptionError?.message}
              ref={descriptionRef}
            />
          </div>
        </div>

        <div className="flex w-full justify-end gap-3">
          <Button
            color="primary"
            size="large"
            onClick={handleSaveClick}
            disabled={saveIsLoading}
          >
            {saveIsLoading && <LoaderIcon className="animate-spin" />}
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
