import {store} from "./app/store.ts";
import {createRoot} from 'react-dom/client'
import App from './app/App.tsx'
import './index.scss'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Login} from "./features/Auth";
import {Provider} from "react-redux";
import {RequireAuth} from "./common/hoc/RequireAuth.tsx";
import {Home} from "./features/Home/Home.tsx";
import {Browse} from "./features/Browse/Browse.tsx";


const router = createBrowserRouter([
    {
        path: '/',
        element: <RequireAuth><App/></RequireAuth>,
        children: [
            {
                index: true,
                element: <Navigate to="home" replace/>
            },
            {
                path: 'home',
                element: <RequireAuth><Home/></RequireAuth>,
            },
            {
                path: '/search',
                element: <RequireAuth><Browse/></RequireAuth>
            }
        ]
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/callback',
        element: <Callback/>
    }

])


createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
)
