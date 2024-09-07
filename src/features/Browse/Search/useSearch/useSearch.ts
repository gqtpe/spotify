import {useActions, useAppSelector} from "../../../Application/hooks";
import {browseActions} from "../../index.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {ChangeEvent, useCallback, useEffect, useState} from "react";


export const useSearch = (navigate: ReturnType<typeof useNavigate>) =>{
    const location = useLocation()

    const [value, setValue] = useState('')
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null)
    const activeTab = useAppSelector(state => state.browse.activeTab)
    const {browse} = useActions(browseActions)
    //
    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const activeTab = location.pathname.split('/')[3] // all tab not shown in address bar
        const query = e.target.value

        if (!query && activeTab) {
            navigate('/search/')
        } else {
            navigate(`/search/${query}${activeTab ? '/' + activeTab : ''}`);
        }
        setValue(query)
    }, [location.pathname])

    const handleSearch = useCallback((query: string) => {
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
                setValue(query)
            }

        }
    }, [location.pathname])

    useEffect(() => {
        if (value) {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            const newTimeoutId = setTimeout(() => {
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
    }, [value, activeTab])


    return {value, onChange, onFocus}
}