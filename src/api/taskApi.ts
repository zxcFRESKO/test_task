import type { IRemoveAddTaskLabelProps, ITask } from "../types/types";
import { defaultApi } from "./api";

export const getAllTasksApi = async () => {
  const res = await defaultApi.post("", {
    query: `
    query GetAllTasks {
  tasks {
    id
    title
    description
    task_labels {
      label {
        id
        caption
        color
      }
    }
  }
}
    `,
  });

  return res.data.data.tasks
};

export const createTaskApi = async ({
  title,
  description,
  assignee_id,
  selectedLabels,
}: Omit<ITask, "id" | "task_labels">) => {
  const res = await defaultApi.post("", {
    query: `
      mutation CreateTask($object: tasks_insert_input!) {
        insert_tasks_one(object: $object) {
          id
          title
        }
      }
    `,
    variables: {
      object: {
        title,
        description,
        assignee_id,
        task_labels: {
          data: selectedLabels?.map((labelId) => ({ label_id: labelId })),
        },
      },
    },
  });

  return res.data.data.insert_tasks_one;
};

export const retrieveTaskApi = async ({ id }: Pick<ITask, "id">) => {
  const res = await defaultApi.post("", {
    query: `
      query TaskRetrieve {
        tasks_by_pk(id: ${id}) {
        title
        assignee_id
        created_at
        description
        id
        task_labels {
      label {
        id
        caption
        color
      }
    }
  }
      }
    `,
  });

  return res.data.data.tasks_by_pk;
};

export const updateTaskApi = async (
  taskId: number,
  updatedFields: Partial<ITask>
) => {
  const res = await defaultApi.post("", {
    query: `
      mutation UpdateTask($id: Int!, $set: tasks_set_input!) {
        update_tasks_by_pk(pk_columns: { id: $id }, _set: $set) {
          id
          title
          description
          assignee_id
          task_labels {
            label {
              id
              caption
              color
            }
          }
        }
      }
    `,
    variables: {
      id: taskId,
      set: {
        title: updatedFields.title,
        description: updatedFields.description,
        assignee_id: updatedFields.assignee_id,
      }
    }
  });

  return res.data.data.update_tasks_by_pk;
};

export const removeTaskLabelApi = async ({ taskId, labelId }: IRemoveAddTaskLabelProps) => {
  const res = await defaultApi.post("", {
    query: `
      mutation RemoveTaskLabel($task_id: Int!, $label_id: Int!) {
        delete_task_labels(
          where: {
            task_id: { _eq: $task_id },
            label_id: { _eq: $label_id }
          }
        ) {
          affected_rows
        }
      }
    `,
    variables: {
      task_id: taskId,
      label_id: labelId,
    },
  });

  return res.data.data.delete_task_labels;
};

export const addTaskLabelApi = async ({ taskId, labelId }: IRemoveAddTaskLabelProps) => {
  const res = await defaultApi.post("", {
    query: `
      mutation AddTaskLabel($task_id: Int!, $label_id: Int!) {
    insert_task_labels_one(
      object: { task_id: $task_id, label_id: $label_id }
    ) {
      task {
        id
        title
      }
      label {
        id
        caption
      }
    }
  }
`,
    variables: {
      task_id: taskId,
      label_id: labelId,
    },
  });

  return res.data.data.insert_task_labels_one;
};

export const removeTaskApi = async ({ taskId }: Pick<IRemoveAddTaskLabelProps, 'taskId'>) => {
  const res = await defaultApi.post("", {
    query: `
      mutation DeleteTask($task_id: Int!) {
        delete_tasks_by_pk(id: $task_id) {
          id
          title
        }
      }
    `,
    variables: {
      task_id: taskId,
    },
  });

  return res.data.data.delete_tasks_by_pk;
};

export const getTasksByLabelApi = async (labelId: number) => {
  const res = await defaultApi.post("", {
    query: `
      query GetTasksByLabel($label_id: Int!) {
        tasks(where: {
          task_labels: {
            label_id: { _eq: $label_id }
          }
        }) {
          id
          title
          description
          task_labels {
        label {
          id
          caption
          color
        }
      }
        }
      }
    `,
    variables: {
      label_id: labelId,
    },
  });

  return res.data.data.tasks;
};

export const searchTasksApi = async (query: string) => {
  const res = await defaultApi.post("", {
    query: `
      query SearchTasks($titleFilter: String!) {
        tasks(where: {
          title: { _ilike: $titleFilter }
        }) {
          id
          title
          description
          task_labels {
            label {
              id
              caption
              color
            }
          }
        }
      }
    `,
    variables: {
      titleFilter: `%${query}%`,
    },
  });

  return res.data.data.tasks;
};