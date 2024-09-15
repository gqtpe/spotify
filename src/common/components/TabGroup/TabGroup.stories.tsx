import TabGroup from "./TabGroup.tsx";
import {Meta, StoryObj} from "@storybook/react";
import TabItem from "./TabItem/TabItem.tsx";


const meta: Meta = {
    title: 'common/TabGroup',
    component: TabGroup,
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

type Story = StoryObj<typeof TabGroup>

export const Example: Story = {
    args: {
        value: 'tab',
        children: <TabItem value="all" label="All"/>,
        onChange: ()=>{}
    }
}