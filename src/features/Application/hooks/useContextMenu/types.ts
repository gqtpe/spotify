import {ReactElement} from "react";

export type MenuType = 'track' | 'playlist' | 'album' | 'user' | 'artist'

export interface Option {
    id: string
    title: string
    availableFor: MenuType[]
    icon?: ReactElement
}