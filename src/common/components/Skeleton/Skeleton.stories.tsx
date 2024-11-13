import {Meta, StoryObj} from "@storybook/react";
import Skeleton from "./Skeleton.tsx";
import Typography from "../Typography/Typography.tsx";
import {CSSProperties} from "react";


const meta: Meta = {
    title: 'common/Skeleton',
    component:Skeleton,
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


type Story = StoryObj<typeof Skeleton>



export const Default: Story = {
    args: {
        width: 200,
        height: 200,
    }
}
export const Text: Story = {
    args:{
      animation: 'pulsate'
    },
    render: (args) => <div>
        <div style={{color: 'white'}}>H1: <Typography variant="h1"><Skeleton {...args}/></Typography></div>
        <div style={{color: 'white'}}>H2: <Typography variant="h2"><Skeleton {...args}/></Typography></div>
        <div style={{color: 'white'}}>H3: <Typography variant="h3"><Skeleton {...args}/></Typography></div>
        <div style={{color: 'white'}}>H4: <Typography variant="h4"><Skeleton {...args}/></Typography></div>
        <div style={{color: 'white'}}>H5: <Typography variant="h5"><Skeleton {...args}/></Typography></div>
        <div style={{color: 'white'}}>H6: <Typography variant="h6"><Skeleton {...args}/></Typography></div>
        <div style={{color: 'white'}}>BODY1: <Typography variant="subtitle1"><Skeleton {...args}/></Typography></div>
        <div style={{color: 'white'}}>BODY2: <Typography variant="subtitle2"><Skeleton {...args}/></Typography></div>
        <div style={{color: 'white'}}>Caption: <Typography variant="caption"><Skeleton {...args}/></Typography></div>
        <div style={{color: 'white'}}>Caption: <Typography variant="overline"><Skeleton {...args}/></Typography></div>
    </div>
}
export const Image: Story = {
    args: {
        width: 50,
        height: 50,
        round: true
    }
}
export const Card: Story = {
    render: () =>{
        const styles: CSSProperties = {
            display: 'flex',
            gap: 8,
            alignItems: 'center',
        }
        return <div style={styles}>
            <Skeleton width={50} height={50} round animation={"pulsate"}/>
            <div style={{...styles, flexDirection: 'column'}}>
                <div style={{color: 'white'}}><Typography variant="caption"><Skeleton animation={"pulsate"} /></Typography></div>
                <div style={{color: 'white'}}><Typography variant="caption"><Skeleton animation={"pulsate"} /></Typography></div>
            </div>
        </div>
    }
}