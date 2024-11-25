import './App.scss'
import {Outlet} from "react-router-dom";
import {useInit} from './useInit.ts';
import {Header} from "../features/Header/Header.tsx";
import {Footer} from "../features/Player";
import {Library} from "../features/Library";

function App() {
    console.log('APP')
    const {isInitialized} = useInit()
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
