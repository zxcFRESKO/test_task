import type { ILabelStore } from "../stores/label.store";

export interface ILabel {
    id: number;
    color: string;
    caption: string;
}

export interface IRootStore {
    labelStore: ILabelStore;
}

export interface IListRenderer<T> {
    items: T[];
    render: (item: T) => React.ReactNode;
    parentClass?: string 
    childClass?: string
};

export interface IUser {
    bio: string;
    first_name: string;
    id: number;
    last_name: string
}

export interface ITask {
  id: number;
  title: string;
  description: string;
  assignee_id: number;
  task_labels: {
    label: ILabel;
  }[];
  selectedLabels?: {
        label_id: number;
    }[];
}

export interface IRemoveAddTaskLabelProps {
    taskId: number;
    labelId: number;
}

export interface ITaskLabel{
    label: ILabel
}