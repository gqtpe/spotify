import {useActions, useAppSelector} from "../../Application/hooks";
import {playerActions, playerSelectors} from "../index.ts";
import {useCallback} from "react";
import {ActiveDevice} from "../playerSlice.ts";


const useProgress = (device: ActiveDevice | null) => {
    const {seekPosition, fetchCurrentlyPlaying} = useActions(playerActions)
    const progress = useAppSelector(playerSelectors.selectProgress)
    const callback = useCallback((position_ms: number) => {
        if (device) {
            seekPosition({position_ms: position_ms, deviceID: device.id})
        }
    }, [device, seekPosition])
    return {progress, seekPosition: callback, fetchCurrentlyPlaying}
}
export default useProgress