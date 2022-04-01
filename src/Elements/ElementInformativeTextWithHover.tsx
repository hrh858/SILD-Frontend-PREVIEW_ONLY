import React from 'react'
import * as colorDef from '../Shared/Colors'
import ElementInfoIcon from './ElementInfoIcon';

interface Props {
    descrip: string|undefined,
    hover?:string|undefined,
    display:boolean,
    isAlert?:boolean
}


function ElementInformativeTextWithHover(props: Props) {
 
    return (        
        <>
        {props.display && props.descrip && props.descrip !== ""?
            <div style={{
                // display: "flex",
                flexDirection: "row",
                alignItems: "center",
                alignContent:'center',
                justifyContent: "flex-start",
                padding: "0.5rem 1rem 0.5rem 1rem",
                color: props.isAlert?colorDef.defAlertBoxColor:colorDef.defBlackColor,
                gap:"10px",
                width: "100%",
                fontSize:'1.2rem',
                border: "1px solid lightgray",
                // borderRadius:"10px",
                backgroundColor:props.isAlert?colorDef.defAlertBoxBackground:"rgba(0,0,0,0.05)",
                // position: 'sticky',
                // top:'0px',
                textAlign:"left",
            }}        
            >
                {/* <p> */}
                <ElementInfoIcon
                    hover={props.hover}
                    isAlert = {props.isAlert}
                />
                {/* <span style={{
                    // fontWeight: "bold",
                    // textDecoration: "underline"
                    textAlign:"left",
                }}>{props.descrip}</span> */}
                <span style={{
                    // fontWeight: "bold",
                    // textDecoration: "underline"
                    textAlign:"left",
                }}
                dangerouslySetInnerHTML={{ __html:props.descrip }} 
                />

                {/* </p> */}
            </div>
            :null
        }
        </>
    )
}


const biggerStyle = { 
  fontSize: "5rem",
}

export default ElementInformativeTextWithHover