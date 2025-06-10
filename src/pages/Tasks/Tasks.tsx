import styles from './styles.module.scss'
import { CreateTaskPage } from "./createTaskPage/CreateTaskPage"
import { TaskList } from "./ui/Task/TaskList/TaskList";

export default function Tasks() {

    return (
        <div className={styles.cont}>
            <CreateTaskPage />
            <TaskList />
        </div>
    );
}