import React from 'react'
import styled from 'styled-components'
import ElementSwitch from "./ElementSwitch"
import ElementSearchBoxV3 from "./ElementSearchBoxV3"
import ElementSelectALLSwitchV3 from "./ElementSelectALLSwitchV3"

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

function ESelectALLBuscadorV2(props: Props) {
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
                    <ElementSearchBoxV3
                                onChange={(search) => props.infoSearch?.onChange(search)}
                    />

                </StyledDiv>
                :null
                }    
                {props.infoSelec?
                <div 
                 style={{ 
                    width: "15rem",
                    height:'2.5rem',}}
                >
                                    
                    <ElementSelectALLSwitchV3 
                        text={props.infoSelec.text}
                        element={<ElementSwitch
                            active={props.infoSelec.active}
                            onChange={(active)=> props.infoSelec?.onChange(active)}
                            />
                            }                    
                        />           
                </div>         
                :null                
                }   
        </div>
        :null
        }
        </>
    )
}

export default ESelectALLBuscadorV2