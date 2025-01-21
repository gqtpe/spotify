import {Meta, StoryObj} from "@storybook/react";
import {DemoMenu} from "./DemoMenu.tsx";


const meta: Meta = {
    title: 'common/DemoContextMenu',
    component: DemoMenu,
}
export default meta;

type Story = StoryObj<typeof DemoMenu>


export const Default: Story = {
    parameters: {
        layout: 'fullscreen',
    },
    render: () => {
        return <DemoMenu/>
    }
}



