import {createRoot} from 'react-dom/client'
import {Provider} from "react-redux";
import {store} from "./app/store.ts";
import App from "./app/App.tsx";
import {createBrowserRouter, Navigate, Outlet, RouterProvider} from "react-router-dom";
import {Login} from "./features/Auth";
import {RequireAuth} from "./common/hoc/RequireAuth.tsx";
import {Home} from "./features/Home/Home.tsx";
import Callback from "./features/callback/Callback.tsx";
import {AllPage, Browse, browseSelectors, BrowseStart, Tracks} from "./features/Browse";
import './index.scss'
import Cards from './common/components/Cards/Cards.tsx';
import Details from "./features/Details/Details.tsx";


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
                path: '/:type/:id',
                element: <RequireAuth><Details/></RequireAuth>,
            },
            {
                path: '/search',
                element: <RequireAuth><Outlet/></RequireAuth>,
                children: [
                    {
                        index: true,
                        element:<BrowseStart/>
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
        {/*<MantineProvider forceColorScheme={'dark'}>*/}
            <RouterProvider router={router}/>
        {/*</MantineProvider>*/}
    </Provider>
)
