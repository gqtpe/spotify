import styles from "../../Footer.module.scss";
import {useEffect} from "react";
import {useActions, useAppSelector} from "../../../Application/hooks";
import {playerActions, playerSelectors} from "../../index.ts";


const AvailableDevices = ({...rest}) => {
    const loading = useAppSelector(playerSelectors.selectAvailableDevicesLoading)
    const items = useAppSelector(playerSelectors.selectAvailableDevices)
    const {fetchDevices} = useActions(playerActions)
    useEffect(()=>{
        if(loading === 'idle'){}
        fetchDevices()
    },[])
    if(loading !== 'succeeded') return null
    return (
        <div {...rest} className={styles.actions__availableDevices}>
            {items.map(item => <div className={styles.device}><div key={item.id}>{item.name}</div>{item.is_active&& <div className={styles.active}></div>}</div>)}{}
          </div>
    );
};

export default AvailableDevices;