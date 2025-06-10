import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { useStores } from "../../../context/RootStoreContext"
import type { ILabel } from "../../../types/types"
import { ListRenderer } from "../../../components/ListRenderer/ListRenderer"
import { AsyncRenderer } from "../../../components/AsyncRenderer/AsyncRenderer"
import styles from './styles.module.scss'
import { LabelCreateForm } from "../labelcreateForm/LabelCreateForm"


export const LabelsList = observer(() => {
    const { labelStore: { labels, loadLabels } } = useStores()

    useEffect(() => {
        loadLabels()
    }, [])

    if (!labels) {
        return null
    }

    return (
        <div className={styles.labels}>
            <LabelCreateForm />
            <AsyncRenderer<ILabel[]>
                value={labels}
                fulfilled={(value) => (
                    <ListRenderer items={value} parentClass={styles.label} childClass={styles.label_item} render={(item: ILabel) =>
                        <div key={item.id} className={styles.label_item_content}>
                            <label>Название: <span>{item.caption}</span></label>
                            <label>цвет: <span>{item.color}</span><span style={{ color: item.color }}> ■</span></label>
                        </div>
                    } />
                )}
            />
        </div>
    )
})