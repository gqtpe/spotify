import {createRoot} from 'react-dom/client'
import App from './app/App.tsx'
import './index.scss'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Login} from "./features/Auth";
import {Provider} from "react-redux";
import {store} from "./app";
import {RequireAuth} from "./app/hoc/RequireAuth.tsx";
import {Home} from "./features/Home/Home.tsx";
import {Browse} from "./features/Browse/Browse.tsx";


const router = createBrowserRouter([
    {
        path: '/',
        element: <RequireAuth><App/></RequireAuth>,
        children: [
            {
                path: 'home',
                element: <Home/>
            },
            {
                path: '/search',
                element: <Browse/>
            }
        ]
    },
    {
        path: '/login',
        element: <Login/>
    },

])


createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
)
