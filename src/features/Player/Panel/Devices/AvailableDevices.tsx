import styles from "../../Footer.module.scss";
import {useEffect} from "react";
import {useActions, useAppSelector} from "../../../Application/hooks";
import {playerActions, playerSelectors} from "../../index.ts";
import Typography from "../../../../common/components/Typography/Typography.tsx";


const AvailableDevices = ({...rest}) => {
    const loading = useAppSelector(playerSelectors.selectAvailableDevicesLoading)
    const items = useAppSelector(playerSelectors.selectAvailableDevices)
    const {fetchDevices} = useActions(playerActions)
    useEffect(()=>{
        if(loading === 'idle'){
            fetchDevices()
        }
    },[])
    if(loading !== 'succeeded') return null
    return (
        <div {...rest} className={styles.actions__availableDevices}>
            <Typography variant="h5" >
                Available Devices
            </Typography>
            {items.map(item => <div className={styles.device} key={item.id}><div>{item.name}</div>{item.is_active&& <div className={styles.active}></div>}</div>)}
            {items.length === 0 && <div>(device not found)</div>}
        </div>
    );
};

export default AvailableDevices;