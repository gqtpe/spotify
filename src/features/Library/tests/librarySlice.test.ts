import {beforeEach, describe, expect, test} from "vitest";
import {userLibraryActions, userLibraryReducer} from "../index.ts";
import type {LibraryFilterType, LibraryStateType} from "../userLibrarySlice.ts";


let startState: LibraryStateType;

const {setFilter} = userLibraryActions;

beforeEach(() => {
    startState = {
        items: [],
        filter: 'all'
    }
})


describe('librarySlice synchronous action setFilter', () => {
    const modifiedState: LibraryStateType = {
        ...startState,
        filter: 'album'
    }
    test('should set filter to playlists', () => {
        const payload: LibraryFilterType = 'playlist'
        const endState = userLibraryReducer(startState, setFilter(payload))
        expect(endState.filter).toBe(payload)
    })
    test('should set filter to all', () => {
        const payload: LibraryFilterType = 'all'
        const endState = userLibraryReducer(modifiedState, setFilter(payload))
        expect(endState.filter).toBe(payload)
    })
})