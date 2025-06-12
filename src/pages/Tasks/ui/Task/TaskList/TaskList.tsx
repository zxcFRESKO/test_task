import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { useStores } from "../../../../../context/RootStoreContext"
import type { ITask } from "../../../../../types/types"
import { ListRenderer } from "../../../../../components/ListRenderer/ListRenderer"
import styles from './styles.module.scss'
import { AsyncRenderer } from "../../../../../components/AsyncRenderer/AsyncRenderer"
import { Task } from "../Task"

export const TaskList = observer(() => {
    const { tasksStore: { tasks, getAllTasks } } = useStores();
    const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

    useEffect(() => {
        getAllTasks()
    }, [useStores])

    if (!tasks) {
        return null
    }

    return (
        <div className={styles.tasks_page}>
            <div className={styles.tasks}>
                <AsyncRenderer<ITask[]>
                    value={tasks}
                    fulfilled={(tasks) => (
                        <>
                            <ListRenderer<ITask>
                                items={tasks}
                                render={(item) => (
                                    <div key={item?.id} className={styles.task} onClick={() => setSelectedTaskId(item.id)}>
                                        <span>{item?.title}</span>
                                        <div className={styles.labels}>
                                            {item?.task_labels?.map(({ label }) => (

                                                <div key={label.id} className={styles.labels}>
                                                    <span className={styles.label}
                                                        style={{
                                                            backgroundColor: label.color,
                                                        }}
                                                    >
                                                        {label.caption}
                                                    </span>

                                                </div>
                                            ))}
                                        </div>

                                    </div>

                                )}
                            />
                        </>
                    )}

                />
            </div>
            {selectedTaskId && (
                <Task
                    taskId={selectedTaskId}
                    isOpen={!!selectedTaskId}
                    onClose={() => setSelectedTaskId(null)}
                />
            )}
        </div>
    )
})