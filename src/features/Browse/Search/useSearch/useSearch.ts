import {useActions, useAppSelector} from "../../../Application/hooks";
import {browseActions, browseSelectors} from "../../index.ts";
import {ChangeEvent, useCallback, useState} from "react";

export const useSearch = (navigate: (path: string) => void) => {
    // console.log('useSearch')
    const query = useAppSelector(browseSelectors.selectQuery)
    const activeTab = useAppSelector(browseSelectors.selectActiveTab)
    const {setQuery} = useActions(browseActions)
    //---
    const [value, setValue] = useState(()=>query?query:null)
    const [timeoutID, setTimeoutID] = useState<string | number | NodeJS.Timeout | undefined>( undefined)
    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if(timeoutID){
            clearTimeout(timeoutID)
        }
        if(e.target.value){
            setValue(e.target.value);
            const currID = setTimeout(()=>{
                handleSubmit(e.target.value)
            },500)
            setTimeoutID(currID)
        }else{
            navigate('/search')
            setValue(null)
            setQuery(null)
        }
    }, [timeoutID])
    const handleSubmit = useCallback((value: string) => {
        navigate(`/search/${value}${activeTab==='all'?'':'/' + activeTab}`)
        setQuery(value)
    },[activeTab, navigate, setQuery])

    return {value, onChange}
}