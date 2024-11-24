import './App.scss'
import {Outlet} from "react-router-dom";
import {useInit} from './useInit.ts';
import {Header} from "../features/Header/Header.tsx";
import {Footer} from "../features/Player";
import {Library} from "../features/Library";

function App() {
    console.log('APP')
    const {isInitialized} = useInit()
    //todo:
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
