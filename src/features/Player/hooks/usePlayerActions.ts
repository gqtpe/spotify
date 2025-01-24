import {useCallback} from "react";
import {useActions} from "../../Application/hooks";
import {playerActions} from "../index.ts";
import {ActiveDevice} from "../state/playerSlice.ts";
import {RepeatState} from "../types.ts";


const usePlayerActions = (device: ActiveDevice | null, shuffleState: boolean, is_playing: boolean, repeatState: RepeatState) => {
    const {pause, resume, setRepeat, next, fetchCurrentlyPlaying, previous, setShuffle} = useActions(playerActions)

    const shuffle = useCallback(() => {
        if (shuffleState) {
            setShuffle({state: false, deviceID: activeDeviceID})
        } else {
            setShuffle({state: true, deviceID: activeDeviceID})
        }
    }, [activeDeviceID, setShuffle, shuffleState])
    const prev = useCallback(async () => {
        const action = await previous(activeDeviceID);
        if (playerActions.previous.fulfilled.match(action)) {
            await fetchCurrentlyPlaying()
        }
    }, [previous, device])
    const togglePlay = useCallback(() => {
        if (is_playing) {
            pause(activeDeviceID)
        } else {
            resume(activeDeviceID)
        }
        fetchCurrentlyPlaying()
    }, [is_playing, activeDeviceID])
    const skip = useCallback(async () => {
        if(device){
            await next(device.id)
            await fetchCurrentlyPlaying()
        }
    }, [next, device])
    const repeat = useCallback(() => {
        if (repeatState === "off") {
            setRepeat({repeat_state: "context", deviceID: activeDeviceID})
        } else if (repeatState === "context") {
            setRepeat({repeat_state: "track", deviceID: activeDeviceID})
        } else {
            setRepeat({repeat_state: "off", deviceID: activeDeviceID})
        }
    }, [device, repeatState, setRepeat])
    return {togglePlay, shuffle, prev, next: skip, repeat}
    const callback = useCallback((position_ms: number) => {
        seekPosition({position_ms: position_ms, deviceID: activeDeviceID})
    }, [activeDeviceID])
    return {togglePlay, shuffle, prev, next: skip, repeat, seekPosition: callback}
}

export default usePlayerActions;