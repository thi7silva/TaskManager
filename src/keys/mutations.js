export const taskMutationKeys = {
  create: () => ["add-task"],
  update: (taskId) => ["update-task", taskId],
  delete: (taskId) => ["delete-task", taskId],
};
