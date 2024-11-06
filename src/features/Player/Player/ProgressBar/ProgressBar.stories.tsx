import {Meta, StoryObj} from "@storybook/react";
import ProgressBar from "./ProgressBar.tsx";


const meta: Meta ={
    title: 'Player/ProgressBar',
    component: ProgressBar,
    parameters: {
        backgrounds: {
            values: [
                {name: 'Dark', value: '#000000'},
            ],
            default: 'Dark'
        }
    },

}

export default meta;
type Story =  StoryObj<typeof ProgressBar>

export const Example: Story = {
    args: {
        progress: 267100,
        duration: 382240,
        onSeek: ()=>{},
    }
}
