import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initializeApp} from "./appThunks.ts";

export type SidebarContent = 'queue' | 'lyrics' | 'devices'
export type AppSliceInitialStateType = {
    error: string | null
    isInitialized: boolean
    sidebar: {
        isOpen: boolean
        content: SidebarContent | null
    }
}
export const slice = createSlice(
    {
        name: 'app',
        initialState: {
            error: null,
            isInitialized: false,
            sidebar: {
                isOpen: false,
                content: null,
            }
        } as AppSliceInitialStateType,
        reducers: {
            setAppInitialized: (state, action: PayloadAction<boolean>) => {
                state.isInitialized = action.payload
            },
            setAppError: (state, action: PayloadAction<string | null>) => {
                state.error = action.payload
            },
            openSidebar: (state, action: PayloadAction<{type: SidebarContent}>) => {
                state.sidebar.isOpen = true
                state.sidebar.content = action.payload.type
            },
            closeSidebar: (state) => {
                state.sidebar.isOpen = false
                state.sidebar.content = null
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