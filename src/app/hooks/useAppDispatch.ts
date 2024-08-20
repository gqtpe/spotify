import {useDispatch} from "react-redux";
import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";
import {AppRootStateType} from "../store.ts";

type AppThunkDispatch = ThunkDispatch<AppRootStateType, undefined, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();