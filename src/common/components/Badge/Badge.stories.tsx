import {Meta, StoryObj} from "@storybook/react";
import Badge from "./Badge.tsx";
import {GoHomeFill} from "react-icons/go";


const meta: Meta = {
    title: 'common/Badge',
    component: Badge,
    parameters: {
        backgrounds: {
            values: [
                {name: 'Dark', value: '#000000'},
            ],
            default: 'Dark'
        }

    }
}

export default meta;
type Story = StoryObj<typeof Badge>

export const Primary: Story = {
    args: {
        children: <GoHomeFill/>,
        variant: 'filled',
    }
}
export const Icon: Story = {
    args: {
        children: <GoHomeFill/>,
        variant: 'icon',
    }
}