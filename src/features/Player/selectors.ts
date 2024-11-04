import {AppRootStateType} from "../Application/types.ts";

export const selectIsPlaying = (state: AppRootStateType) => state.player.playback?.is_playing
export const selectPlayerItem = (state: AppRootStateType) => state.player.playback?.item
export const selectPlayback = (state:AppRootStateType) => state.player.playback
export const selectIsPlaying = (state: AppRootStateType) => state.player.isPlaying

export const selectPlaybackItem = (state: AppRootStateType) =>state.player.item

export const selectQueue = (state: AppRootStateType) => state.player.queue

export const selectShuffleState = (state: AppRootStateType) => state.player.shuffleState
