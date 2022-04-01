import React, { useEffect, useState } from 'react'
import ElementHorizontalTile from '../../../Elements/ElementHorizontalTile'
import LayoutElement from '../../../Elements/LayoutElement'

interface Props {
    body: any
    onChange: (output: any) => void
    onValidate: (validationWasCorrect: boolean) => void
    previousInput: any
}

interface iInputDataComp {
    id: any;
    name: string;
    defaultValue: boolean;
    hoverInfo:string;
}

interface iOutputDataComp {
    id:any;
    name:string;
}

function BooleanSelectionV2(props: Props) {
    const values:iInputDataComp[] = props.body.values;
    const previousInput = props.previousInput;

    const [addedValues, setAddedValues] = useState<iOutputDataComp[]>([])
    const [selectAllActive, setSelectAllActive] = useState<boolean>(false)
    const [visibleValues, setVisibleValues] = useState<iInputDataComp[]>([...values])


    // --------------------------------------------------------------------------------
    // INITIAL VALUES
    // --------------------------------------------------------------------------------
    useEffect(() => {
        let aux:iOutputDataComp[] = []
        if(previousInput===undefined)
        {
            for (let value of values) {
                if (value.defaultValue === true){
                    aux.push(value)
                } 
            }   
        }     
        else aux = previousInput;
        setAddedValues(aux)
        setVisibleValues(values)        
    }, [])

    // --------------------------------------------------------------------------------
    // CanProceed? 
    // --------------------------------------------------------------------------------
    useEffect(() => {
        if(addedValues.length>0 || Object.keys(props.body.values).length === 0)  props.onValidate(true)  
        else  props.onValidate(false)  
    }, [addedValues])

    /// --------------------------------------------------------------------------------
    // UPDATE OUTPUT
    // --------------------------------------------------------------------------------
    useEffect(() => {
        props.onChange(addedValues)
        // console.log("addedValues", addedValues)
    }, [addedValues])
    
    const isInAdded = (value: iInputDataComp): boolean => {
        for (let currVal of addedValues) if (currVal.id === value.id) return true
        return false
    }
    const addSingle = (value: iInputDataComp, active: boolean) => {
        if (selectAllActive) setSelectAllActive(false)
        let aux = []
        if (active) aux.push({ id: value.id, name: value.name })
        setAddedValues(aux)
    }
    const addMultiple = (value: iInputDataComp, active: boolean) => {
        if (selectAllActive) setSelectAllActive(false)
        let aux = [...addedValues]
        if (active) {
            aux.push({ id: value.id, name: value.name })
        } else {
            let idx = aux.findIndex((val)=>{return val.id === value.id})
            aux.splice(idx, 1)
        }
        setAddedValues(aux)
    }

    const filter = (text: string) => {
        let aux = []
        for (let value of values) {
            if (value.name.toLowerCase().includes(text.toLowerCase())) aux.push(value)
        }
        setVisibleValues(aux)
    }

    const selectAll = (active: boolean) => {
        setSelectAllActive(active)
        let aux = [...values]
        if (!active) aux = []
        setAddedValues(aux)
    }

    const fcn_renderComponent = ()=>{
    return ( 
            <div style={{
                display: "flex", flexDirection: "column",
                padding: "1rem", gap: "1rem", width: "100%"
            }}>                  
            {
                visibleValues.map((value: iInputDataComp) => {
                    return <ElementHorizontalTile
                                value={value}
                                active={isInAdded(value)}
                                onChange={(active) => {
                                    props.body.singleChoice ?
                                        addSingle(value, active) 
                                        :
                                        addMultiple(value, active)
                                }}
                            />
                        
                    
                })
            }
            </div>  
    )
    }

    if(values.length === 0) return null
    return (
        <LayoutElement        
            propsComp = {props.body}
            infoSelec= {{
                text:"Seleccionar todas",
                active:selectAllActive,
                onChange:(active:boolean) => selectAll(active)
                }}
            infoSearch={{
                text:"",
                onChange:(search) => filter(search)
            }}
    
            elementRender={fcn_renderComponent()}
        />          
    )
}

export default BooleanSelectionV2