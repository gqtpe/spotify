import {ActionCreatorsMapObject, bindActionCreators} from "@reduxjs/toolkit";
import {useAppDispatch} from "./useAppDispatch.ts";
import {useMemo} from "react";


export function useActions<T extends ActionCreatorsMapObject>(actions: T) {
    const dispatch = useAppDispatch()

    return useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [])
}