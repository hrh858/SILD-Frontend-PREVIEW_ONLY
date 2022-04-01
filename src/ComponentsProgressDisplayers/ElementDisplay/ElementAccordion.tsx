import React,{ReactElement} from 'react'
import { Accordion, AccordionDetails, AccordionSummary,  } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import { defMainThemeColor, defWhiteColor,defBorderRadius ,defScrollBar} from '../../Shared/Colors'
import { defShadow } from '../../Shared/Shadows'

import styled from "styled-components"

export const ContainerDetails = styled.div`

&::-webkit-scrollbar {
        width: 0.35rem !important ; 
        display: flex;
    }
&::-webkit-scrollbar-thumb  {
    background: ${defScrollBar}; 
    border:none ;
    border-radius: 0.3rem;
}
&::-webkit-scrollbar-track {
      margin-bottom: ${defBorderRadius};
      margin-top: 0.5rem;
    }  
`


interface Props {
    id:string;
    summaryElement:ReactElement
    detailElement:ReactElement[]
    propsElem?:{numColumns?:number, backgroundColor?:string, unboundedMaxHeigh?:boolean }
}

function ElementAccordion(props: Props) {
    return  <Accordion 
        id={props.id}     
        style={{
        borderRadius: "1rem",
        backgroundColor: props.propsElem?.backgroundColor? props.propsElem.backgroundColor:defWhiteColor,
        color: defMainThemeColor,
        border: "2px solid "+ defMainThemeColor,
        boxShadow: defShadow,
        width:"100%",
        
    }}>
        <AccordionSummary
            expandIcon={<ExpandMore style={{ color: defMainThemeColor }} />}
            aria-controls="panel1a-content"
            id={props.id}            
            style={{maxHeight:"3rem", minHeight:"0px", textAlign:"left"}}  
        >
           {props.summaryElement}           
        </AccordionSummary>
        <AccordionDetails style={{
             paddingTop: "0px",
             paddingBottom:"0px" ,
             paddingRight:"5px" ,
             paddingLeft:"5px" ,
            
        }}>
            <ContainerDetails style={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: props.propsElem?.numColumns?"repeat("+props.propsElem?.numColumns+","+Math.round(100/props.propsElem?.numColumns)+"%)": "repeat(2,50%)",
                    gap: "0.5rem",
                    padding: "1.3rem 0.5rem",
                    borderTop: '1px solid rgba(0, 0, 0, .125)',  
                    justifyContent:"center",
                    maxHeight: props.propsElem?.unboundedMaxHeigh?"":"15rem",   
                    overflowY:"auto",         
                    overflowX: "hidden",            
                }}
            >
                {props.detailElement}
            </ContainerDetails>
            
        </AccordionDetails>
    </Accordion>

}

export default ElementAccordion
