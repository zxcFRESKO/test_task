import React, { useRef, useState, type Dispatch, type FC, type SetStateAction } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../../../../context/RootStoreContext";
import type { ILabel, IUser } from "../../../../../types/types";
import { AsyncRenderer } from "../../../../../components/AsyncRenderer/AsyncRenderer";
import type { IPromiseBasedObservable } from "mobx-utils";
import toast from "react-hot-toast";
import { toastSuccess } from "../../../../../shared/toast";
import styles from './styles.module.scss'
import cn from "classnames";
import { ListRenderer } from "../../../../../components/ListRenderer/ListRenderer";
import useClickOutside from "../../../../../shared/useClickOutside";

interface ITaskCreateForm {
  users: IPromiseBasedObservable<IUser[]>;
  labels: IPromiseBasedObservable<ILabel[]>;
  setIsAddTaskModalOpen: Dispatch<SetStateAction<boolean>>
}

export const TaskCreateForm:FC<ITaskCreateForm> = observer(({ users, labels, setIsAddTaskModalOpen }) => {
  const { tasksStore: { createTask } } = useStores();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee_id, setAssignee_id] = useState<number | null>(null);
  const [selectedLabels, setSelectedLabels] = useState<number[]>([]);
  const taskCreatemodalRef = useRef<HTMLDivElement>(null)

  const toggleLabel = (labelId: number) => {
    setSelectedLabels((prev) =>
      prev.includes(labelId)
        ? prev.filter((id) => id !== labelId)
        : [...prev, labelId]
    );
  };

  const handleCloseAddTaskModal = () => setIsAddTaskModalOpen(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !assignee_id) {
      toast.error('Заполните все поля')
      return;
    }

    await createTask(title,
      description,
      assignee_id,
      selectedLabels,);
    toastSuccess("Задача успешно создана!", false);
    setIsAddTaskModalOpen(false)
  };

  useClickOutside(taskCreatemodalRef, () => setIsAddTaskModalOpen(false))
  
  return (
    <div className={styles.create} ref={taskCreatemodalRef}>
      <h2>Добавить задачу</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.title}>
          <label className={styles.title_label}>Название</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.title_input}
            placeholder="Название"
          />
        </div>

        <div>
          <label>Описание</label>
          <textarea
            className={styles.description_textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className={styles.assignee}>
          <label className={styles.assignee_label}>Исполнитель</label>
          <AsyncRenderer<IUser[]>
            value={users}
            fulfilled={(users) => (
              <select
                className={styles.assignee_select}
                value={assignee_id ?? ""}
                onChange={(e) => setAssignee_id(Number(e.target.value))}
              >
                <option value="">Выберите исполнителя</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.first_name} {user.last_name}
                  </option>
                ))}
              </select>
            )}
          />
        </div>

        <div>
          <label>Метки</label>
          <AsyncRenderer<ILabel[]>
            value={(labels)}
            fulfilled={(value) => (
              <ListRenderer items={value} render={(item: ILabel) =>
                <div key={item.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedLabels.includes(item.id)}
                      onChange={() => toggleLabel(item.id)}
                    />
                    {item.caption}{" "}
                    <span style={{ color: item.color }}>■</span>
                  </label>
                </div>
              } />
            )}
          />
        </div>
        <div className={styles.btns}>
          <button type="submit" className={cn(styles.btn_create, styles.btn)}>Создать</button>
          <button type="button" className={cn(styles.btn_cancel, styles.btn)} onClick={handleCloseAddTaskModal}>Отменить</button>
        </div>
      </form>
    </div>
  );
});