import {createPortal} from "react-dom";
import {useCallback, useRef, useState} from "react";
import {useAppSelector} from "../../hooks";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import Badge from "@common/components/Badge/Badge.tsx";
import Modal from "@common/components/Modal/Modal.tsx";
import Paper from "@common/components/Modal/Paper.tsx";
import Button from "@common/components/Button/Button.tsx";
import OutsideClick from "@common/hoc/OutisideClick/OutsideClick.tsx";
import {IoIosNotificationsOutline} from "react-icons/io";


const UserPanel = () => {
    const [open, setOpen] = useState<boolean>(false)
    const user = useAppSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const anchorEl = useRef<HTMLDivElement>(null)
    const onClick = () => {
        setOpen(prev => !prev)
    }
    const navigate = useNavigate()
    const logout = useCallback(() => {
        setOpen(false)
        localStorage.clear()
        dispatch({type: 'auth/logout'})
        navigate('/login')
    }, [navigate, dispatch])
    return (
        <div className="header__user-panel user-panel">
            <Badge variant="icon">
                <IoIosNotificationsOutline/>
            </Badge>
            {open && anchorEl.current && createPortal(<Modal
                anchorEl={anchorEl.current}
                placement="bottom-end"
                margin={8}
            >
                <OutsideClick callback={onClick}>
                    <Paper>
                    <Button variant="outlined" onClick={logout}>Log Out</Button>
                </Paper>
                </OutsideClick>
            </Modal>, document.getElementById('portal')!)
            }
            <Badge variant="filled" onClick={onClick} ref={anchorEl}>
                <img src={user?.images[0].url} alt="user.images"/>
            </Badge>
        </div>
    );
};

export default UserPanel;