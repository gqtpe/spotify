import {useActions, useAppSelector} from "../../../Application/hooks";
import {browseActions} from "../../index.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {ChangeEvent, useCallback, useEffect, useState} from "react";


export const useSearch = (navigate: ReturnType<typeof useNavigate>) =>{
    const location = useLocation()

    const [value, setValue] = useState('')
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null)
    const activeTab = useAppSelector(state => state.browse.activeTab)
    const {browse,clearItems} = useActions(browseActions)
    //
    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
         // all tab not shown in address bar
        const query = e.target.value
        if(!query){
            navigate('/search/')
        }

        setValue(query)
    }, [location.pathname, navigate])

    const handleSearch = useCallback((query: string) => {
        if(!query) return
        browse({query, tab: activeTab})
    }, [browse, activeTab])

    const onFocus = useCallback(() => {
        if (!location.pathname.includes('/search')) {
            navigate('/search');
        }
    }, [location, navigate])


    useEffect(() => {
        if (location.pathname.includes('/search')) {
            const query = location.pathname.split('/')[2]
            if (query) {
                setValue(query.replace('%20', ' '))
            }

        }
    }, [])

    useEffect(() => {
        if (value) {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            const newTimeoutId = setTimeout(() => {
                clearItems();
                navigate(`/search/${value}${activeTab !== 'all' ? '/' + activeTab : ''}`);
                handleSearch(value)
                // browse({query: value, tab: activeTab})
            }, 1000)
            setTimeoutId(newTimeoutId)
        }
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
        }
    }, [value])
    useEffect(()=>{
        handleSearch(value)
    },[activeTab])

    return {value, onChange, onFocus}
}