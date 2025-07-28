import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateTask', taskId],
    mutationFn: async (newTask) => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          title: newTask.title.trim(),
          description: newTask.description.trim(),
          time: newTask.time,
        }),
      });
      if (!response.ok) {
        throw new Error('Erro ao atualizar a tarefa');
      }
      const updatedTask = await response.json();
      queryClient.setQueryData(['tasks'], (oldTasks) => {
        return oldTasks.map((oldTask) =>
          oldTask.id === updatedTask.id ? updatedTask : oldTask
        );
      });
    },
  });
};
