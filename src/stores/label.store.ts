import { makeAutoObservable } from "mobx";
import { createLabelApi, loadLabelsApi } from "../api/labelApi";
import { fromPromise, type IPromiseBasedObservable } from "mobx-utils";
import type { ILabel } from "../types/types";

class LabelStore {
    labels?: IPromiseBasedObservable<ILabel[]>

    constructor() {
        makeAutoObservable(this)
    }

    loadLabels = () => {
        this.labels = fromPromise(loadLabelsApi())
    }
    createLabel = async (caption: string, color: string) => {
        const newLabel = await createLabelApi({ caption, color });
        (await this?.labels)?.push(newLabel)
        this.labels = fromPromise(loadLabelsApi())
    }
}

export type ILabelStore = typeof LabelStore.prototype;
export default new LabelStore()