import { useState, type FormEvent } from 'react'
import { useStores } from '../../context/RootStoreContext'
import { observer } from 'mobx-react-lite'
import styles from './styles.module.scss'

export const CreateUserForm = observer(() => {
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [bio, setBio] = useState("");

    const { usersStore: { createUser }, } = useStores();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!first_name.trim()) return;

        await createUser(first_name, last_name, bio);
        setFirst_name("");
    };

    return (
        <form onSubmit={handleSubmit} className={styles.user_form}>
            <div className={styles.user_form_content}>
                <input
                    type="text"
                    placeholder="Имя пользователя"
                    value={first_name}
                    className={styles.user_form_input}
                    onChange={(e) => setFirst_name(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Фамилия пользователя"
                    value={last_name}
                    className={styles.user_form_input}
                    onChange={(e) => setLast_name(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Биография пользователя"
                    value={bio}
                    className={styles.user_form_input}
                    onChange={(e) => setBio(e.target.value)}
                />
                <button type="submit" className={styles.user_form_btn}>Создать пользователя</button>
            </div>
        </form>
    );
});