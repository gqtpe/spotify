import React, {useEffect, useRef, useState} from "react";
import {useOnClickOutside} from "../index.ts";

const useContextMenu = () => {
    const [position, setPosition] = useState<{ x: number, y: number } | null>(null)

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault()
        setPosition({x: e.pageX, y: e.pageY})
    }
    useEffect(() => {
        return ()=>{
            setPosition(null)
        }
    },[])
    const anchorEl = useRef<HTMLDivElement>(null);
    useOnClickOutside(anchorEl, () => {
        setPosition(null)
    })
    return {handleContextMenu, position, setPosition, anchorEl}
}

export default useContextMenu;