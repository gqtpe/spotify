import {useDispatch} from "react-redux";
import {AppThunkDispatch} from "../types.ts";

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();