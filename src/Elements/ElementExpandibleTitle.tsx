import React, { ReactElement } from 'react'
import { defBlackColor, defWhiteColor, defSelectedElem } from '../Shared/Colors'
import { defShadow } from '../Shared/Shadows'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import ElementInfoIcon from '../Elements/ElementInfoIcon'

interface Props {
    title: string
    expanded: boolean
    elements: ReactElement[]
    onChange: (active: boolean) => void
    onClickTitle: () => void
    backgroundColor?:string
    allSelected?:boolean
    hoverInfo?:string
}

function ElementExpandibleTitle(props: Props) {
    return (
        <div style={{
            backgroundColor:  props.backgroundColor?props.backgroundColor:defWhiteColor,
            borderRadius: "1rem",
            boxShadow: defShadow,
            width: "100%",
            display: "flex",
            flexDirection: "column"
        }}>
            <button style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: props.expanded ? "1rem 1rem 0rem 1rem" : '1rem 1rem 1rem 1rem' ,
                border: 0, borderRadius: "1rem",
                backgroundColor: props.backgroundColor?props.backgroundColor:defWhiteColor
            }}
            onClick={() => props.onClickTitle()}>
                <div  style={{
                        width: '100%',
                        display: "flex",
                        justifyContent: "space-between",
                        // gap:"1rem",
                        paddingRight:'1rem',
                    }}>
                    <div  style={{
                        // width: '100%',
                        display: "flex",
                        justifyContent: "flex-start",
                        gap:"1rem",
                        // paddingRight:'1rem',
                    }}>
                        <ElementInfoIcon
                            hover={props.hoverInfo}
                            contrast={false}
                            position={'bottom-start'}
                        />  
                        <span style={{color: defBlackColor, fontWeight: 'bold'}}>
                            {props.title}
                        </span>
                    </div>
                  
                    {props.allSelected && <span style={{backgroundColor:defSelectedElem,color:"white",padding:"0.2rem 0.5rem", borderRadius:"1rem", fontSize:"0.8rem"}}>Todas Selec.</span>}
                </div>
                {
                    props.expanded ? 
                    <FaArrowUp style={{color: defBlackColor}}/> :
                    <FaArrowDown style={{color: defBlackColor}}/>
                }
            </button>
            <hr style={{
                display: props.expanded ? 'flex' : 'none',
                width: "calc(100% - 30px)"
            }}/>
            <div style={{
                display: props.expanded ? 'flex' : 'none',
                flexDirection: "column",
                gap: "0.5rem",
                padding: "1rem 1rem 1rem 1rem"
            }}>
                {props.elements}
            </div>
        </div>
    )
}

export default ElementExpandibleTitle