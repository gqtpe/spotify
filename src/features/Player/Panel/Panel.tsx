import { FC, useCallback, useRef, useState } from "react";
import styles from "../Footer.module.scss";
import { MdDevices } from "react-icons/md";
import IconButton from "../../../common/components/IconButton/IconButton.tsx";
import { createPortal } from "react-dom";
import AvailableDevices from "./Devices/AvailableDevices.tsx";
import Modal from "../../../common/components/Modal/Modal.tsx";


const availableDevicesWidth = 16
const Panel: FC = () => {
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const devices = useRef<HTMLDivElement>(null);
    const togglePopup = useCallback(() => {
        setShowPopup(prev => !prev);
        console.log(devices.current!.offsetParent!.clientHeight - devices.current!.offsetTop)
    }, []);

    return (
        <div className={[styles.footer__actions, styles.actions].join(' ')}>
            <div ref={devices}>
            <IconButton variant="icon" onClick={togglePopup}>
                <MdDevices/>
            </IconButton>
            </div>
            {showPopup && devices.current && createPortal(
                <Modal
                   bottom={devices.current!.offsetParent!.clientHeight - devices.current.offsetTop + 24}
                   right={devices.current!.offsetParent!.clientWidth - devices.current.offsetLeft - 16}
                   popupWidth={availableDevicesWidth}
                >
                    <AvailableDevices style={{maxWidth: availableDevicesWidth + 'rem'}}/>
                </Modal>,
                document.getElementById('portal')!
            )}
        </div>
    );
};

export default Panel;
