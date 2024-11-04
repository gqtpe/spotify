import {useCallback} from "react";
import {useActions} from "../../Application/hooks";
import {playerActions} from "../index.ts";


const usePanelActions = (is_playing?: boolean) => {
    const {pause, resume, setIsPlaying} = useActions(playerActions)

    const shuffle = useCallback(() => {
        if (device) {
            if (shuffleState) {
                setShuffle({state: false, deviceID: device.id})
            } else {
                setShuffle({state: true, deviceID: device.id})
            }
        }
    }, [device, setShuffle, shuffleState])
    const prev = useCallback(() => {

    }, [])
    const togglePlay = useCallback(() => {
        if (is_playing) {
            pause()
        } else {
            resume()
        }
        setIsPlaying(!is_playing)
    }, [is_playing])
    const next = useCallback(() => {

    }, [])
    const repeat = useCallback(() => {

    }, [])
    return { togglePlay, shuffle, prev, next, repeat}
}

export default usePanelActions;