import TabGroup from "./TabGroup.tsx";
import {Meta, StoryObj} from "@storybook/react";
import TabItem from "./TabItem/TabItem.tsx";
import {useState} from "react";


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
    args:{
        value: '1',

    },
    render: (args) => {
        const [value, setValue] = useState(args.value)
        return <TabGroup value={value} handleChange={setValue}>
            <TabItem value="1" label="Tab 1" />
            <TabItem value="2" label="Tab 2" />
            <TabItem value="3" label="Tab 3" />
        </TabGroup>
    }
}