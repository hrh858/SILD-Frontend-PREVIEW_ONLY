import React, { useEffect, useState } from 'react'
import Form from "react-bootstrap/Form";
import ElementInputText from "../../../Elements/ElementInputText"
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
    id: any;
    name: string;
    condition: string;
}

function ValueInsert(propsComp: Props) {
    const props = propsComp.body;
    const values:iInputDataComp[] = props.values;
    const previousInput = propsComp.previousInput;


    const [ssOptionSelec, setOptionSelec] = useState<number[] >([]);

    const [ssVar1, setVar1] = useState<string[] >([]);
    const [ssVar2, setVar2] = useState<string[] >([]);

    const [ssValid1, setValid1] = useState<boolean[] >([]);
    const [ssValid2, setValid2] = useState<boolean[] >([]);

    const [visibleValues, setVisibleValues] = useState<iInputDataComp[]>([...values])

    // --------------------------------------------------------------------------------
    // INITIAL VALUES
    // --------------------------------------------------------------------------------
    useEffect(() =>
    {   
        let arrayOptions:number[] = [];
        let arrayVariable1: string[] = [];
        let arrayVariable2: string[] = [];
        let arrayValid1: boolean[] = [];
        let arrayValid2: boolean[] = [];
    

        for (let val of values) 
        {
            let el = previousInput?.find((elem:any)=>elem.id === val.id);
            if(el === undefined){
                arrayOptions.push(0);
                arrayVariable1.push("")
                arrayVariable2.push("")
                arrayValid1.push(true);                
                arrayValid2.push(true);
            }
            else{
                let tOption = 0;
                let tVar1 = "";
                let tVar2 = "";
                let tValid = true;             

                if(el.condition.slice(0,1) === '=')
                {
                    tOption = 1;
                    tVar1 = el.condition.slice(1,el.condition.length); 
                }
                else if(el.condition.indexOf(';') >=0)
                {
                    let arrayVal = el.condition.split(';');
                    tOption = 4;
                    tVar1 = arrayVal[0].slice(1,el.condition.length);
                    tVar2 = arrayVal[1].slice(1,el.condition.length);
                }
                else if(el.condition.slice(0,1) === '<')
                {
                    tOption = 2;
                    tVar1 = el.condition.slice(1,el.condition.length); 
                }
                else if(el.condition.slice(0,1) === '>')
                {
                    tOption = 3;
                    tVar1 = el.condition.slice(1,el.condition.length); 
                }
                else if(el.condition.slice(0,2) === '!=')
                {
                    tOption = 5;
                    tVar1 = el.condition.slice(2,el.condition.length); 
                }

                arrayOptions.push(tOption);
                arrayVariable1.push(tVar1)
                arrayVariable2.push(tVar2)
                arrayValid1.push(tValid);
                arrayValid2.push(tValid);
            }
        }      
        
        setOptionSelec([...arrayOptions])
        setVar1([...arrayVariable1])
        setVar2([...arrayVariable2])
        setValid1([...arrayValid1])
        setValid2([...arrayValid2])
    },[])

    // --------------------------------------------------------------------------------
    // CanProceed? 
    // --------------------------------------------------------------------------------
    useEffect(() =>
    {   
        if(values.length === 0) propsComp.onValidate(true);
        else{
            let valid = [];

            for (let index = 0; index < values.length; index++) { 
                let v = false;

                if(ssValid1[index] && ssOptionSelec[index] != 4){
                    v = true;
                }

                if(ssOptionSelec[index] == 4 && ssValid2[index] && ssValid1[index]){
                    if (parseFloat(ssVar1[index]) < parseFloat(ssVar2[index])) {
                        v = true;
                    }
                }

                if (ssOptionSelec[index] == 0){
                    v = true;
                }
                if (ssOptionSelec[index] == 0 && props.hideSinRestric ){
                    v = false;
                }

                valid.push(v)
            }
            propsComp.onValidate(valid.every(v => v === true))    
        }
    },[ssValid1, ssValid2])

    // --------------------------------------------------------------------------------
    // UPDATE OUTPUT
    // --------------------------------------------------------------------------------
    useEffect(() =>
    {   
        var arrayOutputData:iOutputDataComp[] = [];
        for (let index = 0; index < values.length; index++) { 
            let outputData:iOutputDataComp = {id:values[index].id, name:values[index].name,  condition:'undefined'};
            
            let output1 = "undefined";
            if(ssValid1[index]){
                output1 = ssVar1[index];
            }

            if (ssOptionSelec[index] == 1 ){
                outputData.condition = '=' + output1;
            } 
            else if(ssOptionSelec[index] == 2){
                outputData.condition = '<' + output1;
            } 
            else if(ssOptionSelec[index] == 3){
                outputData.condition = '>' + output1;
            } 
            else if(ssOptionSelec[index] == 4){
                let output2 = "undefined";
                if(ssValid2[index]){
                    output2 = ssVar2[index];
                }
                outputData.condition = '>' + output1 + ';' + '<' + output2;
            } 
            else if(ssOptionSelec[index] == 5){
                outputData.condition = '!=' + output1;
            } 
            arrayOutputData.push(outputData);
        }

        propsComp.onChange([...arrayOutputData]);       
    },[ssOptionSelec, ssVar1, ssVar2])


    const filter = (text: string) => {
        let aux = []
        for (let value of props.values) {
            if (value.name.toLowerCase().includes(text.toLowerCase())) aux.push(value)
        }
        setVisibleValues(aux)
    }
    

    const fcn_buildIntervalComp = (row:iInputDataComp,index:number)=>{        
        const options = (e:any) =>{
            let newVal = [...ssOptionSelec];
            newVal[index] = e.target.value;
            setOptionSelec(newVal)

            // Clean Values
            let newVar1 = [...ssVar1];
            newVar1[index] = "";
            setVar1(newVar1);
            let newVar2 = [...ssVar2];
            newVar2[index] = "";
            setVar2(newVar2);

            // Clean validations
            let newValid = [...ssValid1];
            newValid[index] = false;
            setValid1(newValid);
            let newValid2 = [...ssValid2];
            newValid2[index] = false;
            setValid2(newValid2);
            
        }     
        const handleChange = (e:any, i:number, valid:boolean, fieldNumber:number) =>{
            if(fieldNumber == 1){
                let newVal = [...ssVar1];
                let newValid = [...ssValid1];

                newValid[i] = valid;
                setValid1(newValid);
                
                newVal[i] = e;
                setVar1(newVal);
                
            } 
            else if(fieldNumber == 2){
                let newVal = [...ssVar2];
                let newValid = [...ssValid2];
                
                newValid[index] = valid
                setValid2(newValid);

                newVal[i] = e;
                setVar2(newVal);

            } 
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
                // justifyContent: "space-between",
                gap:'1rem',
                }}>
                <ElementTitleC
                    text = { row.name }
                    />
                <Form.Control  
                    name={'selectOption'} as="select" value = {ssOptionSelec[index]} onChange={(e)=>options(e)} >
                    <option value={0} > {props.hideSinRestric?"Seleccione una opción":"1. Sin restricciones"} </option>
                    <option value={1} > 2. (=) Igual a ___  </option>
                    <option value={2} > 3. (&lt;) Menor que ___  </option>
                    <option value={3} > 4. (&gt;) Mayor que ___  </option>
                    <option value={4} > 5. Entre ___ ,  y ___ </option>
                    <option value={5} > 6. (&#8800;) Diferente a ___ </option>

                </Form.Control>
                {
                    ssOptionSelec[index] == 1 ?
                    <ElementInputText
                        text="(=) Igual a:&nbsp;"
                        defaultInput ={ssVar1[index]}
                        inputType='float'
                        onChange={(e, valid)=>handleChange(e, index, valid, 1)}
                    />
                    :
                    ""
                }
                {
                    ssOptionSelec[index] == 2 ?
                    <ElementInputText
                        text="(&lt;) Menor que:&nbsp;"
                        defaultInput ={ssVar1[index]}
                        inputType='float'
                        onChange={(e, valid)=>handleChange(e, index, valid, 1)}
                    />
                    :
                    ""
                }
                {
                    ssOptionSelec[index] == 3 ?
                    <ElementInputText
                        text="(&gt;) Mayor que:&nbsp;"
                        defaultInput ={ssVar1[index]}
                        inputType='float'
                        onChange={(e, valid)=>handleChange(e, index, valid, 1)}
                    />
                    :
                    ""
                }
                {
                    ssOptionSelec[index] == 4 ?
 
                    <>
                        <ElementInputText
                            text="Entre:&nbsp;"
                            defaultInput ={ssVar1[index]}
                            inputType='float'
                            onChange={(e, valid)=>handleChange(e, index, valid, 1)}
                        />
                        <ElementInputText
                            text="y:&nbsp;"
                            defaultInput ={ssVar2[index]}
                            inputType='float'
                            onChange={(e, valid)=>handleChange(e, index, valid, 2)}
                        />
                        {
                            parseFloat(ssVar1[index]) > parseFloat(ssVar2[index])? 
                            <p style={{color:"red"}}> Rango de valores incorrecto</p>
                            :
                            ""
                        }
                        
                    </>

                    :
                    ""
                }
                {
                    ssOptionSelec[index] == 5 ?
                    <ElementInputText
                        text="(&#8800;) Diferente a:&nbsp;"
                        defaultInput ={ssVar1[index]}
                        inputType='float'
                        onChange={(e, valid)=>handleChange(e, index, valid, 1)}
                    />
                    
                    :
                    ""
                    
                }
            </div>
        )
    }

    const fcn_renderComponent = ()=>{
        return ( 
            <div style={{
                display: "flex", flexDirection: "column",
                padding: "1rem", gap: "1rem", width: "100%"
            }}>  
            {
                values.map((row:iInputDataComp,index:number)=>{
                    return (
                        <div style={{display:visibleValues.find((el:iInputDataComp)=>el.id===row.id)?'':'none',width:'100%'}}>
                            {fcn_buildIntervalComp(row,index)}
                        </div>
                        
                    )
                })
            }
            </div>
        )
        }

    if(values.length ===  0) return null
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

export default ValueInsert
