import {createBrowserRouter, Navigate, Outlet} from "react-router-dom";
import App from "./App.tsx";
import {RequireAuth} from "../common/hoc/RequireAuth.tsx";
import {Home} from "../features/Home/Home.tsx";
import Details from "../features/Details/Details.tsx";
import {AllPage, Browse, browseSelectors, BrowseStart, Tracks} from "../features/Browse";
import Cards from "../common/components/Cards/Cards.tsx";
import {Login} from "../features/Auth";
import Callback from "../features/callback/Callback.tsx";
import GenrePage from "../features/Browse/Genres/Genre/GenrePage.tsx";

//todo: lazy component loading(suspense)

export const router = createBrowserRouter([
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
              path: 'genre/:id',
              element: <RequireAuth><GenrePage/></RequireAuth>,
            },
            {
                path: '/search',
                element: <RequireAuth><Outlet /></RequireAuth>,
                children: [
                    {
                        index: true,
                        element: <BrowseStart />
                    },
                    {
                        path: ':query/:tab?',
                        element: <RequireAuth><Browse /></RequireAuth>,
                        children: [
                            {
                                index: true,
                                element: <AllPage />
                            },
                            {
                                path: 'tracks',
                                element: <Tracks />
                            },
                            {
                                path: 'artists',
                                element: <Cards selector={browseSelectors.selectArtists} />
                            },
                            {
                                path: 'albums',
                                element: <Cards selector={browseSelectors.selectAlbums} />
                            },
                            {
                                path: 'playlists',
                                element: <Cards selector={browseSelectors.selectPlaylists} />
                            }
                        ]
                    }
                ]
            },
            {
                path: '/:type/:id',
                element: <RequireAuth><Details/></RequireAuth>,
            },

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