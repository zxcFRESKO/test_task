import { TaskCreateForm } from "./ui/taskCreateForm/TaskCreateForm.tsx.tsx";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../../context/RootStoreContext.ts"
import styles from './styles.module.scss'
import { AsyncRenderer } from "../../../components/AsyncRenderer/AsyncRenderer.tsx";
import type { ILabel } from "../../../types/types.ts";
import { ListRenderer } from "../../../components/ListRenderer/ListRenderer.tsx";


export const CreateTaskPage = observer(() => {
  const {
    usersStore: { users, getAllUsers },
    labelStore: { labels, loadLabels },
    tasksStore: { getTasksByLabel, searchQuery, searchTasks }
  } = useStores();
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)


  useEffect(() => {
    getAllUsers();
    loadLabels();
  }, []);

  if (!users || !labels) {
    return null;
  }

  const handleFilterLabels = async (id: string) => {
    await getTasksByLabel(Number(id))
  }

  const handleAddTaskModal = () => setIsAddTaskModalOpen(true)

   const handleSetQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    searchTasks(query);
  };

  return (
    <>
      <div className={styles.usable}>
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Поиск задач..."
            value={searchQuery}
            onChange={handleSetQuery}
            className={styles.search_input}
          />
        </div>
        <div className={styles.select}>
          <label htmlFor="label-select" className={styles.select_label} >Фильтр по метке:</label>
          <select id="label-select" className={styles.select_content} onChange={(e) => handleFilterLabels(e.target.value)}>
            <AsyncRenderer<ILabel[]>
              value={labels}
              fulfilled={(labels) => (
                labels.map((label) => (
              <option key={label.id} value={label.id}>
                {label.caption}
              </option>
            )),
              )}
            />
          </select>
        </div>
        <button onClick={handleAddTaskModal} className={styles.task_add_btn}>+ Задача</button>
      </div>
      {isAddTaskModalOpen && <TaskCreateForm users={users} labels={labels} setIsAddTaskModalOpen={setIsAddTaskModalOpen} />}
    </>
  );
})
