import {FC} from "react";
import type {StackItem} from "../../../../app/App.tsx";
import Aside from "../Aside/Aside.tsx";
import Devices from "./Devices/Devices.tsx";
import Queue from "./Queue/Queue.tsx";


type Props = {
    stackArray: Array<StackItem>
    removeItem: (id: string) => void
}
const Sidebar: FC<Props> = ({stackArray, removeItem}) => {

    return <div className="sidebar">
        {stackArray.reverse().map((item) => {
            const close = () => removeItem(item.id)
            return <div className="sidebar__item" key={item.id} >
            {/*return <div className="sidebar__item" key={item.id} style={{top:`calc(${index}*1rem`}}>*/}
                <Aside state={item.name} close={close}>
                    {item.name === 'devices' && <Devices/>}
                    {item.name === 'queue' && <Queue/>}
                </Aside>
            </div>
        })}
    </div>
}

export default Sidebar;