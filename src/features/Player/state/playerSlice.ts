import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Track} from "../../api/types/track.ts";
import type {Device, PlayerBackState, RepeatState} from "./types.ts";
import {RequestStatuses} from "../../api/types/common.ts";
import {
    fetchCurrentlyPlaying,
    fetchDevices,
    fetchPlaybackState,
    pause,
    resume,
    seekPosition,
    setRepeat,
    setShuffle
} from "./playerThunks.ts";
import {Track} from "../../../api/types/track.ts";
import playerThunks from "./thunks/playerThunks.ts";

const initialState = {
    playback: {
        activeDevice: null as ActiveDevice | null,
        isPlaying: false as boolean,
        shuffleState: false as boolean,
        repeatState: 'off' as RepeatState,
        progress: null as null | number,
    },
    item: null as Track | null,
    queue: [] as Array<Track>,
    availableDevices: {
        items: [] as Device[],
        loading: 'idle' as RequestStatuses
    },
    playbackLoading: 'idle' as RequestStatuses
}

const slice = createSlice({
    name: 'player',
    initialState: initialState,
    reducers: {
        setDeviceID(state, action: PayloadAction<{ deviceID: ActiveDevice }>) {
            state.playback.activeDevice = action.payload.deviceID
        }
    },
    extraReducers: builder => {
        builder.addCase(playbackThunks.fetchPlaybackState.pending, state => {
            state.playbackLoading = 'loading'
        })
        builder.addCase(playbackThunks.fetchPlaybackState.fulfilled, (state, action) => {
            if (action.payload) {
                if (action.payload.device.is_active) {
                    state.playback.activeDevice = {id: action.payload.device.id, name: action.payload.device.name}
                }
                state.playback.isPlaying = action.payload.is_playing
                state.playback.shuffleState = action.payload.shuffle_state
                state.playback.repeatState = action.payload.repeat_state
                state.playback.progress = action.payload.progress_ms
                if (action.payload.item.type === 'track') {
                    state.item = action.payload.item
                }
                state.playbackLoading = 'succeeded'
            }
        })
        builder.addCase(playbackThunks.fetchCurrentlyPlaying.fulfilled, (state, action: PayloadAction<PlayerBackState>) => {
            if (action.payload) {
                if (action.payload.item.type === 'track') {
                    state.item = action.payload.item
                    state.playback.progress = action.payload.progress_ms
                    state.playback.isPlaying = action.payload.is_playing
                }
            }
        })


        builder.addCase(playerThunks.setShuffle.fulfilled, (state, action) => {
            state.playback.shuffleState = action.payload.state
        })
        builder.addCase(playerThunks.setRepeat.fulfilled, (state, action) => {
            state.playback.repeatState = action.payload.repeat_state
        })
        builder.addCase(playerThunks.seekPosition.fulfilled, (state, action: PayloadAction<{
            position_ms: number,
            response: string
        }>) => {
            state.playback.progress = action.payload.position_ms
        })
        builder.addCase(playerThunks.pause.fulfilled, (state) => {
            state.playback.isPlaying = false
        })
        builder.addCase(playerThunks.resume.fulfilled, (state) => {
            state.playback.isPlaying = true
        })
        builder.addCase(playbackThunks.fetchDevices.pending, state => {
            state.availableDevices.loading = 'loading'
        })
        builder.addCase(playbackThunks.fetchDevices.fulfilled, (state, action) => {
            state.availableDevices.items = action.payload.filter(d => d.id !== state.playback.activeDevice?.id)
            state.availableDevices.loading = 'succeeded'
        })
        builder.addCase(playbackThunks.transferPlayback.fulfilled, (state, action)=>{
        builder.addCase(queueThunks.fetchQueue.fulfilled, (state, action)=>{
            state.queue = action.payload
        })
    }
})
export type ActiveDevice = {
    id: string
    name: string
}

export default slice