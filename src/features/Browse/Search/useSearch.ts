import {useActions, useAppSelector} from "../../Application/hooks";
import {browseActions} from "../index.ts";
import {ChangeEvent, useCallback, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";


export const useSearch = () => {

    // TODO: Add synchronization of search logic with the address bar
    const [value, setValue] = useState('')
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null)
    const {browse} = useActions(browseActions)
    const navigate = useNavigate()
    const location = useLocation()
    const activeTab = useAppSelector(state => state.browse.activeTab)

    const onFocus = useCallback(() =>{
        if (!location.pathname.includes('/search')) {
            navigate('/search' );
        }
    },[location, navigate])

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }, [])

    useEffect(() => {
        // Перезапуск поиска при смене активной вкладки
        if (value) {
            debugger;
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            const newTimeoutId = setTimeout(() => {
                browse(value)
            }, 1000)
            setTimeoutId(newTimeoutId)
        }
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
        }
    }, [activeTab, value, browse]) // Зависимости: активная вкладка, значение поиска

    return {value, onChange, onFocus}
}