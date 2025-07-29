import {
  GlassWaterIcon,
  LoaderIcon,
  Tasks2Icon,
  TasksIcon,
} from "../assets/icons";
import DashboardCard from "../components/DashboardCard";
import { useGetTasks } from "../hooks/data/use-get-tasks";

const DashboardCards = () => {
  const { data: tasks } = useGetTasks();

  const notStartedTasks = tasks?.filter(
    (task) => task.status === "not_started"
  ).length;

  const inProgressTasks = tasks?.filter(
    (task) => task.status === "in_progress"
  ).length;

  const completedTasks = tasks?.filter((task) => task.status === "done").length;

  return (
    <div className="grid grid-cols-4 gap-9">
      <DashboardCard
        icon={<Tasks2Icon />}
        mainText={tasks?.length}
        secondaryText="Tarefas totais"
      />
      <DashboardCard
        icon={<Tasks2Icon />}
        mainText={notStartedTasks}
        secondaryText="Tarefas não iniciadas"
      />
      <DashboardCard
        icon={<TasksIcon />}
        mainText={completedTasks}
        secondaryText="Tarefas concluídas"
      />
      <DashboardCard
        icon={<LoaderIcon />}
        mainText={inProgressTasks}
        secondaryText="Tarefas em andamento"
      />
    </div>
  );
};

export default DashboardCards;
