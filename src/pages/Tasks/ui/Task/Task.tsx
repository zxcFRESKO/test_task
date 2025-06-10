import { useStores } from "../../../../context/RootStoreContext";
import { useEffect, type FC } from "react";
import { observer } from "mobx-react-lite";
import { AsyncRenderer } from "../../../../components/AsyncRenderer/AsyncRenderer";
import type { ITask, IUser } from "../../../../types/types";
import { toastSuccess } from "../../../../shared/toast";
import { LabelModal } from "./LabelModal/LabelModal";
import styles from './styles.module.scss'
import cart from '/assets/images/cart.png?url'


interface ITaskProps {
  taskId: number;
  isOpen: boolean;
  onClose: () => void
}

export const Task: FC<ITaskProps> = observer(({taskId, isOpen, onClose}) => {
  const {
    tasksStore: { selectedTask, retrieveTask, updateTask, removeTaskLabel, removeTask },
    usersStore: { users, getAllUsers },
  } = useStores();

  useEffect(() => {
    if (isOpen && taskId){
    retrieveTask(Number(taskId));
    getAllUsers()
    }
  }, [taskId, retrieveTask]);

  if (!selectedTask) {
    return null
  }

  const handleUpdateTask = async () => {
    if (!selectedTask || !taskId) return;
    const currentTask = await selectedTask
    await updateTask(Number(taskId), {
      title: currentTask.title,
      description: currentTask.description,
      assignee_id: currentTask.assignee_id,
    });
    toastSuccess('Вы успешно обновили задание', true)
  };

  const handleDeleteTaskLabel = async (tasksId: number, labelId: number) => {
    await removeTaskLabel(tasksId, labelId)
    toastSuccess('Вы успешно удалили метку', false)
  }

  const handleDeleteTask = async () => {
    await removeTask(taskId)
    onClose()
    toastSuccess('Задача успешно удалена', false)
  }

  return (
    <div className={styles.task}>
      <div className={styles.close}> 
          <span 
          onClick={handleDeleteTask}
          className={styles.cart}
          >
          <img src={cart} alt="cart" className={styles.cart_image} />
        </span>
        
        <span 
          className={styles.close_btn}
          onClick={() => onClose()}>
            &times;
        </span>
       
          </div>
      
      <AsyncRenderer<ITask>
        value={selectedTask}
        fulfilled={(task) => (
          <div style={{ padding: "1rem" }}>

            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => {
                const newTitle = e.currentTarget.textContent
                if (newTitle && newTitle !== task?.title) {
                  task.title = newTitle;
                  handleUpdateTask();
                }
              }}
            >
              <h1 className={styles.title}>{task?.title}</h1>
            </div>

            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => {
                const newDescription = e.currentTarget.textContent
                if (newDescription && newDescription !== task?.description) {
                  task.description = newDescription;
                  handleUpdateTask();
                }
              }}
            >
              {task?.description}
            </div>
            <LabelModal taskId={task?.id} />
            <label>Исполнитель</label>
            <AsyncRenderer<IUser[]>
              value={users}
              fulfilled={(users) => (
                <select
                  value={task?.assignee_id ?? ""}
                  onChange={(e) => {
                    const newAssigneeId = Number(e.target.value);
                    if (newAssigneeId !== task?.assignee_id) {
                      task.assignee_id = newAssigneeId;
                      handleUpdateTask();
                    }
                  }}
                >
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.first_name} {user.last_name}
                    </option>
                  ))}
                </select>
              )}

            />
            {task?.task_labels.map(({ label }) => (
              <div key={label.id} className={styles.label}>
                <span className={styles.label}
                  style={{
                    backgroundColor: label.color ? label.color : "white",
                  }}
                >
                  {label.caption}
                  <span
                    onClick={() => handleDeleteTaskLabel(task.id, label.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    &times;
                  </span>
                </span>
              </div>

            ))}
          </div>
        )}
      />
    </div>
  );
});