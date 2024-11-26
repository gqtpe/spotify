import {SidebarContent} from "../../appSlice.ts";

type Props ={
    state: SidebarContent
}
const Aside = ({state}: Props) => {
    return (
        <aside>
            {state}
        </aside>
    );
};

export default Aside;