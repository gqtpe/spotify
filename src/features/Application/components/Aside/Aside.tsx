import {ReactNode} from "react";
import './Aside.scss';
import type {SidebarContent} from "@/features/Application/appSlice.ts";

import IconButton from "@common/components/IconButton/IconButton.tsx";
import {Typography} from "@common/components/Typography/Typography.tsx";
import {firstToUpper} from "@/features/Browse/utils/firstToUpper.ts";

import {IoMdClose} from "react-icons/io";




type Props = {
    state: SidebarContent
    close: () => void
    children: ReactNode
}
const Aside = ({state, close, children}: Props) => {
    const handleRemove = () => {
        close()
    }
    return (
        <aside className="aside">
            <div className="aside__header">
                <Typography variant="h5">{firstToUpper(state)}</Typography>
                <IconButton variant="icon" onClick={handleRemove}>
                    <IoMdClose/>
                </IconButton>
            </div>
            {children}
        </aside>
    );
};

export default Aside;