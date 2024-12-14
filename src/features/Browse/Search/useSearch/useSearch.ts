import {useActions, useAppSelector} from "../../../Application/hooks";
import {browseActions, browseSelectors} from "../../index.ts";
import {ChangeEvent, useCallback, useEffect, useState} from "react";

export const useSearch = (navigate: (path: string) => void) => {
    const query = useAppSelector(browseSelectors.selectQuery)
    const activeTab = useAppSelector(browseSelectors.selectActiveTab)
    const {setQuery} = useActions(browseActions)
    //---
    const [value, setValue] = useState(()=>query)
    const [timeoutID, setTimeoutID] = useState<string | number | NodeJS.Timeout | undefined>( undefined)
    //---

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }, [setValue])
    const handleSubmit = useCallback((value: string) => {
        navigate(`/search/${value}${activeTab==='all'?'':'/' + activeTab}`)
        setQuery(value)
    },[activeTab, navigate, setQuery])

    useEffect(() => {
        if(timeoutID){
            clearTimeout(timeoutID)
        }
        if (value) {
            const currID = setTimeout(() => {
                handleSubmit(value)
            }, 500)
            setTimeoutID(currID)
            return () => clearTimeout(timeoutID)
        }else{
            const currID = setTimeout(() => {
                setValue('')
                setQuery('')
                navigate('/search')
            }, 500)
            setTimeoutID(currID)
            return () => clearTimeout(timeoutID)
        }
    }, [value])

    return {value, onChange}
}