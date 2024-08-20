import {TypedUseSelectorHook, useSelector} from "react-redux";
import {AppRootStateType} from "../store.ts";

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector