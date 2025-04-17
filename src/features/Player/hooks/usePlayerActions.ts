import {useCallback} from "react";
import {useActions} from "../../Application/hooks";
import {playerActions} from "../index.ts";
import type {RepeatState} from "../types.ts";
import type {ActiveDevice} from "../state/playerSlice.ts";


const usePlayerActions = (activeDevice: ActiveDevice, shuffleState: boolean, is_playing: boolean, repeatState: RepeatState) => {
    const {
        pause,
        resume,
        setRepeat,
        next,
        fetchCurrentlyPlaying,
        previous,
        setShuffle,
    } = useActions(playerActions)

    const shuffle = useCallback(() => {
        if (shuffleState) {
            setShuffle({state: false, deviceID: activeDevice.id})
        } else {
            setShuffle({state: true, deviceID: activeDevice.id})
        }
    }, [activeDevice, setShuffle, shuffleState])
    const prev = useCallback(async () => {
        const action = await previous(activeDevice.id);
        if (playerActions.previous.fulfilled.match(action)) {
            await fetchCurrentlyPlaying()
        }
    }, [previous, activeDevice])
    const togglePlay = useCallback(() => {
        if (is_playing) {
            pause(activeDevice.id)
        } else {
            resume(activeDevice.id)
        }
        fetchCurrentlyPlaying()
    }, [is_playing, activeDevice])
    const skip = useCallback(async () => {
        const action = await next(activeDevice.id);
        if (playerActions.next.fulfilled.match(action)) {
            await fetchCurrentlyPlaying()
        }
    }, [next, activeDevice])
    const repeat = useCallback(() => {
        if (repeatState === "off") {
            setRepeat({repeat_state: "context", deviceID: activeDevice.id})
        } else if (repeatState === "context") {
            setRepeat({repeat_state: "track", deviceID: activeDevice.id})
        } else {
            setRepeat({repeat_state: "off", deviceID: activeDevice.id})
        }
    }, [activeDevice, repeatState, setRepeat])

    return {togglePlay, shuffle, prev, next: skip, repeat}
}


export default usePlayerActions;