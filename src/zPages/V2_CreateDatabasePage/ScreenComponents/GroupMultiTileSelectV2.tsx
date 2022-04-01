import React, { useEffect, useState } from 'react'
import ElementExpandibleTitle from '../../../Elements/ElementExpandibleTitle'
import LayoutElement from '../../../Elements/LayoutElement'
import MultiTileSelect from './MultiTileSelectV2'
import {defBackGSubComp} from '../../../Shared/Colors'


interface Props {
    body: any
    onChange: (data: any[]) => void
    onValidate: (validationWasCorrect: boolean) => void
    previousInput: any
}

interface iList {
    id:any;
    name:string;
    hoverText: string;
}

interface iInputDataComp {
    id:any;
    name:string;
    varList: iList[];
}

interface iSelected {
    id:any;
    name:string;
}

interface iOutputDataGroupComp {
    id:any;
    name:string;
    varSelected: iOutputDataComp[];
}

interface iOutputDataComp {
    id:any;
    name:string;
    varSelected: iSelected[];
}



function GroupMultiTileSelect(propsComp: Props) {
    const props = propsComp.body;
    const values:iInputDataComp[] = props.values;
    const previousInput = propsComp.previousInput;

    const [ssExpandedGroups, setExpandedGroups] = useState<boolean[]>([]);
    const [ssOutput, setOutput] = useState<iOutputDataGroupComp[]>([]);
    const [visibleValues, setVisibleValues] = useState<iInputDataComp[]>([...values])

    // --------------------------------------------------------------------------------
    // CanProceed? 
    // --------------------------------------------------------------------------------
    useEffect(() =>
    {   
        if(values.length === 0 || ssOutput.some((el:iOutputDataGroupComp)=>el.varSelected.some((el2:iOutputDataComp)=>el2.varSelected.length>0))) propsComp.onValidate(true);
        else propsComp.onValidate(false)
    },[ssOutput])

    // --------------------------------------------------------------------------------
    // INITIAL VALUES
    // --------------------------------------------------------------------------------
    useEffect(() => {
        let arrayExpanded:boolean[] = [];
        let initOutput:iOutputDataGroupComp[] = [];   
        // if(previousInput===undefined)
        // {
        //     for (let value of values) {
        //         arrayExpanded.push(false);           
        //         initOutput.push({id:value.id,name:value.name,varSelected:[]});
        //     }
        // } 
        // else
        // {
        //     for (let el of previousInput) {
        //         arrayExpanded.push(false);                
        //     }
        //     initOutput = [...previousInput]
        // }

        for (let value of values) {
                arrayExpanded.push(false);           
                initOutput.push({id:value.id,name:value.name,varSelected:[]});
        }
        

        setOutput(initOutput);
        setExpandedGroups(arrayExpanded);
    }, [])

    // --------------------------------------------------------------------------------
    // UPDATE OUTPUT
    // --------------------------------------------------------------------------------
    useEffect(() =>
    {   
        //console.log("output",ssOutput)
        propsComp.onChange([...ssOutput]);  
    },[ssOutput])


    function expandGroup(index: number) {
        let newVal = [...ssExpandedGroups];
        newVal[index] = newVal[index] ? false: true        
        setExpandedGroups(newVal)
    }

    function isExpanded(index: number){
        return ssExpandedGroups[index]
    }

    const addOutput = (index: number,  output: iOutputDataComp[]) => {

        if(ssOutput.length>0){
            setOutput((prev:iOutputDataGroupComp[])=>{      
                let newSelected = [...prev];
                newSelected[index].varSelected = output?output:[];
                return [...newSelected]
                }
            )    
        } 
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
            }}
        >
        {
            values.map((rowGroup:iInputDataComp, index:number)=>{          
            return (
                <div style={{display:visibleValues.find((el:iInputDataComp)=>el.id===rowGroup.id)?'':'none',width:'100%'}}>
                    <ElementExpandibleTitle
                        title={rowGroup.name}
                        expanded={isExpanded(index)}
                        onChange={()=>{}}
                        onClickTitle={()=>{expandGroup(index)}}
                        backgroundColor = {defBackGSubComp}
                        elements={
                            [
                            <MultiTileSelect
                                key={index}
                                body={{values: rowGroup.varList,
                                    defaultSwitchState:props.defaultSwitchState,
                                    singleChoice:props.singleChoice}}
                                onChange={(output) => addOutput(index, output)}
                                onValidate={()=>{}}
                                // previousInput={previousInput?previousInput[index].varSelected:undefined}
                                previousInput={previousInput?previousInput.find((elpI:any)=>rowGroup.id === elpI.id)?.varSelected:undefined}
                                
                            />
                            ]
                        }
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
            propsComp = {props}
            infoSearch={{
                text:"",
                onChange:(search) => filter(search)
            }}

            elementRender={fcn_renderComponent()}
        />           
    )
}

export default GroupMultiTileSelect