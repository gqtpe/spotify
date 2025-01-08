import {SidebarContent} from "../../appSlice.ts";
import IconButton from "../../../../common/components/IconButton/IconButton.tsx";
import { IoMdClose } from "react-icons/io";
import './Aside.scss';
import {Typography} from "../../../../common/components/Typography/Typography.tsx";
import {firstToUpper} from "../../../Browse/utils/firstToUpper.ts";
import {ReactNode} from "react";

type Props ={
    state: SidebarContent
    close: () =>void
    children: ReactNode
}
const Aside = ({state, close,children}: Props) => {
    const handleRemove = () =>{
        close()
    }
    return (
        <aside className="aside">
            <div className="aside__header">
                <Typography variant="h4">{firstToUpper(state)}</Typography>
                <IconButton variant="icon" onClick={handleRemove}>
                    <IoMdClose/>
                </IconButton>
            </div>
            {children}
        </aside>
    );
};

export default Aside;