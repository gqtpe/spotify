import {createRoot} from 'react-dom/client'
import App from './app/App.tsx'
import './index.scss'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Login} from "./features/Auth";
import {RequireAuth} from "./app/hoc/RequireAuth.tsx";
import {Provider} from "react-redux";
import {store} from "./app";



const router = createBrowserRouter([
    {
        path: '/',
        element: <RequireAuth><App/></RequireAuth>,

    },
    {
        path: 'login',
        element: <Login/>
    }
])


createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
)
