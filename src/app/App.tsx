import './App.scss'
import {Outlet} from "react-router-dom";
import {useInit} from './useInit.ts';
import {Header} from "../features/Application/components/Header/Header.tsx";
import {Footer} from "../features/Player";
import {Library} from "../features/Library";
import {RequireAuth} from "../common/hoc/RequireAuth.tsx";
import {Toaster} from "react-hot-toast";
import {SidebarContent} from "../features/Application/appSlice.ts";
import Sidebar from "../features/Application/components/Sidebar/Sidebar.tsx";
import {useSidebarStack} from "../features/Application/hooks";

export type StackItem = {
    id: string
    name: SidebarContent
}

function App() {
    console.log('APP')
    const {isInitialized} = useInit()
    const {stack, removeItem, open} = useSidebarStack()

    if (!isInitialized) {
        return <div className="loader"/>
    }
    return (
        <div className="app">
            <Toaster
                position="bottom-center"
                reverseOrder={false}
                containerStyle={{
                    bottom: `calc(0.5rem + 80px)`,
                }}
                toastOptions={{
                    style: {
                        padding: '0.3rem',
                        fontSize: '0.90rem',
                    },
                    duration: 5000,
                }}
            />
            <RequireAuth><Header/></RequireAuth>
            <nav>
                <Library/>
            </nav>
            <div className="content">
                <main>
                    <Outlet/>
                </main>
                {open && <Sidebar stackArray={stack} removeItem={removeItem}/>}
            </div>
            <Footer/>
        </div>
    )
}

export default App
