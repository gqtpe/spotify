import {beforeEach, describe, expect, test} from "vitest";
import {ActiveDevice, PlayerStateType} from "../playerSlice.ts";
import {playerActions, playerReducer} from "../../index.ts";
import {RequestStatuses} from "../../../../api/types/common.ts";
import {playbackMock} from "../../utils/mockData.ts";

const {
    setDeviceID,
    fetchPlaybackState,
    fetchCurrentlyPlaying,
    setShuffle,
    setRepeat,
  /*  seekPosition,
    fetchDevices,
    fetchQueue,
    addToQueue,
    play,
    transferPlayback,
    next,
    previous,
    resume,
    pause,*/
} = playerActions
let startState: PlayerStateType;
beforeEach(() => {
    startState = {
        playback: {
            activeDevice: null,
            isPlaying: false,
            shuffleState: false,
            repeatState: 'off',
            progress: null,
        },
        item: null,
        queue: [],
        availableDevices: {
            items: [],
            loading: 'idle',
        },
        playbackLoading: 'idle',
    }
})
describe('playerSlice synchronous action setDeviceID', () => {
    test("should set active device", () => {
        const activeDevice: ActiveDevice = {
            id: '1234567',
            name: 'test',
        }
        const endState = playerReducer(startState, setDeviceID({deviceID: activeDevice}))
        expect(endState.playback.activeDevice).toEqual(activeDevice)
    })
})
describe('playerSlice asynchronous actions', () => {
    describe("fetchPlaybackState", () => {
        test("while pending should change playbackLoading", () => {
            const endState = playerReducer(startState, fetchPlaybackState.pending('request-id', undefined))
            expect(endState.playbackLoading).toBe('loading' as RequestStatuses)
        })
        test("after fulfilled should set playback", () => {
            const endState = playerReducer(startState, fetchPlaybackState.fulfilled(playbackMock, 'request-id', undefined))

            expect(endState.playback.activeDevice?.id).toBe(playbackMock.device.id)
            expect(endState.playback.activeDevice?.name).toBe(playbackMock.device.name)
            expect(endState.playback.progress).toBe(playbackMock.progress_ms)
            expect(endState.playback.shuffleState).toBe(playbackMock.shuffle_state)
            expect(endState.playback.isPlaying).toBe(playbackMock.is_playing)
            expect(endState.playback.repeatState).toBe(playbackMock.repeat_state)
        })
    })
    test("fetchCurrentlyPlaying have to update playback properties", () => {
        const endState = playerReducer(startState, fetchCurrentlyPlaying.fulfilled(playbackMock, 'request-id', undefined))
        expect(endState.item).toEqual(playbackMock.item)
        expect(endState.playback.progress).toBe(playbackMock.progress_ms)
        expect(endState.playback.isPlaying).toBe(playbackMock.is_playing)
    })
    test("setShuffle", () => {
        const endState = playerReducer(startState, setShuffle.fulfilled({
            state: true,
            id: 'ssss'
        }, 'request-id', {state: true, deviceID: 'ssss'}))
        expect(endState.playback.shuffleState).toBe(true)
    })
    test("setRepeat", () => {
        const endState = playerReducer(startState, setRepeat.fulfilled({
            repeat_state: 'track',
            id: 'ssss'
        }, 'request-id', {repeat_state: 'track', deviceID: 'ssss'}))
        expect(endState.playback.repeatState).toBe('track')
    })
    //
    // describe("pause", () => {
    //
    // })
    // describe("resume", () => {
    //
    // })
    // describe("fetchDevices", () => {
    //
    // })
    // describe("transferPlayback", () => {
    //
    // })
    // describe("fetchQueue", () => {
    //
    // })


})