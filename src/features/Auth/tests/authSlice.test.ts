import {authActions, authReducer} from "../";
import {beforeEach, describe, expect, test} from 'vitest'
import {SpotifyTokenResponse, User} from "../../../api/spotifyAPI.ts";
import {appActions} from "../../Application";
import {AuthSliceStateType} from "../authSlice.ts";

const {getMe} = authActions;
const {initializeApp} = appActions
let startState: AuthSliceStateType;
//
beforeEach(() => {
    startState = {
        loggedIn: false,
        authToken: null,
        refreshToken: null,
        expirationTime: null,
        user: null
    }
})
describe("auth async actions", () => {
        test("initializeApp.fulfilled should set autToken, refreshToken, loggedIn to true, expirationTime", () => {
            const payload = {
                access_token: '##########access',
                refresh_token: '##########refresh',
                expires_in: 17777777777,
                token_type: 'code',
                scope: '3333333',
            } as SpotifyTokenResponse
            const endState = authReducer(startState, initializeApp.fulfilled(payload, 'request-id'))
            expect(endState.authToken).toBe(payload.access_token);
            expect(endState.refreshToken).toBe(payload.refresh_token);
            expect(endState.expirationTime).toBe(payload.expires_in);
            // console.log(endState.authToken)
        });
        test('getMe.fulfilled should set user from payload',()=>{
            const payload: User ={
                country: 'KZ',
                type: 'user',
                email: 'email@email.com',
                display_name: 'user',
                explicit_content: {
                    filter_enabled: true,
                    filter_locked: true,
                },
                external_urls: {},
                href: 'https://href',
                followers: {href: 'href', total:333},
                uri: 'https://href',
                images: [{url: 'http://localhost', height: 333, width: 333, }],
                product: 'moloko',
                id: '389dfh928hioh2dfon89',
            }
            const endState = authReducer(startState, getMe.fulfilled(payload, 'request-id'))
            expect(endState.user).toEqual(payload)
        })
});
