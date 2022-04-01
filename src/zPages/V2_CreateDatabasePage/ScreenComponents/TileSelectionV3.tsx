import React, { useEffect, useState } from 'react'
import ReactTooltip from 'react-tooltip'
import ElementTile from '../../../Elements/ElementTile'
import LayoutElement from '../../../Elements/LayoutElement'

interface Props {
    body: any
    onChange: (values: any[]) => void
    onValidate: (validationWasCorrect: boolean) => void
    previousInput: any
    maxHeighTileContainer?:string
}

interface iInputDataComp {
    id: any;
    name: string;
    hoverText: string;
}

interface iOutputDataComp {
    id: any;
    name: string;
}

function TileSelectionV3(props: Props) {
    const values:iInputDataComp[] = props.body.values;


    const [addedValues, setAddedValues] = useState<iOutputDataComp[]>([])
    const [selectAllActive, setSelectAllActive] = useState<boolean>(false)
    const [visibleValues, setVisibleValues] = useState<iInputDataComp[]>([...values])

    // --------------------------------------------------------------------------------
    // INITIAL VALUES
    // --------------------------------------------------------------------------------
    useEffect(() => {
        if(props.previousInput===undefined )
        {        
            if (props.body.defaultSwitchState && props.body.defaultSwitchState === true) {
                let toAdd = []
                for (let value of values) {
                    toAdd.push({ id: value.id, name: value.name })
                }
                setAddedValues(toAdd)
                setSelectAllActive(true)
            }
        }
        else
        {
            let toAdd = []
            for (let prevVal of props.previousInput) {
                toAdd.push({ id: prevVal.id, name: prevVal.name })
            }
            setAddedValues(toAdd)
            if(props.previousInput.length === values.length) setSelectAllActive(true)

        }
        // //console.log("previousInput",props);
    }, [])
    
    // --------------------------------------------------------------------------------
    // DEFAULT VALUE - canProceed? 
    // --------------------------------------------------------------------------------
    useEffect(() => {
        // if (addedValues.length>0 || Object.keys(values).length === 0) props.onValidate(true);
        if (addedValues.length>0 ) props.onValidate(true);
        else props.onValidate(false);
    }, [addedValues])

    // --------------------------------------------------------------------------------
    // UPDATE OUTPUT
    // --------------------------------------------------------------------------------
    useEffect(() => {
        props.onChange([...addedValues])
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
        let aux:iInputDataComp[] = []
        for (let value of values) {
            if (value.name.toLowerCase().includes(text.toLowerCase())) aux.push(value)
        }
        setVisibleValues(aux)
    }
    const selectAll = (active: boolean) => {
        let aux = []
        if (active) {
            for (let value of values) {
                aux.push({ id: value.id, name: value.name })
            }
        } else {
            aux = []
        }
        setSelectAllActive(active)
        setAddedValues(aux)
    }



    const fcn_renderComponent = ()=>{
        return <div style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent:'center',
            alignItems:'flex-start',  
            alignContent: 'flex-start',            
            paddingTop:"10px",
            paddingBottom:"1rem",   
            maxHeight:props.maxHeighTileContainer?props.maxHeighTileContainer:"",                
        }}
            
        >       
            <ReactTooltip effect="solid" place="bottom" />
            {
                visibleValues.map((value) => {
                    return <div
                        data-tip={value.hoverText ? value.hoverText : null}
                    >
                        <ElementTile
                            active={isInAdded(value)}
                            name={value.name}
                            description={undefined}
                            type={"string"}
                            showFullText ={true}
                            onChange={(active) => {
                                props.body.singleChoice ?
                                    addSingle(value, active) :
                                    addMultiple(value, active)
                            }}
                        />
                        </div>
                })
            }            
        </div>
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

export default TileSelectionV3
