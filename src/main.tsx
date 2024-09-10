import {createRoot} from 'react-dom/client'
import {Provider} from "react-redux";
import {store} from "./app/store.ts";
import {createBrowserRouter, Navigate, Outlet, RouterProvider} from "react-router-dom";
import App from './app/App.tsx'
import {Login} from "./features/Auth";
import {RequireAuth} from "./common/hoc/RequireAuth.tsx";
import {Home} from "./features/Home/Home.tsx";
import Callback from "./features/callback/Callback.tsx";
import {MantineProvider} from "@mantine/core";
import {Browse, Playlists, Tracks} from "./features/Browse";
import './index.scss'


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
                element: <RequireAuth><Outlet/></RequireAuth>,
                children: [
                    {
                        index: true,
                        element: <div>Start searching please BOOOOM</div>
                    },
                    {
                        path: '/search/:query',
                        element: <RequireAuth><Browse/></RequireAuth>,
                        children: [
                            {
                                index: true,
                                element: <div>all</div>
                            },
                            {
                                path: '/search/:query/track',
                                element: <Tracks/>
                            },
                            {
                                path: '/search/:query/artist',
                                element: <div>artists</div>
                            },
                            {
                                path: '/search/:query/album',
                                element: <div>albums</div>
                            },
                            {
                                path: '/search/:query/playlist',
                                element: <Playlists/>
                            }
                        ]
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
        <MantineProvider forceColorScheme={'dark'}>
            <RouterProvider router={router}/>
        </MantineProvider>
    </Provider>
)
