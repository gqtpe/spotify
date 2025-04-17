import "./Header.scss";
import {useCallback} from "react";
import {browseSelectors, Search, useSearch} from "@/features/Browse";
import {useAppSelector} from "../../hooks";
import Badge from "@/common/components/Badge/Badge.tsx";
import UserPanel from "./UserPanel.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {GoHomeFill} from "react-icons/go";

export const Header = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const {value, onChange} = useSearch(navigate)
    const query = useAppSelector(browseSelectors.selectQuery)
    const onFocus = useCallback(() => {
        //why !includes, for prevent endless /search navigate
        if (!location.pathname.includes('/search/')) {
            navigate(`/search${query ? '/' + query : ''}`);
        }
    }, [navigate, location.pathname, query])
    const handleClick = useCallback(() => {
        navigate('/')
    }, [])

    return <header className="header">
        <div className="header__searchbar">
            <Badge className="header__home" variant="filled" onClick={handleClick}><GoHomeFill/></Badge>
            <Search
                placeholder={'What do you want to play?'}
                onFocus={onFocus}
                value={value ? value : undefined}
                onChange={onChange}
            />
        </div>
        <UserPanel/>
    </header>

}

