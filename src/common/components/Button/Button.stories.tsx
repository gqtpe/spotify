import Button from "./Button.tsx";
import {Meta, StoryObj} from "@storybook/react";


const meta: Meta<typeof Button> = {
    title: 'common/Button',
    component: Button,
    parameters: {
        backgrounds: {
            values: [
                // 👇 Default values
                {name: 'Dark', value: '#333'},
            ],
            default: 'Dark'
        }
    }
}


export default meta;

type Story = StoryObj<typeof Button>


export const Primary: Story = {
    args: {
        children: 'Button',
        variant: 'filled',
    }
}

export const Outlined: Story = {
    args: {
        children: 'Button',
        variant: 'outlined'
    },
}

export const Text: Story = {
    args: {
        children: 'Button',
        variant: 'text'
    }
}

