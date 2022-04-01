import React from 'react'
import { FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa'
import {TooltipNAV} from './ElementStyledTooltip';
import { defInfoIcon, defAlertBoxColor } from '../Shared/Colors'


// "hoverDescrip": "<span style='font-size:1.8rem;color:red'>Daa1234.</span> <br>Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS Descrip MAS "

interface PropsText {
    text:string,
}

function H5Html (props: PropsText) {
    return (        
        <>
            <h5 style={{textAlign:'left',fontSize:'1rem',margin:"0px"}} dangerouslySetInnerHTML={{ __html:props.text }} />
        </>
    )
}

interface Props {
    hover:string|undefined,
    contrast?:boolean;
    isAlert?:boolean,
    position?:'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top';
}


function ElementInfoIcon(props: Props) {
    const fcn_buildHover = () => {
        if(props.hover){
            return(
                <TooltipNAV
                    title={<H5Html text={props.hover}/>}
                    arrow={true}
                    placement={props.position?props.position:'right-start'}
                >
                    <div
                         style={{ display: "inline",
                                marginRight:"0.5rem",
                                //  flexDirection: "row",
                                //  alignItems: "center",
                                //  alignContent:'center',
                                //  justifyContent: "center",
                                //  paddingBottom:"2px"
                                }}
                    >
                    {props.isAlert?  
                    <FaExclamationTriangle
                        style={{color:"red"}}
                    />
                    :    
                    <FaInfoCircle
                        style={{color:props.contrast?"white":defInfoIcon}}
                    />
                    }
                    </div>                    
                </TooltipNAV>
            )
        }
    }


    return (        
        <>
            {fcn_buildHover()}
        </>
    )
}



export default ElementInfoIcon