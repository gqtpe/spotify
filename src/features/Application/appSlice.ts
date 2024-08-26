import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {spotifyAPI} from "../../api/spotifyAPI.ts";




export const initializeApp = createAsyncThunk(
    'app/initializeApp',
    async (_,{rejectWithValue} ) =>{
        const response = await spotifyAPI.getMe()
        try {
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const asyncActions = {
    initializeApp
}

export const slice = createSlice(
    {
        name: 'app',
        initialState: {
            error: null as null|string,
            isInitialized: false as boolean
        },
        reducers: {
            setAppLoading: (state, action: PayloadAction<boolean>) => {
                state.isInitialized = action.payload
            },
            setAppError: (state, action: PayloadAction<string|null>) => {
                state.error = action.payload
            }
        },
        extraReducers: (builder) => {
            builder.addCase(initializeApp.fulfilled, (state) => {
                    state.isInitialized = true
            })
            builder.addCase(initializeApp.rejected, (state) => {
               state.isInitialized = false
            })
        },
    }
)