import IconButton from "../../../../common/components/IconButton/IconButton.tsx";
import {RepeatState} from "../../types.ts";
import {FC, memo} from "react";
import {RiRepeat2Fill, RiRepeatOneFill} from "react-icons/ri";
import styles from "../../Footer.module.scss";

type Props = {
    variant: RepeatState
    onClick: ()=>void
    disabled?: boolean
}

const Repeat: FC<Props> = ({variant, onClick, disabled = false}) =>{
    let item = null
    switch(variant){
        case "context":{
           item = <RiRepeat2Fill className={styles.active}/>
            break;
        }
        case "track":{
            item = <RiRepeatOneFill className={styles.active}/>
            break;
        }
        default: {
            item = <RiRepeat2Fill/>
            break
        }
    }

    return <IconButton variant="icon" onClick={onClick} disabled={disabled}>
        {item}
    </IconButton>
}

export default memo(Repeat)