import { useEffect, useRef, useState, type FC } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../../../../context/RootStoreContext";
import type { ILabel, ITask, ITaskLabel } from "../../../../../types/types";
import { ListRenderer } from "../../../../../components/ListRenderer/ListRenderer";
import useClickOutside from "../../../../../shared/useClickOutside";
import { toastSuccess } from "../../../../../shared/toast";
import styles from './styles.module.scss'


interface ILabelModal {
  taskId: number;
}

export const LabelModal: FC<ILabelModal> = observer(({ taskId }) => {
  const { labelStore,
    tasksStore: { selectedTask, addTaskLabel },
  } = useStores();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOpenModal = () => setIsOpenModal(true);

  useClickOutside(modalRef, () => setIsOpenModal(false));

  const taskLabelIds = selectedTask?.case({
    fulfilled: (task: ITask) =>
      task?.task_labels.map((tl: ITaskLabel) => tl.label.id),
  });

  const filteredLabels = labelStore.labels?.case({
    fulfilled: (labels: ILabel[]) => {
      if (!taskLabelIds) return labels;

      return labels.filter((label) => !taskLabelIds.includes(label.id));
    },
  });

  useEffect(() => {
    labelStore.loadLabels();
  }, []);

  return (
    <div className="modal" ref={modalRef}>
      {filteredLabels?.length ? <button className={styles.add} onClick={handleOpenModal}>+</button>: <></>}

      {isOpenModal && (
        <div className={styles.modal}>
          <ListRenderer
            items={filteredLabels ?? []}
            render={(label: ILabel) => (
              <ul className={styles.labels}>
                <li onClick={async () => {
                      await addTaskLabel(taskId, label.id)
                      toastSuccess('Метка успешно добавлена!', true)
                    }} key={label.id} className={styles.label}>
                  <button
                    className={styles.label_name}
                  >
                    <span>{label.caption}{" "}</span>
                    <span style={{ color: label.color }}>■</span>
                  </button>
                </li>
              </ul>
            )}
          />
        </div>
      )}
    </div>
  );
});