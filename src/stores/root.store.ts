import labelStore, { type ILabelStore } from "./label.store";
import tasksStore, { type ITaskStore } from "./tasks.store";
import usersStore, { type IUsersStore } from "./users.store";

class RootStore {
    labelStore: ILabelStore = labelStore;
    usersStore: IUsersStore = usersStore;
    tasksStore: ITaskStore = tasksStore;
}

export type IRootStore = typeof RootStore.prototype;
export default RootStore;