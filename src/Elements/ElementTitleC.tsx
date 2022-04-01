import React from 'react'
import { defMainThemeColor } from '../Shared/Colors'

interface Props {
    text: string
}

function ElementTitleC(props: Props) {
    const {} = props

    return (
        <div style={{
            display: "flex",
                width:'100%',
                alignItems: "center",
                alignContent:'center',
                justifyContent:'center',
                justifyItems:'center',
                backgroundColor:defMainThemeColor,
                padding:'0.5rem 0'
        }}>
            <span style={{fontSize:'1.2rem',color:'white'}}><b>{props.text}</b></span>            
        </div>
    )
}

export default ElementTitleC
