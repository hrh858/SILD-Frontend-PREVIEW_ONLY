import React, { useEffect, useState } from 'react'
import ElementExpandibleTitle from '../../../Elements/ElementExpandibleTitle'
import TileSelectionV3 from './TileSelectionV3'
import LayoutElement from '../../../Elements/LayoutElement'
import  {maxHeightSubComponent} from '../../../Shared/Attributes'
 
interface Props {
    body: any
    onChange: (data: any[]) => void
    onValidate: (validationWasCorrect: boolean) => void
    previousInput:  any
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

interface iOutputDataComp {
    id:any;
    name:string;
    varSelected: iSelected[];
    max:number
}



function MultiTileSelect(propsComp: Props) {
    const props = propsComp.body;
    const values:iInputDataComp[] = props.values;
    const previousInput = propsComp.previousInput;

    const [ssExpandedGroups, setExpandedGroups] = useState<boolean[]>([]);
    const [ssOutput, setOutput] = useState<iOutputDataComp[]>([]);
    const [visibleValues, setVisibleValues] = useState<iInputDataComp[]>([...values])
   
    // --------------------------------------------------------------------------------
    // DEFAULT VALUE - canProceed? 
    // --------------------------------------------------------------------------------
    useEffect(() =>
    {   
        if(values.length === 0 || ssOutput.every((el:iOutputDataComp)=>el.varSelected.length>0)) propsComp.onValidate(true);
        else propsComp.onValidate(false)
    },[ssOutput])

    // --------------------------------------------------------------------------------
    // INITIAL VALUES
    // --------------------------------------------------------------------------------
    useEffect(() => {
        let arrayExpanded:boolean[] = [];
        let initOutput:iOutputDataComp[] = [];  
        
        for (let value of values) {            
            // const prevValue = previousInput?.find((el:iInputDataComp)=>el.id===value.id);
            arrayExpanded.push(false);
            initOutput.push({
                id:value.id,
                name:value.name,
                // varSelected:prevValue !== undefined?prevValue.varSelected:[],
                varSelected:[],
                max:value.varList.length});
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


    const addOutput = async (index: number, output: iSelected[]) => {       
        if(ssOutput.length>0){
        setOutput((prev:iOutputDataComp[])=>{      
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
        {values.map((row:iInputDataComp, indexRow:number)=>{
                return (
                    <div style={{display:visibleValues.find((el:iInputDataComp)=>el.id===row.id)?'':'none',width:'100%'}}>
                        <ElementExpandibleTitle
                            key={indexRow}
                            title={row.name}
                            expanded={isExpanded(indexRow)}
                            onChange={()=>{}}
                            onClickTitle={()=>{expandGroup(indexRow)}}
                            allSelected={ ssOutput.find(oEL=>oEL.id === row.id)?.varSelected.length === row.varList.length}
                            elements={
                                [
                                    <TileSelectionV3
                                        key={indexRow}
                                        body={{values: row.varList,
                                            defaultSwitchState:props.defaultSwitchState,
                                            singleChoice:props.singleChoice}}
                                        onChange={(output) => addOutput(indexRow, output)}
                                        onValidate={() => {}}
                                        previousInput={previousInput?previousInput.find((elpI:any)=>row.id === elpI.id)?.varSelected:undefined} 
                                        maxHeighTileContainer={maxHeightSubComponent}
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

export default MultiTileSelect