import React, { useEffect, useState } from 'react'
import ElementExpandibleTitle from '../../../Elements/ElementExpandibleTitle'
import ElementSwitch from '../../../Elements/ElementSwitch'
import ElementTextSide from '../../../Elements/ElementTextSide'
import LayoutElement from '../../../Elements/LayoutElement'

interface Props {
    body: any
    onChange: (output: any) => void
    onValidate: (validationWasCorrect: boolean) => void
    previousInput: any
}

interface iList {
    id: any;
    name: string;
    activeByDefault: boolean;
}

interface iInputDataComp {
    id: any;
    name: string;
    hoverInfo?:string;
    expandedByDefault: boolean;
    varList:iList[];
}

interface iSelected {
    id: any;
    name: string;
}

interface iOutputDataComp {
    id: any;
    name: string;
    varSelected:iSelected[];
}



function MultiBooleanSelection(props: Props) {
    const values:iInputDataComp[] = props.body.values;
    const previousInput  = props.previousInput;

    // TEXTO SUPERIOR (PROPS)
    const [currentOutput, setCurrentOutput] = useState<iOutputDataComp[]>([])
    const [expandedGroups, setExpandedGroups] = useState<string[]>([])
    const [visibleValues, setVisibleValues] = useState<iInputDataComp[]>([...values])

    
    // --------------------------------------------------------------------------------
    // INITIAL VALUES 
    // --------------------------------------------------------------------------------
    useEffect(() => {        
        let expandedGroups: string[] = []
        if(previousInput!==undefined)
        {
            const arrayOutput:iOutputDataComp[] = [...previousInput];
            for (let el of previousInput)
            {
                expandedGroups.push(el.id)
            }
            setCurrentOutput(arrayOutput)
        }
        setExpandedGroups(expandedGroups)    
         
    }, [])
    // --------------------------------------------------------------------------------
    // CanProceed? 
    // --------------------------------------------------------------------------------
     useEffect(() =>
     {   
        if(currentOutput.length>0 || Object.keys(props.body.values).length === 0)  props.onValidate(true)    
        else  props.onValidate(false)    
     },[currentOutput])

    // --------------------------------------------------------------------------------
    // UPDATE OUTPUT
    // -------------------------------------------------------------------------------- 
    useEffect(() =>
    {   
        props.onChange([...currentOutput]) 
    },[currentOutput])


    function addVar(varGroupId: number, varGroupName: string, varId: string, varName: string) {
        let aux =  props.body.singleChoice? []:[...currentOutput]
        let groupIdx = aux.findIndex((group) => group.id === varGroupId)
        if (groupIdx < 0) {
            aux.push({
                id: varGroupId,
                name: varGroupName,
                varSelected: [{id: varId, name: varName}]
            })
        } else {
            let varIdx = aux[groupIdx].varSelected.findIndex((varia: iSelected) => varia.id === varId)
            if (varIdx < 0) {
                aux[groupIdx].varSelected.push({id: varId, name: varName})
            } else {
                aux[groupIdx].varSelected.splice(varIdx, 1)
                if (aux[groupIdx].varSelected.length  === 0) {
                    aux.splice(groupIdx, 1)
                }
            }
        }
        setCurrentOutput(aux)
    }

    

    const expandGroup = (expanded: boolean, groupId: string) => {
        //console.log("EXPANDING")
        let aux = [...expandedGroups]
        if (expanded) {
            aux.push(groupId)
        }
        else {
            let idx = aux.indexOf(groupId)
            aux.splice(idx, 1)
        }
        setExpandedGroups(aux)
    }

    const inExpandedGroups = (groupId: string) => {
        return expandedGroups.indexOf(groupId) >= 0
    }

    const inSelectedOptions = (groupId: string, optionId: string) => {
        let groupIdx = currentOutput.findIndex((group: iOutputDataComp) => group.id === groupId)
        if (groupIdx < 0) return false
        else {
            let varIdx = currentOutput[groupIdx].varSelected.findIndex((varia: iSelected) => varia.id === optionId)
            if (varIdx < 0) return false
        }
        return true
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
            <div style={{width: "100%", gap: "1rem",
            display: "flex", flexDirection: "column", 
            alignItems: "center",
            justifyContent: "flex-start",                                
            padding:'5px',
            paddingBottom:'15px',
            }}
            >
            {
                values.map((group: iInputDataComp, groupIdx: number) => {
                    return(
                        <div style={{display:visibleValues.find((el:iInputDataComp)=>el.id===group.id)?'':'none',width:'100%'}}>
                        <ElementExpandibleTitle
                        title={group.name}
                        hoverInfo = {group.hoverInfo}
                        expanded={inExpandedGroups(group.id)}
                        onChange={()=>{}}
                        onClickTitle={() => {expandGroup(!inExpandedGroups(group.id), group.id)}}
                        elements={[
                            props.body.values[groupIdx].varList.map((option: iList, optionIdx: number) => {
                                return <ElementTextSide
                                    text={option.name}
                                    boldText={false}
                                    element={
                                        <ElementSwitch
                                            active={inSelectedOptions(group.id, option.id)}
                                            onChange={() => {addVar(group.id, group.name, option.id, option.name)}}                                            
                                        />
                                    }
                                />
                            })
                        ]}
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

export default MultiBooleanSelection

