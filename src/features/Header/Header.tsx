import Badge from "../../common/components/Badge/Badge.tsx";
import {Search, useSearch} from "../Browse";
import {useCallback} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {GoHomeFill} from "react-icons/go";
import UserPanel from "./UserPanel.tsx";

export const Header = () => {
    const navigate = useNavigate()
    const location = useLocation()
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
        <UserPanel/>
    </>
}

