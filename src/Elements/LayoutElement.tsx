import React, { ReactElement } from 'react'
import { defScrollBar } from '../Shared/Colors'
// import { defShadow } from './Shared/Shadows'
// import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import ElementInformativeTextWithHover from '../Elements/ElementInformativeTextWithHover'
import ESelectALLBuscadorV2 from '../Elements/ESelectALLBuscadorV2'
import styled from 'styled-components'

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
    elementRender:ReactElement;
    propsComp:any;
    infoSelec?:iElemSwitch;
    infoSearch?:iElemSearch;
}

function LayoutElement(props: Props) {
    const propsComp = props.propsComp;
    return (
        <div 
            style={{
            display: "flex",
            width:'100%',
            height: '100%',
            maxHeight:'100%',
            flexDirection: "column",
            alignItems: "center",
            alignContent:'center',
            padding:'10px',
            gap:'1rem',
            }}
            >
           
            <ElementInformativeTextWithHover
                descrip={propsComp.stringDescrip}
                hover={propsComp.hoverDescrip}
                display={true}
            /> 
            {propsComp.hoverAlert && 
                <ElementInformativeTextWithHover
                    descrip={propsComp.hoverAlert}
                    hover={"ALERTA"}
                    display={true}
                    isAlert
            />
            } 
            {/* <ESelectARLLBuscador */}
            {(!propsComp.disableSearcher) && <ESelectALLBuscadorV2
                infoSelec=
                {
                    !props.infoSelec ||
                    (propsComp.singleChoice && 
                    propsComp.singleChoice === true)
                    ?
                    undefined:props.infoSelec
                    
                }
                infoSearch={
                    props.infoSearch?
                    props.infoSearch:undefined
                }
                display={propsComp.values.length > 1}
            />}
            <ScreenContainer>
                {props.elementRender}
            </ScreenContainer>
        </div>
    )
}

const ScreenContainer = styled.div`
    width: 100%;
    height: 100%;                               
    overflow-y: scroll;
    overflow-x: scroll;
    max-height:100%; 
    display:flex;
    justify-content:center;
    &::-webkit-scrollbar {
        width: 0.35rem !important ; 
        height: 0.35rem !important ; 
        display: flex;
    }
    &::-webkit-scrollbar-thumb  {
        background: ${defScrollBar}; 
        border:none ;
        border-radius: 0.3rem;
    }
`

export default LayoutElement