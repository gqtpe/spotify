import {HTMLAttributes, useRef} from "react";

type Props = & HTMLAttributes<HTMLDivElement>
const Paper = ({style,children, ...rest}: Props) => {
    const styles = {
        ...style,
        borderRadius: '8px',
        backgroundColor: 'var(--background-light)',
        maxWidth: '10rem',
    }
    return (
        <div style={styles} {...rest}>
            <div style={{padding: '8px'}}>
            {children}
            </div>
        </div>
    );
};

export default Paper;