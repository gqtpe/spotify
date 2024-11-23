import {FC, useCallback, useRef, useState} from "react";
import styles from "../Footer.module.scss";
import {MdDevices} from "react-icons/md";
import IconButton from "../../../common/components/IconButton/IconButton.tsx";
import {createPortal} from "react-dom";
import Modal from "../../../common/components/Modal/Modal.tsx";
import Paper from "../../../common/components/Modal/Paper.tsx";
import AvailableDevices from "./Devices/AvailableDevices.tsx";


const availableDevicesWidth = '10rem'
const Panel: FC = () => {
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const anchorEl = useRef<HTMLButtonElement>(null);
    const togglePopup = useCallback(() => {
        setShowPopup(prev => !prev);
    }, []);
    return (
        <div className={[styles.footer__actions, styles.actions].join(' ')}>
            <IconButton variant="icon" onClick={togglePopup} ref={anchorEl}>
                <MdDevices/>
            </IconButton>
            {showPopup && anchorEl && createPortal(
                <Modal
                    anchorEl={anchorEl.current}
                    placement="top"
                    margin={24}
                >
                    <Paper style={{maxWidth: availableDevicesWidth, minWidth: availableDevicesWidth}}>
                       <AvailableDevices/>
                    </Paper>
                </Modal>,
                document.getElementById('portal')!
            )}
        </div>
    );
};

export default Panel;
