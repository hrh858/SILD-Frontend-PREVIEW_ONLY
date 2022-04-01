import React, { ReactElement } from 'react'
import { defBlackColor } from '../Shared/Colors'
import styled from 'styled-components'
import ElementSwitch from "./ElementSwitch"
import ElementTextSide from "./ElementTextSide"
import ElementSearchBoxV2 from "./ElementSearchBoxV2"


const StyledDiv = styled.div`
    display:flex;
    flex-wrap:wrap;
    gap:1.2rem;
    white-space: nowrap;
    justify-content:center;
    justify-items:center;
    align-content:center;
    align-items:center;
   
    /* padding:10px 10px 10px 10px; */
    /* border:1px solid #ced4da; */
    
    /* border-radius:10px; */
`

interface iElemSwitch {
    text:string;
    active:boolean;
    onChange: (active: boolean) => void
}

interface iElemSearch {
    text:string;
    onChange: (text: string) => void
}


interface Props {
    infoSelec?:iElemSwitch;
    infoSearch?:iElemSearch;
    display:boolean;
}

function ESelectALLBuscador(props: Props) {
    return (
        <>
        {props.display?
        <div style={{
                display: "flex",
                flexDirection: "row",
                flexWrap:'wrap',
                width: "100%",
                alignItems: "center",
                justifyContent: "space-around",
                gap:"1rem"
            }}>
                
                {props.infoSearch?
                <StyledDiv
                    style={{ width: "15rem",
                    height:'2.5rem',}}
                    >
                    <ElementSearchBoxV2
                        onChange={(search) => props.infoSearch?.onChange(search)}
                    />

                </StyledDiv>
                :null
                }    
                {props.infoSelec?
                <StyledDiv
                style ={{ padding:"10px 1rem 10px 1rem",
                    border:"1px solid #ced4da" ,
                    borderRadius:"1.5rem"}}
                    >
                    <ElementSwitch
                        active={props.infoSelec.active}
                        onChange={(active)=> props.infoSelec?.onChange(active)}
                    />
                    {props.infoSelec.text !== ""?
                    <span style={{
                        color: defBlackColor,
                        fontSize:"1.2rem",
                    }}>{props.infoSelec.text}</span>
                    :null
                    }  
                </StyledDiv>
                :null                
                }            
                
        </div>
        :null
        }
        </>
    )
}

export default ESelectALLBuscador
