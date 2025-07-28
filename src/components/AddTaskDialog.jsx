import './AddTaskDialog.css';

import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { CSSTransition } from 'react-transition-group';
import { toast } from 'sonner';
import { v4 } from 'uuid';

import { LoaderIcon } from '../assets/icons';
import { useAddTask } from '../hooks/data/use-add-task';
import Button from './Button';
import Input from './Input';
import TimeSelect from './TimeSelect';

const AddTaskDialog = ({ isOpen, handleClose }) => {
  const { mutate: addTask } = useAddTask();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: { title: '', description: '', time: 'morning' },
  });

  const nodeRef = useRef();

  const handleSaveClick = async (data) => {
    const task = {
      id: v4(),
      title: data.title.trim(),
      description: data.description.trim(),
      time: data.time,
      status: 'not_started',
    };

    addTask(task, {
      onSuccess: () => {
        toast.success('Tarefa adicionada com sucesso!');
        handleClose();
        reset({ title: '', description: '', time: 'morning' });
      },
      onError: () => {
        toast.error('Erro ao adicionar tarefa. Por favor, tente novamente.');
      },
    });
  };

  const handleCancelClick = () => {
    reset({ title: '', description: '', time: 'morning' });
    handleClose();
  };

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed top-0 bottom-0 left-0 flex h-screen w-screen items-center justify-center backdrop-blur"
          >
            {/* DIALOG */}
            <div className="rounded-xl bg-white p-5 text-center shadow">
              <h2 className="text-brand-dark-blue text-xl font-semibold">
                Nova Tarefa
              </h2>
              <p className="text-brand-text-gray mt-1 mb-4 text-sm">
                Insira as informações abaixo
              </p>

              <form
                onSubmit={handleSubmit(handleSaveClick)}
                className="flex w-[336px] flex-col space-y-4"
              >
                <Input
                  id="title"
                  label="Título"
                  placeholder="Insira o título da tarefa"
                  error={errors?.title?.message}
                  disabled={isSubmitting}
                  {...register('title', {
                    required: 'O título é obrigatório',
                    validate: (value) => {
                      if (!value.trim()) {
                        return 'O título não pode ser vazio';
                      }
                    },
                  })}
                />

                <TimeSelect
                  error={errors?.time?.message}
                  disabled={isSubmitting}
                  {...register('time', { required: 'O horário é obrigatório' })}
                />

                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  error={errors?.description?.message}
                  disabled={isSubmitting}
                  {...register('description', {
                    required: 'A descrição é obrigatória',
                    validate: (value) => {
                      if (!value.trim()) {
                        return 'A descrição não pode ser vazia';
                      }
                    },
                  })}
                />

                <div className="flex gap-3">
                  <Button
                    size="large"
                    className="w-full"
                    color="secondary"
                    onClick={handleCancelClick}
                    type="button"
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="large"
                    className="w-full"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && <LoaderIcon className="animate-spin" />}
                    Salvar
                  </Button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  );
};

export default AddTaskDialog;
