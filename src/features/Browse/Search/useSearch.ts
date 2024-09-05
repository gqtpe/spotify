import {browseActions} from "../index.ts";
import {ChangeEvent, useCallback, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {appHooks} from "../../Application";

export const useSearch = () => {
    const {useActions, useAppSelector} = appHooks
    // TODO: Add synchronization of search logic with the address bar
    const activeTab = useAppSelector(state=>state.browse.activeTab)
    const {browse} = useActions(browseActions)
    const [value, setValue] = useState('')
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null)
    //rrd
    const navigate = useNavigate()
    const location = useLocation()

    console.log(location)
    const onFocus = useCallback(() => {
        if (!location.pathname.includes('/search')) {
            navigate('/search');
        }
    }, [location, navigate])

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value
        setValue(query)
        navigate(`/search/${query}`);
    }, [])


    useEffect(() => {
        if (location.pathname.includes('/search')) {
            const query = location.pathname.split('/')[2]
            setValue(query)
        }
    }, [])

    useEffect(() => {
        if (value) {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            const newTimeoutId = setTimeout(() => {
                browse({query: value, tab: activeTab})
            }, 1000)
            setTimeoutId(newTimeoutId)
        }
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
        }
    }, [value, browse, activeTab])

    return {value, onChange, onFocus}
}