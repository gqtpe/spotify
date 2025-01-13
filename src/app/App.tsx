import './App.scss'
import {Outlet} from "react-router-dom";
import {useInit} from './useInit.ts';
import {Header} from "../features/Application/components/Header/Header.tsx";
import {Footer} from "../features/Player";
import {Library} from "../features/Library";
import {useSidebar} from "../features/Application/hooks/useSidebar.ts";
import {RequireAuth} from "../common/hoc/RequireAuth.tsx";
import {Toaster} from "react-hot-toast";
import {useCallback, useEffect, useState} from "react";
import {SidebarContent} from "../features/Application/appSlice.ts";
import Sidebar from "../features/Application/components/Sidebar/Sidebar.tsx";

export type StackItem = {
    id: string
    name: SidebarContent
}
function App() {
    console.log('APP')
    const {isInitialized} = useInit()
    const { sidebarContentType} = useSidebar()
    const [stack, setStack] = useState<StackItem[]>([])

    const unshift = useCallback((item: StackItem) =>{
        setStack([item, ...stack])
    },[setStack,stack])

    const removeItem = useCallback((id: string) =>{
        const filteredItems = stack.filter(item =>item.id !== id)
        setStack(filteredItems)
    },[setStack,stack])
    useEffect(() => {
        if(sidebarContentType){
            const item: StackItem = {id: `${Date.now()}`, name: sidebarContentType}
            unshift(item)
        }
    }, [sidebarContentType]);
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
                {/*{(sidebarContentType === 'devices') && <Aside state={sidebarContentType} close={closeSidebar}>devices</Aside>}*/}
                {/*{(sidebarContentType === 'queue') && <Aside state={sidebarContentType} close={closeSidebar}>queue</Aside>}*/}
                {/*{(sidebarContentType === 'lyrics') && <Aside state={sidebarContentType} close={closeSidebar}>lyrics</Aside>}*/}
                {open && <Sidebar stackArray={stack} removeItem={removeItem}/>}
            </div>

            <Footer/>
        </div>
    )
}

export default App
