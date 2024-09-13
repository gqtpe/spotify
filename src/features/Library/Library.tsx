import {BiLibrary} from "react-icons/bi";
import Typography from "../../common/components/Typography/Typography.tsx";
import styles from "./Library.module.scss";
import IconButton from "../../common/components/IconButton/IconButton.tsx";
import {IoMdAdd, IoIosArrowForward} from "react-icons/io";


export const Library = () => {
    return <div className={styles.library}>
        <div className={styles.library__header}>
            <BiLibrary fontSize={24}/>
            <Typography className={styles.title}>
                Your Library
            </Typography>
            <IconButton variant="icon">
                <IoMdAdd/>
            </IconButton>
            <IconButton variant="icon">
                <IoIosArrowForward />
            </IconButton>
        </div>
    </div>
}