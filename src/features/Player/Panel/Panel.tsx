import {FC, useCallback, useRef, useState} from "react";
import styles from "../Footer.module.scss";
import {MdDevices} from "react-icons/md";
import IconButton from "../../../common/components/IconButton/IconButton.tsx";
import {createPortal} from "react-dom";
import Modal from "../../../common/components/Modal/Modal.tsx";
import Paper from "../../../common/components/Modal/Paper.tsx";
import AvailableDevices from "./AvailableDevices/AvailableDevices.tsx";
import {HiMiniQueueList} from "react-icons/hi2";
import {useSidebar} from "../../Application/hooks/useSidebar.ts";
import {useAppSelector} from "../../Application/hooks";
import {playerSelectors} from "../index.ts";
import OutsideClick from "../../../common/hoc/OutisideClick/OutsideClick.tsx";


const availableDevicesWidth = '12rem'
const Panel: FC = () => {
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const anchorEl = useRef<HTMLButtonElement>(null);
    const isPlaying = useAppSelector(playerSelectors.selectPlaybackItem)
    const {open, content, openSidebar} = useSidebar()
    const togglePopup = useCallback(() => {
        setShowPopup(prev => !prev);
    }, []);
    const closePopup = useCallback(() => {
        setShowPopup(false)
    }, [])
    const openQueue = useCallback(() => {
        openSidebar({type: 'queue'})
    }, [open, openSidebar])
    const handleClick = useCallback(() => {
        openSidebar({type: 'devices'})
        closePopup()
    }, [open, openSidebar])
    return (
        <div className={[styles.footer__actions, styles.actions].join(' ')}>
            <IconButton variant="icon" onClick={togglePopup} ref={anchorEl} disabled={content === 'devices'}>
                <MdDevices/>
            </IconButton>
            <IconButton variant="icon" onClick={openQueue} disabled={content === 'queue' || !isPlaying}>
                <HiMiniQueueList/>
            </IconButton>


            {/*popup*/}
            {showPopup && anchorEl && createPortal(
                <Modal
                    anchorEl={anchorEl.current}
                    placement="top"
                    margin={24}
                >
                    <OutsideClick callback={closePopup}>
                        <Paper style={{maxWidth: availableDevicesWidth, minWidth: availableDevicesWidth}}>
                            <AvailableDevices transferPlayback={handleClick}/>
                        </Paper>
                    </OutsideClick>
                </Modal>,
                document.getElementById('portal')!
            )}
            {/*popup*/}
        </div>
    );
};

export default Panel;
