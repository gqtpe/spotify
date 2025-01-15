import {useCallback} from "react";
import {useActions} from "../../Application/hooks";
import {playerActions} from "../index.ts";
import {ActiveDevice} from "../state/playerSlice.ts";
import {RepeatState} from "../types.ts";


const usePlayerActions = (device: ActiveDevice | null, shuffleState: boolean, is_playing: boolean, repeatState: RepeatState) => {
    const {pause, resume, setRepeat, next, fetchCurrentlyPlaying, previous, setShuffle} = useActions(playerActions)

    const shuffle = useCallback(() => {
        if (device) {
            if (shuffleState) {
                setShuffle({state: false, deviceID: device.id})
            } else {
                setShuffle({state: true, deviceID: device.id})
            }
        }
    }, [device, setShuffle, shuffleState])
    const prev = useCallback(async () => {
        if(device){
            await previous(device.id)
            await fetchCurrentlyPlaying()
        }
    }, [previous, device])
    const togglePlay = useCallback(() => {
        if (device) {
            if (is_playing) {
                pause(device.id)
            } else {
                resume(device.id)
            }
            fetchCurrentlyPlaying()
        }
    }, [is_playing, device])
    const skip = useCallback(async () => {
        if(device){
            await next(device.id)
            await fetchCurrentlyPlaying()
        }
    }, [next, device])
    const repeat = useCallback(() => {
        if(device){
            if(repeatState === "off"){
                setRepeat({repeat_state: "context", deviceID: device.id})
            }else if(repeatState === "context"){
                setRepeat({repeat_state: "track", deviceID: device.id})
            }else{
                setRepeat({repeat_state: "off", deviceID: device.id})
            }
        }
    }, [device, repeatState, setRepeat])
    return {togglePlay, shuffle, prev, next: skip, repeat}
}

export default usePlayerActions;