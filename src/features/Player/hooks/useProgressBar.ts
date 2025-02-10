import {useCallback} from "react";
import {useActions, useAppSelector} from "../../Application/hooks";
import {playerActions, playerSelectors} from "../index.ts";


const useProgressBar = () => {
    const {seekPosition,fetchCurrentlyPlaying} = useActions(playerActions)
    const activeDevice = useAppSelector(playerSelectors.selectActiveDevice)
    const progress = useAppSelector(playerSelectors.selectProgress)
    const duration = useAppSelector(playerSelectors.selectDuration)
    const onSeekEnd = useCallback(() =>{
        debugger;
        fetchCurrentlyPlaying()
    },[])
    const callback = useCallback((position_ms: number) => {
        if(!activeDevice){
            return
        }
        seekPosition({position_ms: position_ms, deviceID: activeDevice.id})
    }, [activeDevice])
    return {onSeek:callback,onSeekEnd, progress, duration}
}
export default useProgressBar;