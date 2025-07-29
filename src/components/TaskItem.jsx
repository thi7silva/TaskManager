import { Link } from "react-router-dom";
import { toast } from "sonner";

import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from "../assets/icons";
import { useDeleteTask } from "../hooks/data/use-delete-task";
import { useUpdateTask } from "../hooks/data/use-update-task";
import Button from "./Button";

const TaskItem = ({ task }) => {
  const { mutate: deleteTask, isPending } = useDeleteTask(task.id);
  const { mutate: updateTask } = useUpdateTask(task.id);

  const handleDeleteClick = () => {
    deleteTask(undefined, {
      onSuccess: () => toast.success("Tarefa deletada com sucesso!"),
      onError: () => toast.error("Erro ao deletar a tarefa."),
    });
  };

  const getNewStatus = () => {
    if (task.status === "not_started") {
      return "in_progress";
    }
    if (task.status === "in_progress") {
      return "done";
    }
    return "not_started";
  };

  const handleCheckboxClick = () => {
    updateTask(
      {
        status: getNewStatus(),
      },
      {
        onSuccess: () =>
          toast.success("Status da tarefa atualizado com sucesso!"),
        onError: () =>
          toast.error(
            "Erro ao atualizar status da tarefa. Por favor, tente novamente."
          ),
      }
    );
  };

  const getStatusClasses = (opacity) => {
    if (task.status === "done") {
      return `text-brand-primary ${opacity ? "bg-brand-primary/10" : "bg-brand-primary"}`;
    }

    if (task.status === "in_progress") {
      return `text-brand-process ${opacity ? "bg-brand-process/10" : "bg-brand-process"}`;
    }

    if (task.status === "not_started") {
      return "text-brand-dark-blue bg-brand-dark-blue/5";
    }
  };

  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg px-4 py-3 text-sm transition ${getStatusClasses(true)}`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getStatusClasses(false)}`}
        >
          <input
            type="checkbox"
            checked={task.status === "done"}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={handleCheckboxClick}
          />
          {task.status === "done" && <CheckIcon />}
          {task.status === "in_progress" && (
            <LoaderIcon className="text-brand-white animate-spin" />
          )}
        </label>

        {task.title}
      </div>

      <div className="flex gap-1">
        <Button color="ghost" onClick={handleDeleteClick} disabled={isPending}>
          {isPending ? (
            <LoaderIcon className="text-brand-text-gray animate-spin" />
          ) : (
            <TrashIcon className="text-brand-text-gray" />
          )}
        </Button>

        <Link to={`/task/${task.id}`}>
          <DetailsIcon />
        </Link>
      </div>
    </div>
  );
};

export default TaskItem;
