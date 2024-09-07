import './App.scss'
import {Outlet} from "react-router-dom";
import Badge from "../common/components/Badge/Badge.tsx";
import {IoIosNotificationsOutline} from "react-icons/io";
import {useInit} from './useInit.ts';
import {Header} from "../common/components/Header/Header.tsx";

function App() {
    console.log('APP')
    const {isInitialized, user} = useInit()


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
                nav
            </nav>
            <main>
                <Outlet/>
            </main>
            <footer>
                <p>© 2022. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default App
