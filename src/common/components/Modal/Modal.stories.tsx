import Modal, {PlacementType} from "./Modal.tsx";
import {StoryObj} from "@storybook/react";
import Button from "../Button/Button.tsx";
import {useRef, useState} from "react";
import {createPortal} from "react-dom";
import Paper from "./Paper.tsx";


export default {
    title: 'common/Modal',
    component: Modal,
    tags: ['autodocs'],
}


type Story = StoryObj<typeof Modal>
const blockWidth = 10
export const Default: Story = {
    render: () => {
        const anchorEl = useRef<HTMLDivElement>(null)
        const [open, setOpen] = useState<boolean>(false)
        return <div>
            <div style={{height: 200}}>
                <div ref={anchorEl}>
                    <Button onClick={() => setOpen(state => !state)}>
                        Open Modal
                    </Button>
                </div>
                {open && anchorEl.current && createPortal(
                    <Modal
                        anchorEl={anchorEl.current}
                        placement="bottom"
                        margin={8}
                    >
                        <Paper style={{maxWidth: blockWidth}}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque id labore nesciunt
                            nulla numquam quae quia repellat. Aliquid amet aperiam consequatur dicta earum, eum ipsa
                            maiores nulla qui rem tempora.
                        </Paper>
                    </Modal>,
                    document.getElementById('portal')!
                )}
            </div>
            <div id="portal">

            </div>
        </div>
    }
}

export const AllPlacement: Story = {
    render: () => {
        const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
        const [open, setOpen] = useState<boolean>(false);
        const [placement, setPlacement] = useState<PlacementType>('top');
        const portal = useRef<HTMLDivElement>(null);

        const handleClick = (newPlacement: PlacementType) => (event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget);
            setOpen(prev => placement !== newPlacement || !prev);
            setPlacement(newPlacement);
        };

        return (
            <div style={{height: 700, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {/* Placement Grid */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateRows: 'auto auto',
                        gridTemplateColumns: '1fr 1fr 1fr',
                        gap: '16px',
                        justifyItems: 'center',
                        alignItems: 'center',
                        padding: '20px',
                    }}
                >
                    {/* Top Row */}
                    <div style={{ gridColumn: 'span 3', display: 'flex',gap: '8px', justifyContent: 'space-evenly' }}>
                        <Button onClick={handleClick('top-start')}>TOP-START</Button>
                        <Button onClick={handleClick('top')}>TOP</Button>
                        <Button onClick={handleClick('top-end')}>TOP-END</Button>
                    </div>

                    {/* Left Column */}
                    <div style={{ gridRow: 'span 2', display: 'flex',gap: '36px', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                        <Button onClick={handleClick('left-start')}>LEFT-START</Button>
                        <Button onClick={handleClick('left')}>LEFT</Button>
                        <Button onClick={handleClick('left-end')}>LEFT-END</Button>
                    </div>

                    {/* Right Column */}
                    <div style={{ gridRow: 'span 2',gridColumn: 3, display: 'flex',gap: '36px', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                        <Button onClick={handleClick('right-start')}>RIGHT-START</Button>
                        <Button onClick={handleClick('right')}>RIGHT</Button>
                        <Button onClick={handleClick('right-end')}>RIGHT-END</Button>
                    </div>

                    {/* Bottom Row */}
                    <div style={{ gridColumn: 'span 3', display: 'flex',gap: '8px', justifyContent: 'space-evenly' }}>
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
                        <Paper >
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque id labore nesciunt nulla numquam quae quia repellat.
                        </Paper>
                    </Modal>,
                    portal.current!
                )}

                {/* Portal Container */}
                <div ref={portal} id="portal"></div>
            </div>
        );
    }
};
