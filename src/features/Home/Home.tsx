import Button from "../../common/components/Button/Button.tsx";
import {spotifyAPI} from "../../api/spotifyAPI.ts";
import {getItem} from "../../common/utils/localStorage.ts";
import axios from "axios";
import {useActions, useContextMenu} from "../Application/hooks";
import {CurrentlyPlaying, playerActions} from "../Player";
import toast from "react-hot-toast";
import {ActiveDevice} from "../Player/state/playerSlice.ts";
import MenuItem from "../Application/components/Menu/MenuItem/MenuItem.tsx";
import Menu from "../Application/components/Menu/Menu.tsx";
import {createPortal} from "react-dom";
import Modal from "../../common/components/Modal/Modal.tsx";
import Paper from "../../common/components/Modal/Paper.tsx";
import {useState} from "react";
import TabGroup from "../../common/components/TabGroup/TabGroup.tsx";
import TabItem from "../../common/components/TabGroup/TabItem/TabItem.tsx";
import { PlacementType } from "@/common/components/Modal/types.ts";

const fetchMe = async () => {
    const response = await spotifyAPI.getMe()
    console.log('me:', response.data)
}
const fetchAvailableDevices = async () => {
    const response = await spotifyAPI.getAvailableDevices()
    console.log('devices:', response.data)
}
const refreshToken = async () => {
    const refreshToken = getItem('refresh_token')
    console.log(refreshToken)
    const response = await axios.post('https://spotify-back-lovat.vercel.app/refresh', {refresh_token: refreshToken});
    console.log('refresh Response:', response.data)
}
const fetchBrowseCategories = async () => {
    const response = await spotifyAPI.getBrowseCategories()
    console.log('categories:', response.data)
}
const fetchIsSaved = async () => {
    const response = await spotifyAPI.checkIsItemSaved('album', ['3iPSVi54hsacKKl1xIR2eH'])
    console.log('fetchIsSaved:', response.data)
}
const save = async () => {
    const response = await spotifyAPI.saveItem('album', ['3iPSVi54hsacKKl1xIR2eH'])
    console.log('save:', response.data)
}
const remove = async () => {
    const response = await spotifyAPI.removeItem('album', ['3iPSVi54hsacKKl1xIR2eH'])
    console.log('remove:', response.data)
}
type HomeTestContentType = 'main'|'modal'|'context-menu'
//todo: home page optimization(not required)
//todo: useOutsideClick hook integration inside ContextMenuHome
export const Home = () => {

    const [content, setContent] = useState<HomeTestContentType>('main')
    const handleChange = (content: HomeTestContentType) =>{
        setContent(content)
    }
    return <div style={{padding: '16px'}} >
        <TabGroup value={content} handleChange={handleChange}>
            <TabItem value={'main'} label={'Main'}/>
            <TabItem value={'modal'} label={'Modal'}/>
            <TabItem value={'context-menu'} label={'Context Menu'}/>
        </TabGroup>
        {(content === 'main') && <ButtonsHome/>}
        {(content === 'modal') && <ModalHome/>}
        {(content === 'context-menu') && <ContextMenuHome/>}
    </div>
}
const ModalHome = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [placement, setPlacement] = useState<PlacementType>('top');
    const handleClick = (newPlacement: PlacementType) => (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen(prev => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };

    return <div style={{padding: '16px'}}>
        <div style={{
                display: 'grid',
                gridTemplateRows: 'auto auto',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '16px',
                justifyItems: 'center',
                alignItems: 'center',
                padding: '20px',
            }}>
            {/* Top Row */}
            <div style={{gridColumn: 'span 3', display: 'flex', gap: '8px', justifyContent: 'space-evenly'}}>
                <Button onClick={handleClick('top-start')}>TOP-START</Button>
                <Button onClick={handleClick('top')}>TOP</Button>
                <Button onClick={handleClick('top-end')}>TOP-END</Button>
            </div>

            {/* Left Column */}
            <div style={{
                gridRow: 'span 2',
                display: 'flex',
                gap: '36px',
                flexDirection: 'column',
                justifyContent: 'space-evenly'
            }}>
                <Button onClick={handleClick('left-start')}>LEFT-START</Button>
                <Button onClick={handleClick('left')}>LEFT</Button>
                <Button onClick={handleClick('left-end')}>LEFT-END</Button>
            </div>

            {/* Right Column */}
            <div style={{
                gridRow: 'span 2',
                gridColumn: 3,
                display: 'flex',
                gap: '36px',
                flexDirection: 'column',
                justifyContent: 'space-evenly'
            }}>
                <Button onClick={handleClick('right-start')}>RIGHT-START</Button>
                <Button onClick={handleClick('right')}>RIGHT</Button>
                <Button onClick={handleClick('right-end')}>RIGHT-END</Button>
            </div>

            {/* Bottom Row */}
            <div style={{gridColumn: 'span 3', display: 'flex', gap: '8px', justifyContent: 'space-evenly'}}>
                <Button onClick={handleClick('bottom-start')}>BOTTOM-START</Button>
                <Button onClick={handleClick('bottom')}>BOTTOM</Button>
                <Button onClick={handleClick('bottom-end')}>BOTTOM-END</Button>
            </div>
        </div>

        {/* Modal */}
        {open && anchorEl && createPortal(
            <Modal
                anchorEl={anchorEl}
                placement={placement}
                margin={10}
            >
                <Paper>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque id labore nesciunt nulla
                    numquam quae quia repellat.
                </Paper>
            </Modal>,
            document.getElementById('portal')!
        )}
    </div>
}

