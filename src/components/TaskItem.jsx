import CheckIcon from '../assets/icons/check.svg?react';
import LoaderIcon from '../assets/icons/loader.svg?react';
import DetailsIcon from '../assets/icons/details.svg?react';

const TaskItem = ({ task, handleTaskCheckboxClick }) => {
  const getStatusClasses = (opacity) => {
    if (task.status === 'done') {
      return `text-[#00ADB5] ${opacity ? 'bg-[#00ADB5]/10' : 'bg-[#00ADB5]'}`;
    }

    if (task.status === 'in_progress') {
      return `text-[#FFAA04] ${opacity ? 'bg-[#FFAA04]/10' : 'bg-[#FFAA04]'}`;
    }

    if (task.status === 'not_started') {
      return 'text-[#35383E] bg-[#35383E]/10';
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
            checked={task.status === 'done'}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={() => handleTaskCheckboxClick(task.id)}
          />
          {task.status === 'done' && <CheckIcon />}
          {task.status === 'in_progress' && (
            <LoaderIcon className="animate-spin" />
          )}
        </label>

        {task.title}
      </div>

      <a href="#" className="transition hover:opacity-75">
        <DetailsIcon />
      </a>
    </div>
  );
};

export default TaskItem;
