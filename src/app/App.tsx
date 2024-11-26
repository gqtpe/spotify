import './App.scss'
import {Outlet} from "react-router-dom";
import {useInit} from './useInit.ts';
import {Header} from "../features/Header/Header.tsx";
import {Footer} from "../features/Player";
import {Library} from "../features/Library";
import {useSidebar} from "../features/Application/hooks/useSidebar.ts";
import Aside from "../features/Application/components/Aside/Aside.tsx";

function App() {
    console.log('APP')
    const {isInitialized} = useInit()
    const {open, sidebarContentType} = useSidebar()
    if (!isInitialized) {
        return <div className="loader"/>
    }

    return (
        <div className="app">
            <Header/>

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
