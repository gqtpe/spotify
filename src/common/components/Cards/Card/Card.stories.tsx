import {Meta, StoryObj} from "@storybook/react";
import Card from "./Card.tsx";


const meta: Meta = {
    title: 'common/Card',
    component: Card,
    parameters: {
        backgrounds: {
            values: [
                {name: 'Dark', value: '#000000'},
            ],
            default: 'Dark'
        }
    },
    decorators: [
        (Story) => <div style={{  display: "grid",
            gridAutoRows: "auto",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}><Story/></div>
    ]
}
export default meta;
type Story = StoryObj<typeof Card>

export const Primary: Story = {
    args: {
        title: 'Card Title',
        subtitle: 'Artis Title',
        image: 'https://picsum.photos/id/237/200/300'
    },
}
export const Artist: Story = {
    args: {
        title: 'Title',
        round: true,
        subtitle: 'Sub Title',
        image: 'https://picsum.photos/id/237/200/300'
    },
}