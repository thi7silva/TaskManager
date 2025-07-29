import { useMutation, useQueryClient } from "@tanstack/react-query";

import { taskQueryKeys } from "../../keys/queries";
import { api } from "../../lib/axios";

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateTask", taskId],
    mutationFn: async (newTask) => {
      const { data: updatedTask } = await api.patch(`/tasks/${taskId}`, {
        title: newTask.title.trim(),
        description: newTask.description.trim(),
        time: newTask.time,
      });
      queryClient.setQueryData(taskQueryKeys.getAll(), (oldTasks) => {
        return oldTasks.map((oldTask) =>
          oldTask.id === updatedTask.id ? updatedTask : oldTask
        );
      });
      queryClient.setQueryData(taskQueryKeys.getOne(taskId), updatedTask);
    },
  });
};
