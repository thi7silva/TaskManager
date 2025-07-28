import { useForm } from 'react-hook-form';
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
import { useDeleteTask } from '../hooks/data/use-delete-task';
import { useGetTask } from '../hooks/data/use-get-task';
import { useUpdateTask } from '../hooks/data/use-update-task';

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { mutate: updateTask, isPending: updateTaskIsLoading } =
    useUpdateTask(taskId);

  const { mutate: deleteTask, isPending: deleteTaskIsLoading } =
    useDeleteTask(taskId);

  const { data: task } = useGetTask({
    taskId,
    onSuccess: reset,
  });

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSaveClick = async (data) => {
    updateTask(data, {
      onSuccess: () => {
        toast.success('Tarefa atualizada com sucesso!');
        navigate(-1);
      },
      onError: () =>
        toast.error('Erro ao atualizar a tarefa. Por favor, tente novamente.'),
    });
  };

  const handleDeleteClick = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success('Tarefa deletada com sucesso!');
        navigate(-1);
      },
      onError: () => toast.error('Erro ao deletar a tarefa.'),
    });
  };

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
          <Button
            className="bg-brand-danger h-fit self-end"
            color="danger"
            onClick={handleDeleteClick}
          >
            <TrashIcon />
            Deletar tarefa
          </Button>
        </div>

        <form onSubmit={handleSubmit(handleSaveClick)} className="space-y-6">
          {/* dados da tarefa */}
          <div className="bg-brand-white space-y-6 rounded-xl p-6">
            <div>
              <Input
                id="title"
                label="Título"
                {...register('title', {
                  required: 'O título é obrigatório',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'O título não pode ser vazio';
                    }
                  },
                })}
                error={errors.title?.message}
              />
            </div>

            <div>
              <TimeSelect
                {...register('time', { required: 'O horário é obrigatório' })}
                error={errors.time?.message}
              />
            </div>

            <div>
              <Input
                id="description"
                label="Descrição"
                {...register('description', {
                  required: 'A descrição é obrigatória',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'A descrição não pode ser vazia';
                    }
                  },
                })}
                error={errors.description?.message}
              />
            </div>
          </div>

          {/* botão de salvar */}

          <div className="flex w-full justify-end gap-3">
            <Button
              color="primary"
              size="large"
              type="submit"
              disabled={updateTaskIsLoading || deleteTaskIsLoading}
            >
              {(updateTaskIsLoading || deleteTaskIsLoading) && (
                <LoaderIcon className="animate-spin" />
              )}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
