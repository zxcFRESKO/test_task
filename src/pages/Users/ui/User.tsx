import { useParams } from "react-router-dom"
import { useStores } from "../../../context/RootStoreContext"
import { useEffect } from "react"
import { observer } from "mobx-react-lite";
import { AsyncRenderer } from "../../../components/AsyncRenderer/AsyncRenderer";
import type { IUser } from "../../../types/types";
import styles from '../styles.module.scss'
import { toastSuccess } from "../../../shared/toast";


export const User = observer(() => {
  const { id } = useParams<{ id: string }>()
  const { usersStore: { selectedUser, retrieveUser, updateUser } } = useStores()

  useEffect(() => {
    if (id) {
      retrieveUser(Number(id));
    }
  }, [id]);

  if (!selectedUser) {
    return null
  }

  const handleUpdateTask = async () => {
      if (!selectedUser || !id) return;
      const currentUser = await selectedUser
      await updateUser(Number(id), {
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        bio: currentUser.bio,
      });
      toastSuccess('Вы успешно обновили задание', true)
    };

  return (
    <div className={styles.user}>
      <AsyncRenderer<IUser>
        value={selectedUser}
        fulfilled={(selectedUser) => (
          <div className={styles.user_item}>
            <label>Имя: <span 
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => {
                const newFirstName = e.currentTarget.textContent
                if (newFirstName && newFirstName !== selectedUser?.first_name) {
                  selectedUser.first_name = newFirstName;
                  handleUpdateTask();
                }
              }}
            >{selectedUser.first_name}</span></label>
            <label>Фамилия: <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => {
                const newLastName = e.currentTarget.textContent
                if (newLastName && newLastName !== selectedUser?.last_name) {
                  selectedUser.last_name = newLastName;
                  handleUpdateTask();
                }
              }}
            >{selectedUser.last_name}</span></label>
            <label>Биография: <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => {
                const newBio = e.currentTarget.textContent
                if (newBio && newBio !== selectedUser?.bio) {
                  selectedUser.bio = newBio;
                  handleUpdateTask();
                }
              }}
            >{selectedUser.bio}</span></label>
          </div>
        )}
      />
    </div>
  );
}
)