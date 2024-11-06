import {AppRootStateType} from "../Application/types.ts";

export const selectIsPlaying = (state: AppRootStateType) => state.player.isPlaying

export const selectPlaybackItem = (state: AppRootStateType) =>state.player.item

export const selectQueue = (state: AppRootStateType) => state.player.queue

export const selectShuffleState = (state: AppRootStateType) => state.player.shuffleState

export const selectActiveDevice = (state: AppRootStateType) => state.player.activeDevice

export const selectRepeatState = (state: AppRootStateType) => state.player.repeatState

export const selectProgress = (state: AppRootStateType) => state.player.progress