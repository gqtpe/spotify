import React, {useCallback, useRef, useState} from "react";
import {useOnClickOutside} from "../index.ts";
import {createPortal} from "react-dom";
import {MenuType, Option} from "./types.ts";
import Menu from "../../components/Menu/Menu.tsx";
import {MdOutlinePlaylistAdd} from "react-icons/md";
import MenuItem from "../../components/Menu/MenuItem/MenuItem.tsx";

const allOptions: Option[] = [
    {id: 'addToYourLibrary', title: 'Add To YourLibrary', availableFor: ['album', 'playlist']},
    {
        id: 'addToQueue',
        title: 'Add to queue',
        availableFor: ['album', 'playlist', 'track'],
        icon: <MdOutlinePlaylistAdd/>
    },
    {id: 'addToPlaylist', title: 'Add to playlist', availableFor: ['track']},
    {id: 'removeFromYourLibrary', title: 'Remove From Your library', availableFor: ['playlist', 'playlist']},
    {id: 'removeFromYourLibrary', title: 'Remove From Your library', availableFor: ['playlist', 'playlist']},
]
const useContextMenu = (type: MenuType) => {
    const [position, setPosition] = useState<{ x: number, y: number } | null>(null)
    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault()
        console.log(`${e.pageX} ${e.pageY}`)
        setPosition({x: e.pageX, y: e.pageY})
    }
    const anchorEl = useRef<HTMLDivElement>(null);
    useOnClickOutside(anchorEl, () => {
        setPosition(null)
    })
    const renderMenu = useCallback(() => {
        console.log(type)
        if (!position) return null;

        return createPortal(
            <Menu sx={{position: 'absolute', top: position.y, left: position.x}} ref={anchorEl}>
                {allOptions.map(o => {
                    return <MenuItem title={o.title} key={o.id} icon={o.icon}/>
                })}
            </Menu>, document.getElementById("portal-menu")!)
    }, [position])
