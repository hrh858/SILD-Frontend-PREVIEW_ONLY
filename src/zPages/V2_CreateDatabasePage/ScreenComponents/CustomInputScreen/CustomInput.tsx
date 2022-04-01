import React, { useEffect, useState } from 'react'
import Form from "react-bootstrap/Form";
import ElementInputText from "../../../../Elements/ElementInputText"
import ElementTitleC from '../../../../Elements/ElementTitleC'
import LayoutElement from '../../../../Elements/LayoutElement'
import MySpreadsheet from './Spreadsheet/MySpreadsheet';


import * as colorDef from '../../../../Shared/Colors'

interface Props {
    body: any
    onChange: (data: any[]) => void
    onValidate: (validationWasCorrect: boolean) => void
    previousInput: any
}

// interface iInputDataComp {
//     id: any;
//     name: string;
//     values: string[];
// }

interface iOutputDataComp {
    id: any;
    name: string;
    values: string[];
}

function CustomInput(propsComp: Props) {
    const props = propsComp.body;
    // const values:iInputDataComp[] = [];
    const previousInput = propsComp.previousInput;

    const [ssOutput, setOutput] = useState<iOutputDataComp[]>([])



    // --------------------------------------------------------------------------------
    // INITIAL VALUES
    // --------------------------------------------------------------------------------
    useEffect(() =>
    {   
        
    },[])

    // --------------------------------------------------------------------------------
    // CanProceed? 
    // --------------------------------------------------------------------------------
    useEffect(() =>
    {   
        propsComp.onValidate(true);
    },[ssOutput])

    const fcn_renderComponent = ()=>{
        return ( 
            <div style={{
                display: "flex", 
                padding: "1rem", gap: "1rem", 
                width: "100%",
                height: "100%",
                color: 'black',
                // overflow: "scroll",

            }}>  
                <MySpreadsheet
                    onChange = {(output) => {  setOutput(output) }}
                    onValidate = {()=>{}}
                />
            
            </div>  
        )
    }

    return (
        <LayoutElement        
            propsComp = {props}            
            // infoSearch={{
            //     text:"",
            //     onChange:(search) => filter(search)
            // }}
    
            elementRender={fcn_renderComponent()}
        />   
    )
}

export default CustomInput
