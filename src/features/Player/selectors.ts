import {AppRootStateType} from "../Application/types.ts";

export const selectIsPlaying = (state: AppRootStateType) => state.player.playback.isPlaying

export const selectPlaybackItem = (state: AppRootStateType) =>state.player.item

export const selectQueue = (state: AppRootStateType) => state.player.queue

export const selectPlaybackLoading = (state: AppRootStateType) =>state.player.playbackLoading

export const selectShuffleState = (state: AppRootStateType) => state.player.playback.shuffleState

export const selectActiveDevice = (state: AppRootStateType) => state.player.playback.activeDevice

export const selectRepeatState = (state: AppRootStateType) => state.player.playback.repeatState

export const selectProgress = (state: AppRootStateType) => state.player.playback.progress

export const selectAvailableDevices = (state: AppRootStateType) => state.player.availableDevices.items

export const selectAvailableDevicesLoading = (state: AppRootStateType) => state.player.availableDevices.loading