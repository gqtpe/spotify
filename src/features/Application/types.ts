import {rootReducer} from "../../app/store.ts";
import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, undefined, AnyAction>