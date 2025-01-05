import Badge from "../../../../common/components/Badge/Badge.tsx";
import {IoIosNotificationsOutline} from "react-icons/io";
import {createPortal} from "react-dom";
import Modal from "../../../../common/components/Modal/Modal.tsx";
import Paper from "../../../../common/components/Modal/Paper.tsx";
import {useCallback, useRef, useState} from "react";
import {useAppSelector} from "../../hooks";
import Button from "../../../../common/components/Button/Button.tsx";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const UserPanel = () => {
    const [open, setOpen] = useState<boolean>(false)
    const user = useAppSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const anchorEl = useRef<HTMLDivElement>(null)
    const onClick = () =>{
        setOpen(prev =>!prev)
    }
    const navigate = useNavigate()
    const logout = useCallback(() =>{
        setOpen(false)
        localStorage.clear()
        dispatch({type: 'auth/logout'})
        navigate('/login')
    },[])
    return (
        <div className="user-panel">
            <Badge variant="icon"
                   ><IoIosNotificationsOutline/></Badge>
            {open && anchorEl.current && createPortal(<Modal
                anchorEl={anchorEl.current}
                placement="bottom-end"
                margin={8}
            >
                <Paper>
                    <Button variant="outlined" onClick={logout}>Log Out</Button>
                </Paper>
            </Modal>, document.getElementById('portal')!)}
            <Badge variant="filled" onClick={onClick} ref={anchorEl}>{user?.images[0]?.url && <img src={user.images[0].url}/>}</Badge>
        </div>
    );
};

export default UserPanel;