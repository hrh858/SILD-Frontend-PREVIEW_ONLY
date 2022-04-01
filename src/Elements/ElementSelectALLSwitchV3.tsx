import React, { ReactElement } from 'react'
import { defSeachBackground,  defWhiteColor } from '../Shared/Colors'



interface Props {
    text:string;
    element:ReactElement;
}

export default function ElementSelectALLSwitchV3(props: Props) {
    return (       
            <div
            style={{
                display: "flex",
                alignContent:"center",
                alignItems:"center",
                borderRadius: "1.5rem",
                backgroundColor: defSeachBackground,
                paddingRight:"0.3rem",
                paddingLeft:"0.41rem",
                height: "100%",
                gap:"1rem"
            }}> 
            {props.element}                       
            {props.text !== ""?
                    <span style={{
                        color: defWhiteColor,
                        fontSize:"1.1rem",
                    }}>{props.text}</span>
                    :""}
            </div>        
    )
}




