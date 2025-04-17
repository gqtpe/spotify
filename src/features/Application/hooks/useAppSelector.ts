import {TypedUseSelectorHook, useSelector} from "react-redux";
import type {AppRootStateType} from "../types.ts";

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector