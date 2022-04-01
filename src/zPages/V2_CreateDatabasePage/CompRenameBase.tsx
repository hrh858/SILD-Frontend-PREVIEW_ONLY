import React, { useState } from 'react'
import styled from 'styled-components'
import { BiRename } from 'react-icons/bi'
import {FaExclamationCircle} from 'react-icons/fa/'

// MY COMPONENTS -  ELEMENTS
import { TooltipNAV } from '../../Elements/ElementStyledTooltip'

// MODELS

// SHARE
import * as sharedColors from '../../Shared/Colors'

// API




const MyDivRename = styled.div` 
background-color: ${sharedColors.defCreateBaseNombreBaseButtonBackground}; 
padding: 0.2rem 0.5rem;
border-radius: 0.25rem;
display: flex;
align-items:center;
justify-content: space-between;
gap: 1rem;
/* margin: 0 1rem; */
margin-bottom: 0.3rem;
font-size:1.2rem;
border: 1px solid lightgray;
background-color:${sharedColors.defInfoBackground};

&:hover{

}
`
const IconContainer = styled.div`
cursor: pointer;
width: 1.5rem;
height: 1.5rem;
border-radius: 50%;
background-color: ${sharedColors.defMainThemeColor};
color:${sharedColors.defWhiteColor};
display: flex;
align-items: center;
align-content: center;
justify-content: center;
justify-items: center;
&:hover{
    transform:scale(1.1);
}
`


interface Props {
    baseName: string
    onClickRename(): void
}

function CompRenameBase(props:Props) {
    const ssBaseName = props.baseName;
    const getRealBaseName = ()=>{
        if(ssBaseName !== "" && ssBaseName[0] === "0" && ssBaseName[1] === ";"){

            return ssBaseName.slice(2);
        }
        return ssBaseName
    }
    return (
        <TooltipNAV 
            title={"Nombre de la base"}
            arrow
            placement={'top'}
            >
        <MyDivRename style={{}}>
            {
                ssBaseName ?
                    <span style={{ color: sharedColors.defCreateBaseNombreBaseButton, marginLeft:"0.3rem"  }}><b>{"BASE: "}</b> {getRealBaseName()}</span> 
                    :
                    <div style= {{display:"flex" ,gap:"0.7rem", alignItems:"center"}}>
                        <FaExclamationCircle style={{ color: sharedColors.defRedColor,  }} size={"1.2rem"}/>
                        <span style={{ color: sharedColors.defCreateBaseNombreBaseButton }}>Defina un nombre para la base de datos</span>
                    </div>
            }
            <IconContainer
                onClick={props.onClickRename}
            >
                <BiRename size={"70%"}/>
            </IconContainer>
        </MyDivRename>
        </TooltipNAV>
    )
}

export default CompRenameBase
