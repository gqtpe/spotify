import './App.scss'
import {Outlet, useNavigate} from "react-router-dom";
import Search from "../features/Browse/Search/Search.tsx";
import Badge from "../common/components/Badge/Badge.tsx";
import {AiFillHome} from "react-icons/ai";
import {IoIosNotificationsOutline} from "react-icons/io";
import {useActions, useAppSelector} from "../features/Application/hooks";
import {useEffect} from 'react';
import {appActions} from "../features/Application";

function App() {
    console.log('APP')
    const {initializeApp} = useActions(appActions)
    useEffect(() => {
        document.title = 'Spotify'
        setTimeout(()=>{
            initializeApp()
        },500)

    }, [])
    const navigate = useNavigate()
    const user = useAppSelector(state => state.auth.user)
    const handleClick = () => {
        navigate('/home')
    }
    const isInitialized = useAppSelector(state=>state.app.isInitialized)

    if (!isInitialized) {
        return <div className="loader"/>
    }
    return (
        <div className="app">
            <header className="header">
                <Badge variant="filled" onClick={handleClick}><AiFillHome/></Badge>
                <Search width={25}/>
            </header>
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
