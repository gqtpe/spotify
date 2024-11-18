import {useCallback} from "react";
import {playerActions} from "../index.ts";
import {useActions, useAppSelector} from "../../Application/hooks";
import {PlayParamTypes} from "../playerSlice.ts";

type PlayParam = | {
    type: 'playlist' | 'album'
    context_uri: string
    offset?: {
        position: number
    }
} | {
    type: 'track' | 'episode'
    uris: string[]
    position?: number
} | {
    type: 'artist' | 'show'
    context_uri: string
}
const usePlayAction = () => {
    const {play, fetchCurrentlyPlaying} = useActions(playerActions)
    const device = useAppSelector(state => state.player.playback.activeDevice)

    return useCallback(async (args: PlayParam) => {
        const params: PlayParamTypes = {
            ...args,
            deviceID: device?.id,
        };
        await play(params);
        setTimeout(()=> fetchCurrentlyPlaying(),1000)
    }, [play, device]);

}
export default usePlayAction