import {Meta, StoryObj} from "@storybook/react";
import Typography from "./Typography";
import {BrowserRouter} from "react-router-dom";
import { AiFillAlert } from "react-icons/ai";


const meta: Meta = {
    title: 'common/Typography',
    component: Typography,
    tags: ['autodocs'],
    decorators:[
        (Story)=>(
            //importing Browser Router because Typography link variant using Link component from react router dom
            <BrowserRouter>
                <Story/>
            </BrowserRouter>
        )
    ],
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
export const H1: Story = {
    storyName: 'H1',
    args:{
        children: 'Typography',
        variant: "h1"
    }
}
export const H2: Story = {
    storyName: 'H1',
    args:{
        children: 'Typography',
        variant: "h2"
    }
}
export const H3: Story = {
    storyName: 'H3',
    args:{
        children: 'Typography',
        variant: "h3"
    }
}
export const H4: Story = {
    storyName: 'H4',
    args:{
        children: 'Typography',
        variant: "h4"
    }
}
export const H5: Story = {
    storyName: 'H5',
    args:{
        children: 'Typography',
        variant: "h5"
    }
}
export const H6: Story = {
    storyName: 'H6',
    args:{
        children: 'Typography',
        variant: "h6"
    }
}
export const Link: Story = {
    storyName: 'Link',
    args: {
        children: 'Typography',
        variant: 'h2',
        link: 'https://youtube.com'
    }
}
export const WithIcon: Story = {
    storyName: 'IconWith',
    args: {
        children: 'Typography',
        variant: 'h2',
        icon: <AiFillAlert/>,
    }
}
export const DIV: Story = {
    storyName: 'H6',
    args:{
        children: 'Typography',
        variant: "div"
    }
}
export const Overline: Story = {
    storyName: 'Overline',

    args:{
        children: 'Typography',
        variant: "overline"
    }
}
export const Subtitle1: Story = {
    storyName: 'Subtitle 1',
    args:{
        children: 'Typography',
        variant: "subtitle1"
    }
}
export const Subtitle2: Story = {
    storyName: 'Subtitle 2',
    args:{
        children: 'Typography',
        variant: "subtitle2"
    }
}
