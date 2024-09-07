import Badge from "../Badge/Badge.tsx";
import {Search, useSearch} from "../../../features/Browse";
import {useCallback} from "react";
import {AiFillHome} from "react-icons/ai";
import {useNavigate} from "react-router-dom";


export const Header = () => {
    const navigate = useNavigate()

    const {value, onChange, onFocus} = useSearch(navigate)
    const handleClick = useCallback(() => {
        navigate('/')
    }, [navigate])
    return <header className="header">
        <Badge variant="filled" onClick={handleClick}><AiFillHome/></Badge>
        <Search
            width={25}
            placeholder={'What do you want to play?'}
            bindToAddressBar={true}
            onFocus={onFocus}
            value={value}
            onChange={onChange}
        />
    </header>
}

