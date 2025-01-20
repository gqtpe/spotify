import {Meta, StoryObj} from "@storybook/react";
import Typography from "./Typography";
import {BrowserRouter} from "react-router-dom";
import { AiFillAlert } from "react-icons/ai";


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

export const Variants: Story = {
    storyName: 'All Typographies',
    render: ()=>{
        return <div>
            <Typography variant="h1">Lorem ipsum dolor sit amet.</Typography>
            <Typography variant="h2">Lorem ipsum dolor sit amet.</Typography>
            <Typography variant="h3">Lorem ipsum dolor sit amet.</Typography>
            <Typography variant="h4">Lorem ipsum dolor sit amet.</Typography>
            <Typography variant="h5">Lorem ipsum dolor sit amet.</Typography>
            <Typography variant="h6">Lorem ipsum dolor sit amet.</Typography>
            <Typography variant="h6" link="https://youtube.com">Lorem ipsum dolor sit amet.</Typography>
            <Typography variant="h6" icon={<AiFillAlert/>}>Lorem ipsum dolor sit amet.</Typography>

            <Typography variant="overline">Lorem ipsum dolor sit amet.</Typography>
            <Typography variant="div">Lorem ipsum dolor sit amet.</Typography>
            <Typography variant="subtitle1">Lorem ipsum dolor sit amet.</Typography>
            <Typography variant="subtitle2">Lorem ipsum dolor sit amet.</Typography>

        </div>
    }
}