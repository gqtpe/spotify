import {Episode} from "../../api/spotifyAPI.ts";
import {Track} from "../../api/types/track.ts";

export type RepeatState = 'off' | 'track' | 'context';
export type ShuffleState = 'off' | 'shuffle' | 'smart';
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
    currently_playing_type: 'track' | 'episode'
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
    PlayerBackState,
    Device
}