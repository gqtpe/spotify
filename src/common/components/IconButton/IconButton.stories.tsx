import {Meta, StoryObj} from "@storybook/react";
import IconButton from "./IconButton.tsx";
import {IoMdPlay} from "react-icons/io";


const meta: Meta = {
    title: 'common/IconButton',
    component: IconButton,
    parameters: {
        backgrounds: {
            values: [
                // 👇 Default values
                {name: 'Dark', value: '#000000'},
            ],
            default: 'Dark'
        }
    }
}

export default meta;

type Story = StoryObj<typeof IconButton>

export const Filled: Story = {
    args: {
        variant: 'filled',
        children: <IoMdPlay/>
    },
}
export const Icon: Story = {
    args: {
        variant: 'icon',
        children: <IoMdPlay/>,
        style: {
            color: 'white',
        }
    },
}