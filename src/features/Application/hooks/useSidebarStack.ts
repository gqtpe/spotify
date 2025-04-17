import {useCallback, useEffect, useState} from "react";
import {useSidebar} from "./useSidebar.ts";
import {StackItem} from "@/app/App.tsx";


const useSidebarStack = () =>{
    const {sidebarContentType, open, closeSidebar} = useSidebar()
    const [stack, setStack] = useState<StackItem[]>([])
    const unshift = useCallback((item: StackItem) => {
        const filteredStack = stack.filter(t=>t.name !== item.name)
        setStack([item, ...filteredStack])
    }, [setStack, stack])

    const removeItem = useCallback((id: string) => {
        const filteredItems = stack.filter(item => item.id !== id)
        setStack(filteredItems)
        if (stack.length === 1) {
            closeSidebar()
        }
    }, [setStack, stack, closeSidebar, stack.length])
    useEffect(() => {
        if (sidebarContentType) {
            const item: StackItem = {id: `${Date.now()}`, name: sidebarContentType}
            unshift(item)
        }
    }, [sidebarContentType]);
    return {stack,removeItem,open}
}

export default useSidebarStack;