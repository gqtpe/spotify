import {CSSProperties, useEffect} from "react";
import { useContextMenu } from "../../../features/Application/hooks";

const wrapper: CSSProperties = {
    width: '100%',
    height: '100%',
    position: 'relative',
}
const portal: CSSProperties = {}
const content: CSSProperties = {
    height: '100vh',
    position: 'relative',
    background: 'var(--background-dark)',
    display: 'flex',
    alignItems: 'center',
}
const menu: CSSProperties = {
    height: '80%',
    width: '60%',
    margin: '0 auto',
    position: 'relative',
    background: 'var(--background-lighter)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}

export const DemoMenu = () => {
    const {renderMenu, handleContextMenu} = useContextMenu('track');
    useEffect(() => {
        const disableContextMenu = (e: MouseEvent) => {
            const target = e.target as Element;
            if (target) {
                if (!target.closest(".allow-context-menu")) {
                    e.preventDefault();
                }
            }

        };
        document.addEventListener("contextmenu", disableContextMenu);
        return () => {
            document.removeEventListener("contextmenu", disableContextMenu);
        };
    }, [])
    return <div style={wrapper}>
        <div style={content}>
            <div style={menu} onContextMenu={handleContextMenu}>
                (context menu area)
                {renderMenu()}
            </div>
        </div>
        <div id="portal-menu" style={portal}>
        </div>
    </div>
}

