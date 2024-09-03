import {store} from "./app/store.ts";
import {createRoot} from 'react-dom/client'
import App from './app/App.tsx'
import './index.scss'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {Login} from "./features/Auth";
import {Provider} from "react-redux";
import {RequireAuth} from "./common/hoc/RequireAuth.tsx";
import {Home} from "./features/Home/Home.tsx";
import {Browse} from "./features/Browse/Browse.tsx";
import Callback from "./features/callback/Callback.tsx";


const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
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
                element: <RequireAuth><Browse/></RequireAuth>,
                children: [
                    {
                        index:true,
                        element: <div>all</div>
                    },
                    {
                        path: '/search/tracks',
                        element: <div>tracks</div>
                    },
                    {
                        path: '/search/artists',
                        element: <div>artists</div>
                    },
                    {
                        path: '/search/albums',
                        element: <div>albums</div>
                    },
                    {
                        path: '/search/playlists',
                        element: <div>playlists</div>
                    }
                ]
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
