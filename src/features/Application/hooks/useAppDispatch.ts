import {useDispatch} from "react-redux";
import type {AppThunkDispatch} from "../types.ts";

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();