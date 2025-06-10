import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { useStores } from "../../context/RootStoreContext"
import type { IUser } from "../../types/types"
import { ListRenderer } from "../../components/ListRenderer/ListRenderer"
import styles from './styles.module.scss'
import { useNavigate } from "react-router-dom"
import { AsyncRenderer } from "../../components/AsyncRenderer/AsyncRenderer"
import { CreateUserForm } from "./UserCreateForm.tsx"



export const Users = observer(() => { 
    const { usersStore: { users, getAllUsers } } = useStores()
    const navigate = useNavigate()

    useEffect(() =>{
        getAllUsers()
    }, [])


    if (!users){
        return null
    }

    const handleGetUserInfo = (id: number) =>{
        navigate(`/users/${id}`)
    }

  return (
    <>
    <CreateUserForm />
    <AsyncRenderer<IUser[]>
              value={users}
              fulfilled={(users) => (
                <ListRenderer items={users} parentClass={styles.users} childClass={styles.user}  render={(item: IUser) => 
                    <div key={item.id} className={styles.user_item} onClick={() => handleGetUserInfo(item.id)}>
                        <label>Имя: {item.first_name}</label>
                        <label>Фамилия: {item.last_name}</label>
                        <label>Биография: {item.bio}</label>
                    </div>
                }/>         
              )}
    />
    
    </>
  )
})