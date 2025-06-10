import { createBrowserRouter } from 'react-router-dom'
import { Header } from '../components/header/Header'
import { LabelsList } from '../pages/Labels/labelList/LabelsList.tsx'
import { Users } from '../pages/Users/Users'
import {  User } from '../pages/Users/ui/User.tsx'
import Tasks from '../pages/Tasks/Tasks.tsx'

export const router = createBrowserRouter([
    {
        path: "",
        element: <Header />,
        children: [
            {
                path: '/labels',
                element: <LabelsList />,
            },
            {
                path: '/users',
                element: <Users/>,
            },
            {
                path: '/users/:id',
                element: <User />,
            },
            {
                path: '/tasks',
                element: <Tasks />,
            },
        ]
    }
])