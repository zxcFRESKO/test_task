import { makeAutoObservable } from "mobx";
import { addTaskLabelApi, createTaskApi, getAllTasksApi, getTasksByLabelApi, removeTaskApi, removeTaskLabelApi, retrieveTaskApi, searchTasksApi, updateTaskApi, } from "../api/taskApi";
import { fromPromise, type IPromiseBasedObservable } from "mobx-utils";
import type { ITask } from "../types/types";


class TasksStore {
  tasks?: IPromiseBasedObservable<ITask[]>
  selectedTask!: IPromiseBasedObservable<ITask | null>;
   searchResults?: IPromiseBasedObservable<ITask[]>;

  searchQuery: string = "";

  constructor() {
    makeAutoObservable(this)  
  }

  getAllTasks = () => {
    this.tasks = fromPromise(getAllTasksApi());
  };

  createTask = async (title: string, description: string, assignee_id: number, selectedLabels: { label_id: number }[]) => {
    const newTask = fromPromise(createTaskApi({ title, description, assignee_id, selectedLabels }));
    (await this.tasks)?.push(await newTask);
    this.tasks = fromPromise(getAllTasksApi())
  };

  retrieveTask = (id: number) => {
    this.selectedTask = fromPromise(
      retrieveTaskApi({ id }).then((task) => task ?? null)
    );
  }

  removeTaskLabel = async (taskId: number, labelId: number) => {
    await removeTaskLabelApi({ taskId, labelId });
    const updatedTask = await retrieveTaskApi({ id: taskId });
    this.selectedTask = fromPromise(Promise.resolve(updatedTask));

    if (this.tasks) {
      this.tasks = fromPromise(
        this.tasks?.then((tasks) =>
          tasks.map((task) => (task.id === taskId ? updatedTask : task))
        )
      );
    }
  };

  addTaskLabel = async (taskId: number, labelId: number) => {
    await addTaskLabelApi({ taskId, labelId });
    const updatedTask = await retrieveTaskApi({ id: taskId });
    this.selectedTask = fromPromise(Promise.resolve(updatedTask));

    if (this.tasks) {
      this.tasks = fromPromise(
        this.tasks?.then((tasks) =>
          tasks.map((task) => (task.id === taskId ? updatedTask : task))
        )
      );
    }
  };

  removeTask = (taskId: number) => {
    this.selectedTask = fromPromise(
      removeTaskApi({ taskId }).then(() => null)
    );

    if (this.tasks) {
      this.tasks = fromPromise(
        this.tasks.then((tasks) =>
          tasks.filter((task) => task.id !== taskId)
        )
      );
    }
  };
  updateTask = async (taskId: number, updatedFields: Partial<ITask>) => {
    await updateTaskApi(taskId, updatedFields);
    const updatedTask = await retrieveTaskApi({ id: taskId });
    this.selectedTask = fromPromise(Promise.resolve(updatedTask));

    if (this.tasks) {
      this.tasks = fromPromise(
        this.tasks?.then((tasks) =>
          tasks.map((task) => (task.id === taskId ? updatedTask : task))
        )
      );
    }
  };

  getTasksByLabel = (labelId: number) => {
    this.tasks = fromPromise(getTasksByLabelApi(labelId));
  };

  setSearchQuery(query: string) {
    this.searchQuery = query;
  }

  searchTasks = (query: string) => {
    this.setSearchQuery(query);

    if (!query || query.trim().length === 0) {
      this.tasks = fromPromise(getAllTasksApi()); 
      return;
    }

    this.tasks = fromPromise(searchTasksApi(query));
  };

}


export type ITaskStore = typeof TasksStore.prototype;
export default new TasksStore()