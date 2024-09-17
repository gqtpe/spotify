import {createRoot} from 'react-dom/client'
import {Provider} from "react-redux";
import {MantineProvider} from "@mantine/core";
import {store} from "./app/store.ts";
import App from "./app/App.tsx";
import {createBrowserRouter, Navigate, Outlet, RouterProvider} from "react-router-dom";
import {Login} from "./features/Auth";
import {RequireAuth} from "./common/hoc/RequireAuth.tsx";
import {Home} from "./features/Home/Home.tsx";
import Callback from "./features/callback/Callback.tsx";
import {AllPage, Browse, browseSelectors, Tracks} from "./features/Browse";
import './index.scss'
import Cards from './common/components/Cards/Cards.tsx';


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
                                element: <AllPage/>
                            },
                            {
                                path: '/search/:query/track',
                                element: <Tracks/>
                            },
                            {
                                path: '/search/:query/artist',
                                element: <Cards selector={browseSelectors.selectArtists}/>
                            },
                            {
                                path: '/search/:query/album',
                                element: <Cards selector={browseSelectors.selectAlbums}/>
                            },
                            {
                                path: '/search/:query/playlist',
                                element: <Cards selector={browseSelectors.selectPlaylists}/>
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
