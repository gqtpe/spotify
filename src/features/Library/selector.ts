import {createSelector} from "@reduxjs/toolkit";
import {AppRootStateType} from "../Application/types.ts";

export const selectItems = (state: AppRootStateType) => state.library.items
export const selectFilter = (state: AppRootStateType) => state.library.filter


export const selectFilteredItems = createSelector(
    [selectItems, selectFilter],
    (items, filter) => {
        switch (filter) {
            case 'playlist':
                return items.filter(item => item.type === 'playlist');
            case 'album':
                return items.filter(item => item.type === 'album');
            // case 'artists':
            //     return items.filter(item => item.type === 'artist')
            default:
                return items; // 'all'
        }
    }
)



