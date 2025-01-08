import {FC, useCallback, useRef, useState} from "react";
import styles from "../Footer.module.scss";
import {MdDevices} from "react-icons/md";
import IconButton from "../../../common/components/IconButton/IconButton.tsx";
import {createPortal} from "react-dom";
import Modal from "../../../common/components/Modal/Modal.tsx";
import Paper from "../../../common/components/Modal/Paper.tsx";
import AvailableDevices from "./Devices/AvailableDevices.tsx";
import {HiMiniQueueList} from "react-icons/hi2";
import {useSidebar} from "../../Application/hooks/useSidebar.ts";


const availableDevicesWidth = '12rem'
const Panel: FC = () => {
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const anchorEl = useRef<HTMLButtonElement>(null);
    const {open, openSidebar, closeSidebar} = useSidebar()
    const togglePopup = useCallback(() => {
        setShowPopup(prev => !prev);
    }, []);
    const closePopup = useCallback(()=>{
        setShowPopup(false)
    },[])
    const openQueue = useCallback(() => {
        openSidebar({type: 'queue'})
    },[open, closeSidebar, openSidebar])
    return (
        <div className={[styles.footer__actions, styles.actions].join(' ')}>
            <IconButton variant="icon" onClick={togglePopup} ref={anchorEl}>
                <MdDevices/>
            </IconButton>
            <IconButton variant="icon" onClick={toggleSidebar}>
                <HiMiniQueueList />
            </IconButton>


            {/*popup*/}
            {showPopup && anchorEl && createPortal(
                <Modal
                    anchorEl={anchorEl.current}
                    placement="top"
                    margin={24}
                >
                    <Paper style={{maxWidth: availableDevicesWidth, minWidth: availableDevicesWidth}}>
                        <AvailableDevices close={closePopup}/>
                    </Paper>
                </Modal>,
                document.getElementById('portal')!
            )}
            {/*popup*/}
        </div>
    );
};

export default Panel;
