import { Link, Outlet } from "react-router-dom"
import styles from './styles.module.scss'

export const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navigator}>
          <h1 className={styles.logo}><Link to={'/'}>TeamWork</Link></h1>
          <div className={styles.navigate}>
            <Link className={styles.link} to={'/labels'}>Labels</Link>
            <Link className={styles.link} to={'/users'}>Users</Link>
            <Link className={styles.link} to={'/tasks'}>Tasks</Link>
          </div>
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  )
}