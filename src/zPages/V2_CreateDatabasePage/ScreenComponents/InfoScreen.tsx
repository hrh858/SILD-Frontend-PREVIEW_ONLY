import React, { useEffect } from 'react'
import ElementInfoCard from '../../../Elements/ElementInfoCard'
import LayoutElement from '../../../Elements/LayoutElement'

interface Props {
    body: any
    onChange: (output: any) => void
    onValidate: (validationWasCorrect: boolean) => void
}

function InfoScreen(props: Props) {

    // --------------------------------------------------------------------------------
    // CanProceed? 
    // --------------------------------------------------------------------------------
    useEffect(() =>
    {      
        props.onValidate(true);        
    },[])

    const fcn_renderComponent = ()=>{
        return ( 
        <div style={{width: "100%", gap: "1rem",
            display: "flex", flexDirection: "column", 
            alignItems: "center",
            justifyContent: "flex-start",                                
            padding:'5px',
            }}
        >
            {
            props.body.values.map((valueText: any) => {
            return <ElementInfoCard text={valueText.text}/>
            })
            }
        </div>
        )
    }

    return (
        <LayoutElement        
                    propsComp = {props.body}  
                    elementRender={fcn_renderComponent()}
                />   

    )
}

export default InfoScreen
