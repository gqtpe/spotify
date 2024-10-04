import {Episode, Track} from "../../api/spotifyAPI.ts";

type RepeatState = 'off' | 'track' | 'context';
interface PlayerBackState {
    device: Device
    repeat_state: RepeatState
    shuffle_state: boolean
    context:null
    timestamp: number
    progress_ms: number
    is_playing: boolean
    item: Track | Episode
    actions: {
        interrupting_playback: boolean
        pausing: boolean
        resuming: boolean
        seeking: boolean
        skipping_next: boolean
        skipping_prev: boolean
        toggling_repeat_context: boolean
        toggling_shuffle: boolean
        toggling_repeat_track: boolean
        transferring_playback: boolean
    }
}

type DeviceType = 'computer' | 'smartphone' | 'speaker';

interface Device {
    id: string
    is_active: boolean
    is_private_session: boolean
    is_restricted: boolean
    name: string
    type: DeviceType
    volume_percent: number
    supports_volume: boolean
}


export type {
    PlayerBackState
}