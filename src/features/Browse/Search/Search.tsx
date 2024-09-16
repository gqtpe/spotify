import {DetailedHTMLProps, InputHTMLAttributes, memo} from "react";
import styles from "./Search.module.scss";
import { FiSearch } from "react-icons/fi";

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    width: number
    bindToAddressBar?: boolean
}

const Search = ({width, ...rest}: Props) => {
    //todo:
    // 1.1: move query to rtk
    // 1.2: add loading logic for fetching search data,
    // 1.3: query is changed? clear items
    // 1.4: add pagination
    // 1.5: add requesting items while scrolling
    // 1.6: space is space
    return (
        <div className={styles.search} style={{width: `${width * 16}px`}}>
            <FiSearch id="search-icon" className={styles.icon}/>

            <input
                type="text"
                {...rest}
            />
        </div>
    )
}

export default memo(Search)
