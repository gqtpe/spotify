import {TypedUseSelectorHook, useSelector} from "react-redux";
import {AppRootStateType} from "../types.ts";

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector