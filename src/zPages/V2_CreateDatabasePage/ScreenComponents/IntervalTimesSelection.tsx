import React, { useEffect, useState } from 'react'
import Form from "react-bootstrap/Form";
import ElementTitleC from '../../../Elements/ElementTitleC'
import LayoutElement from '../../../Elements/LayoutElement'

import * as colorDef from '../../../Shared/Colors'

interface Props {
    body: any
    onChange: (data: any[]) => void
    onValidate: (validationWasCorrect: boolean) => void
    previousInput: any
}

interface iInputDataComp {
    id: any;
    name: string;
}

interface iOutputDataComp {
    id:any;
    name:string;
    dateINI: string|undefined;
    dateEND: string|undefined;
}

function IntervalTimeSelection(propsComp: Props) {
    const props = propsComp.body;
    const values:iInputDataComp[] = props.values;
    const previousInput = propsComp.previousInput;
    
    const today = new Date().toISOString().slice(0,10);    
    
    const [ssOptionSelec, setOptionSelec] = useState<number[]>([]);
    const [ssDateIni, setDateIni] = useState<string[]>([]);
    const [ssDateEnd, setDateEnd] = useState<string[]>([]);

    const [visibleValues, setVisibleValues] = useState<iInputDataComp[]>([...values])

    // --------------------------------------------------------------------------------
    // INITIAL VALUES
    // --------------------------------------------------------------------------------
    useEffect(() =>
    {           
        
        let arrayDateIni:string[] = [];
        let arrayDateFin:string[] = [];
        let arrayOptions:number[] = [];    
        if(previousInput===undefined )
        {
            let defaultOp = 1;       
            if(props.defaultOptionValue && typeof(props.defaultOptionValue) === 'number'
                && props.defaultOptionValue>=1 && props.defaultOptionValue<=4){
                defaultOp = props.defaultOptionValue;

            }
            
            for (let index = 0; index < values.length; index++) {
                arrayDateIni.push(today);  
                arrayOptions.push(defaultOp);
            }
            arrayDateFin =  arrayDateIni;
        }
        else{
            for(let prevIn of previousInput)
            {
                if(prevIn.dateINI === 'undefined' && prevIn.dateEND === 'undefined')
                {
                    arrayOptions.push(1);
                    arrayDateIni.push(today); 
                    arrayDateFin.push(today); 
                }
                else if(prevIn.dateEND === 'undefined')
                {
                    arrayOptions.push(2);
                    arrayDateIni.push(prevIn.dateINI); 
                    arrayDateFin.push(prevIn.dateINI); 

                }
                else if(prevIn.dateINI === 'undefined')
                {
                    arrayOptions.push(3);
                    arrayDateIni.push(prevIn.dateEND); 
                    arrayDateFin.push(prevIn.dateEND); 
                }
                else
                {
                    arrayOptions.push(4);
                    arrayDateIni.push(prevIn.dateINI); 
                    arrayDateFin.push(prevIn.dateEND); 
                }
            }
        }
        setOptionSelec(arrayOptions)
        setDateIni(arrayDateIni)
        setDateEnd(arrayDateFin)
    },[])

    // --------------------------------------------------------------------------------
    // CanProceed? 
    // -------------------------------------------------------------------------------
    useEffect(() =>
    {   
        propsComp.onValidate(ssOptionSelec.every((el,idxE)=>el<4 || (el === 4 && new Date(ssDateIni[idxE]) <= new Date(ssDateEnd[idxE]))))    
    },[ssOptionSelec,ssDateIni,ssDateEnd])
   
    // --------------------------------------------------------------------------------
    // UPDATE OUTPUT
    // --------------------------------------------------------------------------------
    useEffect(() =>
    {   
        var arrayOutputData:iOutputDataComp[] = [];
        for (let index = 0; index < values.length; index++) { 
            let outputData:iOutputDataComp = {id:values[index].id, name:values[index].name, dateINI:'undefined', dateEND: 'undefined'};
            if(ssOptionSelec[index] === 2 || ssOptionSelec[index] === 4) outputData.dateINI = ssDateIni[index];
            if(ssOptionSelec[index] > 2) outputData.dateEND = ssDateEnd[index];
            arrayOutputData.push(outputData );
        }

        propsComp.onChange([...arrayOutputData]);        
    },[ssOptionSelec,ssDateIni,ssDateEnd])

    //---------------------------------------------------------------------------------
   const filter = (text: string) => {
        let aux = []
        for (let value of props.values) {
            if (value.name.toLowerCase().includes(text.toLowerCase())) aux.push(value)
        }
        setVisibleValues([...aux])
    }   

    const fcn_buildIntervalComp = (row:iInputDataComp,index:number)=>{        
        const handleChange = (e:any, index:number) =>{
            if(e.target.name === 'startDate'){
                let newVal = [...ssDateIni];
                let value = e.target.value
                if(value !== ''){
                    value= new Date(e.target.value) > new Date(ssDateEnd[index])?ssDateEnd[index]:e.target.value;                         
                    newVal[index] = value
                    setDateIni(newVal)
                }
            } 
            if(e.target.name === 'endDate'){
                let value = e.target.value
                let newVal = [...ssDateEnd];
                if(value !== ''){                    
                    value = new Date(e.target.value) > new Date(today)?today:e.target.value;
                    if(ssDateIni[index] !== today && new Date(value)<new Date(ssDateIni[index]))value=ssDateIni[index]
                    newVal[index] =  value
                    setDateEnd(newVal)
                }
            }     
            if(e.target.name === 'selectOption'){
                let newVal = [...ssOptionSelec];
                newVal[index] = parseInt(e.target.value);
                setOptionSelec(newVal)
                let newVal1 = [...ssDateIni];
                newVal1[index] = today;
                setDateIni(newVal1)
                let newVal2 = [...ssDateEnd];
                newVal2[index] = today;
                setDateEnd(newVal2)
            } 
        }

        const handleKeydownEvent = (e:any)=>{
            // console.log(e.key === "ArrowUp")
            if(!(e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight"))e.preventDefault()
        }

        return(
            <div style={{
                    display: "flex",
                    width:'100%',
                    flexDirection: "column",
                    alignItems: "center",
                    alignContent:'center',
                    padding:'10px',
                    border:'3px solid '+colorDef.defMainThemeColor,
                    gap:'10px'
                }}>
                <ElementTitleC
                    text = { row.name }
                />
                <Form.Control  
                    name={'selectOption'} as="select" value = {ssOptionSelec[index]} onChange={(e)=>handleChange(e,index)} >
                    <option value={1} >  sin restricciones </option>
                    <option value={2} >  desde ... </option>
                    <option value={3} >  hasta ... </option>
                    <option value={4} >  desde ... hasta ... </option>
                </Form.Control>
                {ssOptionSelec[index] > 1?
                    <div style={{
                        display: "flex",
                        width:'100%',
                        flexDirection: "row",
                        flexWrap:'wrap',
                        alignItems: "center",
                        justifyContent: "center",
                        gap:'25px',
                        paddingTop:"10px",
                    }}>  
                    {(ssOptionSelec[index] === 2 || ssOptionSelec[index] === 4)?         
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap:'wrap',
                                alignItems: "center",
                                justifyContent:'center',
                                gap:'20px',
                                padding:"0px 10px 0px 10px",
                            }}>
                            <span style={{color:'black', width:"6rem"}}>Fecha inicial</span>
                            <input name={'startDate'} type='date' value={ssDateIni[index]} onChange={(e)=>handleChange(e,index)} 
                                max={ssOptionSelec[index] === 4? ssDateEnd[index]:today}
                                style={{ textAlign: 'right' ,width:'150px'}} 
                                onKeyDown={(e) => handleKeydownEvent(e)} 
                                />
                            </div> 
                            :""
                        }
                        {(ssOptionSelec[index] > 2)?  
                        <div  style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap:'wrap',
                            alignItems: "center",
                            justifyContent:'center',
                            gap:'20px',            
                            padding:"0px 10px 0px 10px",                
                            }}>
                                <span style={{color:'black', width:"6rem"}}>Fecha final </span>
                                <input name={'endDate'} type='date' value={ssDateEnd[index]} onChange={(e)=>handleChange(e,index)}
                                min={ssOptionSelec[index] === 3?"":ssDateIni[index]} max={today}
                                style={{ textAlign: 'right' ,width:'150px'}}
                                // onKeyDown={(e) => e.preventDefault()} 
                                />
                        </div> 
                        :""
                        }
                    </div>
                    :
                    ""
                }
                
            </div>
        )
    }
    const fcn_renderComponent = ()=>{
    return ( 
        <>
        <div style={{width:"100%",display:"grid",gridTemplateRows:"1fr 40px"}}>
        {
        values.map((row:iInputDataComp,index:number)=>{
            return (
                <div style={{display:visibleValues.find((el:iInputDataComp)=>el.id===row.id)?'':'none',width:'100%'}}>
                    {fcn_buildIntervalComp(row,index)}
                </div>
            )
        })
        }
        {/* Elininar en la versión final */}
        {ssOptionSelec[0]===4 &&
            <button  style={{width:"10rem",justifySelf: 'center', backgroundColor:colorDef.defGreenColor, border:0, color:'white'}}
                onClick={()=>{               
                let arrayIni:string[] = [];
                let arrayFin:string[] = [];
                ssDateIni.forEach(el => {
                        arrayIni.push(new Date('2021-07-01').toISOString().slice(0,10) );
                        arrayFin.push(new Date('2021-07-07').toISOString().slice(0,10));
                });
                    
                    setDateIni([...arrayIni]); setDateEnd([...arrayFin])}}
            >
                Default date
            </button>
        }
        </div>
        </>
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

export default IntervalTimeSelection
