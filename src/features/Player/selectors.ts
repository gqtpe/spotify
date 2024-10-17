import {AppRootStateType} from "../Application/types.ts";

export const selectIsPlaying = (state: AppRootStateType) => state.player.playback?.is_playing
export const selectPlayerItem = (state: AppRootStateType) => state.player.playback?.item
export const selectPlayback = (state:AppRootStateType) => state.player.playback