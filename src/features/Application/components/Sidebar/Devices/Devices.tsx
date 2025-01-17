import "./Devices.scss"
import {useActions, useAppSelector} from "../../../hooks";
import {playerActions, playerSelectors} from "../../../../Player";
import {Typography} from "../../../../../common/components/Typography/Typography.tsx";
import {TbDeviceLaptop} from "react-icons/tb";

const Devices = () => {
    const activeDevice = useAppSelector(playerSelectors.selectActiveDevice)
    const availableDevices = useAppSelector(playerSelectors.selectAvailableDevices)
    const {transferPlayback} = useActions(playerActions)


    return <div className="devices">
        <div className="devices__current current">
            <Typography variant="h3" className="current__title"
                        icon={<TbDeviceLaptop size="2rem" color="var(--primary-500)"/>}>Current Device</Typography>
            <Typography variant="h6" className="current__subtitle">{activeDevice?.name}</Typography>
            <div className="current__gradient"></div>
        </div>
        <Typography variant="h5" sx={{margin: '0.5rem'}}
                    children={availableDevices.length === 0 ? 'No other device found' : 'Select another device'}/>
        <div className="devices__available">
            {availableDevices.length ? availableDevices.map(t => {
                return <div className="devices__item" onClick={()=>transferPlayback(t.id)} key={t.id}>
                    <Typography variant="h6" className="current__title" icon={<TbDeviceLaptop/>}>{t.name}</Typography>
                </div>
            }):null}
        </div>
    </div>
}

export default Devices;