const ContextMenuHome = () => {

    const {handleContextMenu, position, anchorEl} = useContextMenu();

    return <div style={{padding: '16px', border:'1px solid white', height: '32rem',backgroundColor: 'rgba(255, 0, 0, 0.1);'}} onContextMenu={handleContextMenu} ref={anchorEl}>
        <Menu open={!!position} portalID="portal"
              sx={position ? {position: 'absolute', top: position.y, left: position.x} : undefined}
              ref={anchorEl}>
            <MenuItem title="item 1"/>
            <MenuItem title="item 2"/>
            <MenuItem title="item 3"/>
            <MenuItem title="item 4"/>
        </Menu>
    </div>
}
const ButtonsHome = () =>{
    const {setDeviceID} = useActions(playerActions)
    const {fetchPlaybackState, fetchCurrentlyPlaying} = useActions(playerActions)
    const fetch = async () => {
        fetchPlaybackState()
    }
    const fetch1 = async () => {
        fetchCurrentlyPlaying()
    }
    const errorHandleHelper1 = () => {
        const helper: ActiveDevice = {
            name: 'helper',
            id: 'helper',
        }
        setDeviceID({deviceID: helper})
    }

    const notify = () => toast.success('Here is your toast.');
    return <div style={{padding: '16px'}}>
        <Button onClick={fetchMe}>get me</Button>
        <Button onClick={fetchAvailableDevices}>get devices</Button>
        <Button onClick={refreshToken}>refreshToken</Button>
        <Button onClick={fetch}>playbackState</Button>
        <Button onClick={fetch1}>currentlyPlaying</Button>
        <Button onClick={fetchBrowseCategories}>fetch categories</Button>
        {/*<Button onClick={fetchBrowseCategoryPlaylist}>fetch category playlists</Button>*/}
        <Button onClick={fetchIsSaved}> fetch is 3iPSVi54hsacKKl1xIR2eH saved</Button>
        <Button onClick={save}>saveItem</Button>
        <Button onClick={remove}>removeItem</Button>
        <Button onClick={notify}>add toast</Button>
        <Button onClick={errorHandleHelper1}>errorHandleHelper1</Button>
        <div><CurrentlyPlaying/></div>
    </div>
}