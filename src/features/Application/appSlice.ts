import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initializeApp} from "./appThunks.ts";

export type SidebarContent = 'queue' | 'lyrics' | 'devices'

export const slice = createSlice(
    {
        name: 'app',
        initialState: {
            error: null as null | string,
            isInitialized: false as boolean,
            sidebar: {
                isOpen: false as boolean,
                content: null as SidebarContent | null,
            }
        },
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