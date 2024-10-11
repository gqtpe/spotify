import {useCallback} from "react";


const usePanelActions = () =>{
    const shuffle = useCallback(() =>  {}, [])
    const prev = useCallback(() =>  {}, [])
    const togglePlay = useCallback(() =>  {}, [])
    const next = useCallback(() =>  {}, [])
    const repeat = useCallback(() =>  {}, [])
    return {togglePlay, shuffle, prev, next, repeat}
}

export default usePanelActions;