import {AppSliceInitialStateType, SidebarContent} from "../appSlice.ts";
import {appActions, appReducer} from "../index.ts";
import {beforeEach, describe, expect, test} from 'vitest'
import {SpotifyTokenResponse} from "@/api/spotifyAPI.ts";

const {
    setAppError,
    setAppInitialized,
    openSidebar,
    closeSidebar,
    initializeApp
} = appActions;
let startState: AppSliceInitialStateType;
//
beforeEach(() => {
    startState = {
        error: null,
        isInitialized: false,
        sidebar: {
            isOpen: false,
            content: null,
        }
    }
})
describe("appSlice synchronous actions", () => {
    describe('setAppError',()=> {
        test('should set app error', () => {
            const newValue: string | null = 'Network Error';
            const endState = appReducer(startState, setAppError(newValue))
            expect(endState.error).toBe(newValue);
        })
        test('setAppError should remove app error', () => {
            const endState = appReducer(startState, setAppError(null))
            expect(endState.error).toBe(null);
        })
    })

    describe('setAppInitialized ', () => {
        test('should set is Initialized', () => {
            const newValue: boolean = true;
            const endState = appReducer(startState, setAppInitialized(newValue))
            expect(endState.isInitialized).toBe(newValue);
        })
    })
    describe('openSidebar',() =>{
        test('should set isOpen true, and set its content',()=>{
            const newValue: SidebarContent = 'devices';
            const endState = appReducer(startState, openSidebar({type: newValue}))
            expect(endState.sidebar.content).toBe(newValue);
            expect(endState.sidebar.isOpen).toBeTruthy()
        })
        test('should set isOpen false, and clear content',()=>{
            const endState = appReducer(startState, closeSidebar())
            expect(endState.sidebar.content).toBeNull()
            expect(endState.sidebar.isOpen).toBeFalsy();
        })
    })
})
describe("appSlice async actions", () => {
    describe("initializeApp", () => {
        test("should set isInitialized to true when fulfilled", () => {
            const payload = {
                access_token: '##########access',
                refresh_token: '##########refresh',
                expires_in: 17777777777,
                token_type: 'code',
                scope: '3333333',
            } as SpotifyTokenResponse
            const endState = appReducer(startState, initializeApp.fulfilled(payload, 'request-id'))
            expect(endState.isInitialized).toBeTruthy()
        });

        test("should set isInitialized to false when rejected", () => {
            const error = null
            const endState = appReducer(startState, initializeApp.rejected(error, 'request-id',))
            expect(endState.isInitialized).toBeFalsy();
        });
    });
});
