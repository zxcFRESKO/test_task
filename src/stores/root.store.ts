import labelStore from "./label.store";
import tasksStore from "./tasks.store";
import usersStore from "./users.store";

class RootStore {
    labelStore: typeof labelStore | null = labelStore;
    usersStore: typeof usersStore | null = usersStore;
    tasksStore: typeof tasksStore | null = tasksStore;
}

export type IRootStore = typeof RootStore.prototype;
export default RootStore;