import Badge from "../../../../common/components/Badge/Badge.tsx";
import {browseSelectors, Search, useSearch} from "../../../Browse";
import {useCallback} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {GoHomeFill} from "react-icons/go";
import UserPanel from "./UserPanel.tsx";
import {useAppSelector} from "../../hooks";

export const Header = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const {value, onChange} = useSearch(navigate)
    const query = useAppSelector(browseSelectors.selectQuery)
    const onFocus = useCallback(() => {
        //why !includes, for prevent endless /search navigate
        if (!location.pathname.includes('/search/')) {
            navigate(`/search${query?'/' + query : ''}`);
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

