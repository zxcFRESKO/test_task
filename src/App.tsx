import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Router'
import { RootContext } from './context/RootStoreContext'
import RootStore from './stores/root.store'
import { Toaster } from 'react-hot-toast'

function App() {
  

  return (
    <>
    <RootContext.Provider value={new RootStore()}>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        reverseOrder={true}
        toastOptions={{
          duration: 2000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />

    </RootContext.Provider>
    </>
  )
}

export default App
