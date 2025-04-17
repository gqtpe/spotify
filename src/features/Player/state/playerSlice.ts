import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Track} from "@/api/types/track.ts";
import type {Device, PlayerBackState, RepeatState} from "../types.ts";
import {RequestStatuses} from "@/api/types/common.ts";
import playerThunks from "./thunks/playerThunks.ts";
import playbackThunks from "./thunks/playbackThunks.ts";
import queueThunks from "./thunks/queueThunks.ts";

export type PlayerStateType = {
    playback: {
        activeDevice: ActiveDevice | null
        isPlaying: boolean
        shuffleState: boolean
        repeatState: RepeatState
        progress: null | number
        duration: null | number
    }
    item: Track | null
    queue: Array<Track>
    availableDevices:{
        items: Device[]
        loading: RequestStatuses
    }
    playbackLoading: RequestStatuses
}
const initialState: PlayerStateType = {
    playback: {
        activeDevice: null,
        isPlaying: false,
        shuffleState: false,
        repeatState: 'off',
        progress: null,
        duration: null
    },
    item: null,
    queue: [],
    availableDevices: {
        items: [],
        loading: 'idle',
    },
    playbackLoading: 'idle',
}
//todo: tests
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
                    state.playback.duration = action.payload.item.duration_ms
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
            const activeDevice = action.payload.find(d=>d.is_active)
            if(state.playback && activeDevice){
                state.playback.activeDevice = {
                    id: activeDevice.id,
                    name: activeDevice.name,
                }
                state.availableDevices.items = action.payload.filter(d => d.id !== activeDevice.id)
            }else{
                state.availableDevices.items = action.payload
            }

            state.availableDevices.loading = 'succeeded'
        })
        builder.addCase(playbackThunks.transferPlayback.fulfilled, (state, action)=>{
            const selectedDevice = state.availableDevices.items.find(t=>t.id === action.payload)
            // state.availableDevices.items = state.availableDevices.items.filter(d => d.id !== action.payload)
            if(selectedDevice){
                state.playback.activeDevice = selectedDevice
            }
        })
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