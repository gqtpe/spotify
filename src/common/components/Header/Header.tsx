import Badge from "../Badge/Badge.tsx";
import {Search, useSearch} from "../../../features/Browse";
import {useCallback, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {GoHomeFill} from "react-icons/go";
import {IoIosNotificationsOutline} from "react-icons/io";
import {useAppSelector} from "../../../features/Application/hooks";
import {createPortal} from "react-dom";
import Modal from "../Modal/Modal.tsx";
import Paper from "../Modal/Paper.tsx";

export const Header = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [open, setOpen] = useState<boolean>(false)
    const {value, onChange} = useSearch(navigate)
    const onFocus = useCallback(() => {
        if (!location.pathname.includes('/search')) {
            console.log('navigate')
            navigate('/search');
        }
    }, [navigate, location.pathname])
    const handleClick = useCallback(() => {
        navigate('/')
    }, [])
    const user = useAppSelector(state => state.auth.user)
    const anchorEl = useRef<HTMLDivElement>(null)
    return <>
        <header className="header">
            <Badge variant="filled" onClick={handleClick}><GoHomeFill/></Badge>
            <Search
                width={25}
                placeholder={'What do you want to play?'}
                onFocus={onFocus}
                value={value ? value : undefined}
                onChange={onChange}
            />
        </header>
        <div className="user-panel">
            <Badge variant="icon" onClick={() =>setOpen((prev: boolean) => !prev)} ref={anchorEl}><IoIosNotificationsOutline/></Badge>
            {open && anchorEl.current && createPortal(<Modal
                anchorEl={anchorEl.current}
                placement="bottom-end"
                margin={24}
            >
                <Paper>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, deserunt doloribus et libero magni
                    nulla rem sed voluptas voluptatibus. Consequatur dolor excepturi laborum nam, nisi nobis nulla
                    obcaecati temporibus totam.
                </Paper>
            </Modal>, document.getElementById('portal')!)}
            <Badge variant="filled"><img src={user?.images[0].url} alt="user-avatar"/></Badge>
        </div>
    </>
}

