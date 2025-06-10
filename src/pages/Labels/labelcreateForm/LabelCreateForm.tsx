import { useState, type FormEvent } from 'react'
import { useStores } from '../../../context/RootStoreContext'
import { observer } from 'mobx-react-lite'
import styles from './styles.module.scss'

export const LabelCreateForm = observer(() => {
    const [caption, setCaption] = useState("");
    const [color, setColor] = useState("#000000");

    const { labelStore: { createLabel }, } = useStores();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!caption.trim()) return;

        await createLabel(caption, color);
        setCaption("");
    };

    return (
        <form onSubmit={handleSubmit} className={styles.label_form}>
            <div className={styles.label_content}>
                <input
                    type="text"
                    placeholder="Название метки"
                    value={caption}
                    className={styles.label_title}
                    onChange={(e) => setCaption(e.target.value)}
                />
                <input
                    type="color"
                    value={color}
                    className={styles.label_color}
                    onChange={(e) => setColor(e.target.value)}
                />
                <button type="submit" className={styles.label_btn}>Создать метку</button>
            </div>
        </form>
    );
});