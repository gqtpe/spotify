import Badge from "../../common/components/Badge/Badge.tsx";
import {IoIosNotificationsOutline} from "react-icons/io";
import {createPortal} from "react-dom";
import Modal from "../../common/components/Modal/Modal.tsx";
import Paper from "../../common/components/Modal/Paper.tsx";
import {useRef, useState} from "react";
import {useAppSelector} from "../Application/hooks";

const UserPanel = () => {
    const [open, setOpen] = useState<boolean>(false)
    const user = useAppSelector(state => state.auth.user)
    const anchorEl = useRef<HTMLDivElement>(null)
    return (
        <div className="user-panel">
            <Badge variant="icon" onClick={() => setOpen((prev: boolean) => !prev)}
                   ref={anchorEl}><IoIosNotificationsOutline/></Badge>
            {open && anchorEl.current && createPortal(<Modal
                anchorEl={anchorEl.current}
                placement="bottom-end"
                margin={24}
            >
                <Paper>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, deserunt doloribus et libero magni
                    nulla rem sed voluptas voluptatibus. Consequatur dolor excepturi laborum nam, nisi nobis nulla
                    obcaecati temporibus totam.
                </Paper>
            </Modal>, document.getElementById('portal')!)}
            <Badge variant="filled"><img src={user?.images[0].url} alt="user-avatar"/></Badge>
        </div>
    );
};

export default UserPanel;