import React, { useEffect, useState } from 'react'
import ElementTextField from '../../../Elements/ElementTextField'
import LayoutElement from '../../../Elements/LayoutElement'

interface Props {
    body: any
    onChange: (output: any) => void
    onValidate: (validationWasCorrect: boolean) => void
    previousInput: any
}

interface iInputDataComp {
    id: number;
    name: string;
    realName: string;
}

interface iOutputDataComp {
    id: number;
    name: string;
    realName: string;
}

function InputString(props: Props) {    
    // TEXTO SUPERIOR (PROPS)
    const [values, setValues] = useState<iInputDataComp[]>([])
    const [visibleValues, setVisibleValues] = useState<iInputDataComp[]>([])

    // --------------------------------------------------------------------------------
    // INITIAL VALUES
    // --------------------------------------------------------------------------------
    useEffect(() => {
        const defaultRealName = () => 'unknown'
        let aux:iInputDataComp[] = [];
        for (let value of props.body.values) {
            let newValue = value
            const prevValue = props.previousInput?.find((el:iInputDataComp)=>el.id===value.id);
            if(prevValue !== undefined) newValue = prevValue;
            if (!newValue.realName) newValue.realName = defaultRealName();
            aux.push(newValue)
        }
        setVisibleValues([...aux])        
        setValues([...aux])       
    }, [])

    // --------------------------------------------------------------------------------
    // CanProceed? 
    // --------------------------------------------------------------------------------
    useEffect(() => {
        if(Object.keys(props.body.values).length === 0) props.onValidate(true);
        else if(props.body.canBeEmpty !== undefined && props.body.canBeEmpty === true ) props.onValidate(true);
        else{
            if(values.every((tempAux:iOutputDataComp)=>tempAux.name.length>0)) props.onValidate(true);
            else props.onValidate(false);
        }   

    }, [values])

    // --------------------------------------------------------------------------------
    // UPDATE OUTPUT
    // --------------------------------------------------------------------------------
    useEffect(() => {
        props.onChange([...values])  
    }, [values])


    const changeInput = (idx: number, input: string) => {
        let aux:iOutputDataComp[] = [...values]
        aux[idx].name = input
        setValues(aux)            
    }

    const filter = (text: string) => {
        let aux = []
        for (let value of values) {
            if (value.name.toLowerCase().includes(text.toLowerCase())) aux.push(value)
        }
        setVisibleValues([...aux])
    }   

    const fcn_renderComponent = ()=>{
    return ( 
        <div style={{
            display: "flex", flexDirection: "column",
            padding: "1rem", gap: "1rem", 
        }}>  
        {
        values.map((value: iInputDataComp, idx: number) => {
            return (
            <div style={{display:visibleValues.find((el:iInputDataComp)=>el.id===value.id)?'':'none'}}>
                <ElementTextField
                    defaultText={value.name}
                    leftText={value.realName}
                    maxLenght={null}
                    negColor={true}
                    onChange={(input) => changeInput(idx, input)}
                />
            </div>
            )
        })
        }
        </div>
    )
    }
            
    if(values.length === 0) return null
    return (      
        <LayoutElement        
            propsComp = {props.body}
            infoSearch={{
                text:"",
                onChange:(search) => filter(search)
            }}
    
            elementRender={fcn_renderComponent()}
        />  
    )
}

export default InputString
