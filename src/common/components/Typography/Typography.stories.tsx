import {Meta, StoryObj} from "@storybook/react";
const meta: Meta = {
    title: 'common/Typography',
    component: Typography,
    tags: ['autodocs'],
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


type Story = StoryObj<typeof Typography>
