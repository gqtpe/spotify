import './App.scss'
import {Outlet} from "react-router-dom";
import Badge from "../common/components/Badge/Badge.tsx";
import {IoIosNotificationsOutline} from "react-icons/io";
import {useInit} from './useInit.ts';
import {Header} from "../common/components/Header/Header.tsx";
import {Footer} from "../features/Player";
import {Library} from "../features/Library";

function App() {
    console.log('APP')
    const {isInitialized, user} = useInit()
    //todo:
    // 1.1: move query to rtk
    // 1.2: add loading logic for fetching search data,
    // 1.3: query is changed? clear items
    // 1.4: add pagination
    // 1.5: add requesting items while scrolling
    // 1.6: space is space
    // 2.0: add simple search
    // 2.1: add simplified card( for tracks, playlists, albums, artists)
    // 2.2: nav panel with user saved playlists
    // 2.2.1: simple search
    // 2.3:
    // 3.1: add player slice
    // 3.?: realize player with rtk
    // 4.1: /playlist/:id page
    // 4.?: analogous pages for tracks, albums, artists
    // 5.1: sticky TabGroup
    // 5.2: sticky songs table header
    //
    if (!isInitialized) {
        return <div className="loader"/>
    }

    return (
        <div className="app">
            <Header/>
            <div className="user-panel">
                <Badge variant="icon"><IoIosNotificationsOutline/></Badge>
                <Badge variant="filled"><img src={user?.images[0].url} alt="user-avatar"/></Badge>
            </div>
            <nav>
                <Library/>
            </nav>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}

export default App
