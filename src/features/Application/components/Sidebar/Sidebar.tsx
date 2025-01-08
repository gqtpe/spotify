import {CSSProperties, FC} from "react";
import type {StackItem} from "../../../../app/App.tsx";
import Aside from "../Aside/Aside.tsx";


type Props = {
    stackArray: Array<StackItem>
    unshift: (item: StackItem) => void;
    removeItem: (id: string) => void
}
const itemStyles: CSSProperties = {}
const Sidebar: FC<Props> = ({stackArray, removeItem}) => {

    return <div className="sidebar">
        {stackArray.reverse().map((item,index) => {
            const close = () => removeItem(item.id)
            return <div className="sidebar__item" key={item.id} style={{top:`calc(${index}*1rem`}}>
                <Aside state={item.name} close={close}>
                    {item.name}
                </Aside>
            </div>
        })}
    </div>
}

export default Sidebar;