import Badge from "../Badge/Badge.tsx";
import {Search, useSearch} from "../../../features/Browse";
import {useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {GoHomeFill} from "react-icons/go";

export const Header = () => {
    const navigate = useNavigate()

    const {value, onChange, onFocus} = useSearch(navigate)
    const handleClick = useCallback(() => {
        navigate('/')
    }, [navigate])
    return <header className="header">
        <Badge variant="filled" onClick={handleClick}><GoHomeFill/></Badge>
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

