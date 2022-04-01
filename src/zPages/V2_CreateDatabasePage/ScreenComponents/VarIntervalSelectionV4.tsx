import React, { useEffect, useState } from 'react'
import Form from "react-bootstrap/Form";
import TextField from '@material-ui/core/TextField'; //npm install @material-ui/core
import Autocomplete from '@material-ui/lab/Autocomplete'; //npm install @material-ui/lab
import ElementTitleC from '../../../Elements/ElementTitleC'
import LayoutElement from '../../../Elements/LayoutElement'


interface Props {
    body: any
    onChange: (data: any[]) => void
    onValidate: (validationWasCorrect: boolean) => void
    previousInput: any
}

interface iDate {
    id:any;
    name:string;
    days: number;
}

interface iList {
    id:any;
    name:string;
}

interface iListOptions {
    display:string,
    idStart:null|string,
    dayStart:number,
    idEnd:null|string,
    dayEnd:number
}

interface iState {
    id:any;
    name:string;
    ini: iDate;
    fin: iDate;
    frec:number;
    ref:iList;
}

interface iInputData {
    id:any;
    name:string;
    refVar:  iList[];
    varList: iList[];
    displayOptions: number[][];
}

const defaultListOptions:iListOptions[] = [
    { 
        display:'Seleccione una opción',
        idStart:null,
        dayStart:0,
        idEnd:null,
        dayEnd:0
    }, //0
    {
        display: 'Personalizado', 
        idStart:null,
        dayStart:0,
        idEnd:null,
        dayEnd:0
    },  //1
]

const defaultDisplayOptions = [
    [0,1], // Periodicidad    
    [0,1], // Día concreto
    [0,1], // Periodo concreto
]


function VarIntervalSelectionV2(propsComp: Props) {
    const props = propsComp.body;
   
    const values:iInputData[] = props.values;
    const visualContrains:string = props.qProps.visualContrains;
    const previousInput = propsComp.previousInput;

    const listOptions:iListOptions[] =  props.qProps.listOptions?props.qProps.listOptions:defaultListOptions;

    const [ssPeriodSelected, setPeriodSelected] = useState<number[]>([]);
    const [ssOptionSelec, setOptionSelec] = useState<number[]>([]);
    const [ssOutput, setOutput] = useState<iState[]>([]);

    const [visibleValues, setVisibleValues] = useState<iInputData[]>([...values])

    // --------------------------------------------------------------------------------
    // INITIAL VALUES
    // --------------------------------------------------------------------------------
    useEffect(() =>
    {   
        let arrayOptions:number[] = [];
        let arrayPeriod:number[] = [];
        let arrayVar:iState[] = [];
    
        if(previousInput===undefined)
        {
            for (let index = 0; index < values.length; index++) {
                arrayVar.push({    
                    id:values[index].id,
                    name:values[index].name,
                    ini: {id:null,name:"",days: 0},
                    fin: {id:null,name:"",days: 0},
                    frec: 0,
                    ref:values[index].refVar[0]
                });  
                arrayOptions.push(0);
            }     
            arrayPeriod = arrayOptions;
        }
        else
        {
            for (let el of previousInput) {
                arrayVar.push(el);  
                arrayPeriod.push(el.frec === 0? el.ini.id === el.fin.id && el.ini.days === el.fin.days? 2:3:1);
                arrayOptions.push(1);
            } 
        }


        setOptionSelec(arrayOptions);
        setPeriodSelected(arrayPeriod)
        setOutput(arrayVar);
    },[])

    // --------------------------------------------------------------------------------
    // CanProceed? 
    // --------------------------------------------------------------------------------
    useEffect(() =>
    {   
        if(values.length === 0) propsComp.onValidate(true);
        else propsComp.onValidate(ssOutput.every((outV:iState) => outV.ini.id !== null && outV.fin.id !== null))    
    },[ssOutput])

    // --------------------------------------------------------------------------------
    // UPDATE OUTPUT
    // --------------------------------------------------------------------------------
    useEffect(() =>
    {   
        // console.log(ssOutput)
        propsComp.onChange([...ssOutput]);        
    },[ssOutput])


    
    const filter = (text: string) => {
        let aux = []
        for (let value of props.values) {
            if (value.name.toLowerCase().includes(text.toLowerCase())) aux.push(value)
        }
        setVisibleValues([...aux])
    } 

    const fcn_buildIntervalComp = (row:iInputData,indexRow:number)=>{   
       
        const handleKeyDown = (e:any)=>
        {   
            if(e.key === "-")
            {
                let newArray = [...ssOutput];
                if(e.target.name==='dINI') newArray[indexRow].ini.days = -1*newArray[indexRow].ini.days;
                if(e.target.name==='dFIN')  newArray[indexRow].fin.days = -1*newArray[indexRow].fin.days;
                setOutput([...newArray])  
            }
        }

        const handleInputChange = (e:any)=>
        {
            const newVal = (e.target.value);
            if(newVal!==""){
               let newArray = [...ssOutput];
                if(e.target.name==='dINI') newArray[indexRow].ini.days = parseInt(newVal);
                if(e.target.name==='dFIN' || ssPeriodSelected[indexRow]===2 ) newArray[indexRow].fin.days = parseInt(newVal);
                setOutput([...newArray])   
            }        
            else
            {
                let newArray = [...ssOutput];
                if(e.target.name==='dINI') newArray[indexRow].ini.days = 0;
                if(e.target.name==='dFIN' || ssPeriodSelected[indexRow]===2 ) newArray[indexRow].fin.days = 0;
                setOutput([...newArray])   

            }    
        }

        const handleInputFrecChange = (e:any)=>
        {
            const {  value } = e.target;
            if(parseInt(value) > 0){
                let newArray = [...ssOutput];
                newArray[indexRow].frec = parseInt(value);
                setOutput([...newArray])    
            }
                                   
        }

        const handleComboChange = (valOption:any,comp:string)=>{
            let newVal:iList = {id:null,name:""};
            if(valOption!==null)
            {
                newVal = valOption;
            }

            let newArray = [...ssOutput];
            if(comp==='varINI' ){
                newArray[indexRow].ini.id = newVal.id;
                newArray[indexRow].ini.name = newVal.name;
            } 
            if(comp==='varFIN' || ssPeriodSelected[indexRow]===2){
                newArray[indexRow].fin.id = newVal.id;
                newArray[indexRow].fin.name = newVal.name;
            } 
            setOutput([...newArray])   
        }

         const handleChangeControl = (e2:any)=>{
            const {  value } = e2.target;
            setOptionSelec((prev)=>{
                let newOption = [...prev];
                newOption[indexRow] = parseInt(value);
                return [...newOption];
            })
            if(parseInt(value)> 1)
            {      
                const temp =  {...listOptions[parseInt(value)]}
                const tempNameStart =  row.varList.find((vl:iList)=>vl.id === temp.idStart)    
                const tempNameEND   =  row.varList.find((vl:iList)=>vl.id === temp.idEnd)       
                if(temp && tempNameStart && tempNameEND)
                {
                    let newArray = [...ssOutput];
                    newArray[indexRow].ini={id:temp.idStart, name:tempNameStart.name,days: temp.dayStart};           
                    newArray[indexRow].fin={id:temp.idEnd,   name:tempNameEND.name,  days: temp.dayEnd};   
                    setOutput([...newArray])  
                }            
            }
            // if(parseInt(value) === 1)
            // {      
            //     const tempFECIN =  row.varList.find((vl:iList)=>vl.id === 'FECIN')    
            //     const tempFECAL =  row.varList.find((vl:iList)=>vl.id === 'FECAL')       
            //     if(tempFECIN && tempFECAL)
            //     {
            //         let newArray = [...ssOutput];
            //         newArray[indexRow].ini={id:tempFECIN.id,name:tempFECIN.name,days: 0};           
            //         newArray[indexRow].fin={id:tempFECAL.id,name:tempFECAL.name,days: 0};   
            //         setOutput([...newArray])  
            //     }            
            // }
            // else if(parseInt(value) === 2)
            // {          
            //     const tempFECMA =  row.varList.find((vl:iList)=>vl.id === 'FECMA')    
            //     const tempFECAL =  row.varList.find((vl:iList)=>vl.id === 'FECAL')    
            //     if( tempFECMA && tempFECAL)
            //     {
            //         let newArray = [...ssOutput];
            //         newArray[indexRow].ini={id:tempFECMA.id,name:tempFECMA.name,days: 0};           
            //         newArray[indexRow].fin={id:tempFECAL.id,name:tempFECAL.name,days: 0};   
            //         setOutput([...newArray])  
            //     }            
            // }
            // else if(parseInt(value) === 3)
            // {          
           
            //     const tempFECIN =  row.varList.find((vl:iList)=>vl.id === 'FECIN')    
            //     if(tempFECIN)
            //     {
            //         let newArray = [...ssOutput];
            //         newArray[indexRow].ini={id:tempFECIN.id,name:tempFECIN.name,days: -1};           
            //         newArray[indexRow].fin={id:tempFECIN.id,name:tempFECIN.name,days: 1};      
            //         setOutput([...newArray])  
            //     }            
            // }
            // else if(parseInt(value) === 4)
            // {   
            //     const tempFECAL =  row.varList.find((vl:iList)=>vl.id === 'FECAL')    
            //     if( tempFECAL)
            //     {
            //         let newArray = [...ssOutput];
            //         newArray[indexRow].ini={id:tempFECAL.id,name:tempFECAL.name,days: -1};           
            //         newArray[indexRow].fin={id:tempFECAL.id,name:tempFECAL.name,days: 1};      
            //         setOutput([...newArray])  
            //     }            
            // }
            // else if(parseInt(value) === 5)
            // {     
            //     const tempFECMA =  row.varList.find((vl:iList)=>vl.id === 'FECMA')
            //     if(tempFECMA)
            //     {
            //         let newArray = [...ssOutput];
            //         newArray[indexRow].ini={id:tempFECMA.id,name:tempFECMA.name,days: -1};           
            //         newArray[indexRow].fin={id:tempFECMA.id,name:tempFECMA.name,days: 1};      
            //         setOutput([...newArray])  
            //     }            
            // }     
            // else if(parseInt(value) === 7)
            // {          
           
            //     const tempFECIN =  row.varList.find((vl:iList)=>vl.id === 'FECIN')    
            //     if(tempFECIN)
            //     {
            //         let newArray = [...ssOutput];
            //         newArray[indexRow].ini={id:tempFECIN.id,name:tempFECIN.name,days: 0};           
            //         newArray[indexRow].fin={id:tempFECIN.id,name:tempFECIN.name,days: 0};      
            //         setOutput([...newArray])  
            //     }            
            // }
            // else if(parseInt(value) === 8)
            // {   
            //     const tempFECAL =  row.varList.find((vl:iList)=>vl.id === 'FECAL')    
            //     if( tempFECAL)
            //     {
            //         let newArray = [...ssOutput];
            //         newArray[indexRow].ini={id:tempFECAL.id,name:tempFECAL.name,days: 0};           
            //         newArray[indexRow].fin={id:tempFECAL.id,name:tempFECAL.name,days: 0};      
            //         setOutput([...newArray])  
            //     }            
            // }
            // else if(parseInt(value) === 9)
            // {     
            //     const tempFECMA =  row.varList.find((vl:iList)=>vl.id === 'FECMA')
            //     if(tempFECMA)
            //     {
            //         let newArray = [...ssOutput];
            //         newArray[indexRow].ini={id:tempFECMA.id,name:tempFECMA.name,days: 0};           
            //         newArray[indexRow].fin={id:tempFECMA.id,name:tempFECMA.name,days: 0};      
            //         setOutput([...newArray])  
            //     }            
            // }  
            // else if(parseInt(value) === 10)
            // {      
            //     const tempFEINPE =  row.varList.find((vl:iList)=>vl.id === 'FEINPE')        
            //     if(tempFEINPE )
            //     {
            //         let newArray = [...ssOutput];
            //         newArray[indexRow].ini={id:tempFEINPE.id,name:tempFEINPE.name,days: 0};           
            //         newArray[indexRow].fin={id:tempFEINPE.id,name:tempFEINPE.name,days: 0};   
            //         setOutput([...newArray])  
            //     }            
            // }
            // else if(parseInt(value) === 11)
            // {       
            //     const tempFEENDPE =  row.varList.find((vl:iList)=>vl.id === 'FEENDPE')       
            //     if( tempFEENDPE)
            //     {
            //         let newArray = [...ssOutput];
            //         newArray[indexRow].ini={id:tempFEENDPE.id,name:tempFEENDPE.name,days: 0};           
            //         newArray[indexRow].fin={id:tempFEENDPE.id,name:tempFEENDPE.name,days: 0};   
            //         setOutput([...newArray])  
            //     }            
            // } 
            // else if(parseInt(value) === 12)
            // {      
            //     const tempFEINPE =  row.varList.find((vl:iList)=>vl.id === 'FEINPE')    
            //     const tempFEENDPE =  row.varList.find((vl:iList)=>vl.id === 'FEENDPE')       
            //     if(tempFEINPE && tempFEENDPE)
            //     {
            //         let newArray = [...ssOutput];
            //         newArray[indexRow].ini={id:tempFEINPE.id,name:tempFEINPE.name,days: 0};           
            //         newArray[indexRow].fin={id:tempFEENDPE.id,name:tempFEENDPE.name,days: 0};   
            //         setOutput([...newArray])  
            //     }            
            // }       
            else 
            {          
                let newArray = [...ssOutput];
                newArray[indexRow].ini={id:null,name:"",days: 0};           
                newArray[indexRow].fin={id:null,name:"",days: 0};
                setOutput([...newArray])  
                       
            }
            
         }
        const handleChangeOpPeriod = (e2:any)=>{
            const {  value } = e2.target;
            setPeriodSelected((prev)=>{
                let newOption = [...prev];
                newOption[indexRow] = parseInt(value);
                return [...newOption];
            })
            setOptionSelec((prev)=>{
                let newOption = [...prev];
                newOption[indexRow] = 0;
                return [...newOption];
            })
            let newArray = [...ssOutput];      
            newArray[indexRow].ini={id:null,name:"",days: 0};           
            newArray[indexRow].fin={id:null,name:"",days: 0};
            newArray[indexRow].frec = 0;
            newArray[indexRow].ref = row.refVar[0];
            setOutput([...newArray])  

        } 
        const handleFormRefVal = (e2:any)=>{
            const {  value } = e2.target;

            let newArray = [...ssOutput]; 
            newArray[indexRow].ref = row.refVar[value];
            setOutput([...newArray])  
        } 

        
        
         
        const fcn_ListOptions = (indR:number)=>{
            const diplayOptions = row.displayOptions && row.displayOptions.length?row.displayOptions:defaultDisplayOptions ;
            if(ssPeriodSelected[indR] > 0){
                return diplayOptions[ssPeriodSelected[indR]-1].map((numOp:number)=><option value={numOp} > {listOptions[numOp].display}</option>)
            }            
        } 

        return(
            <div 
                style={{
                    display: "flex",
                    width:'100%',
                    flexDirection: "column",
                    alignItems: "center",
                    alignContent:'center',
                    padding:'10px',
                    border:'3px solid rgb(20, 149, 131)',
                    gap:'10px'
                }}
                key={indexRow}
            >
                <ElementTitleC
                    text = { row.name }
                />
                <div style={{display:"flex",justifyContent:"start",justifyItems:"start", alignContent:'center', alignItems:'center',width:"100%",maxWidth:'730px',gap:"15px",}}>
                    <span style={{justifySelf:'flex-start',color:'black'}}>{"Intervalo de captación:"}</span>
                    <Form.Control  
                        name={'selectOPeriod'} as="select" value = {ssPeriodSelected[indexRow]} onChange={handleChangeOpPeriod} 
                        style={{width:"200px"}}>
                        <option value={0} >  </option>                       
                        {(visualContrains === "" || visualContrains[0] === "1")&&<option value={2} > Día concreto </option>}
                        {(visualContrains === "" || visualContrains[1] === "1")&&<option value={3} > Periodo concreto </option>}
                        {false &&(visualContrains === "" || visualContrains[2] === "1")&&!props.hidePeriodicidad&&<option value={1} > Con periodicidad </option>}
                    </Form.Control>
                </div>  
                {ssPeriodSelected[indexRow] === 1?
                <div style={{display:"flex",justifyContent:"start",justifyItems:"start", alignItems:'center',width:"100%",maxWidth:'730px',  padding:'10px 10px 10px 10px',
                        border:'1px solid #ced4da', borderRadius:"10px"}}>
                    <span style={{color:'black'}}> Defina la frecuencia: </span>
                    <input 
                        style={{width:'60px',textAlign:'right',marginLeft:'20px'}}
                        type="number" name="deltaP" id="deltaP" onKeyDown={(e)=>handleKeyDown(e)} value={ssOutput[indexRow]?.frec} onChange={(e)=>handleInputFrecChange(e)} />
                    <span style={{paddingLeft:"10px",color:'black'}}>{"días"}</span>
                </div>
                :""}
                {(ssPeriodSelected[indexRow] >= 2 || (ssPeriodSelected[indexRow] === 1 && ssOutput[indexRow].frec>0))?
                    <div style={{
                        display: "flex",
                        width:'100%',
                        flexDirection: "column",
                        alignItems: "center",
                        alignContent:'center',
                        gap:'10px'
                        }}>
                     <div style={{display:"flex",justifyContent:"start",justifyItems:"start",width:"100%",maxWidth:'730px',gap:"15px",}}>
                        <span style={{justifySelf:'flex-start',color:'black'}}>{"Defina el intervalo de captación de: ["+ row.name+"]"}</span>
                    </div> 
                    
                    <Form.Control  
                        name={'selectOption'} as="select" value = {ssOptionSelec[indexRow]} onChange={handleChangeControl} 
                        style={{maxWidth:"730px"}}>
                            {fcn_ListOptions(indexRow)}
                    </Form.Control>
                    </div>
                    :""
                }
                {ssOptionSelec[indexRow] > 0 && (ssPeriodSelected[indexRow] >= 2 || (ssPeriodSelected[indexRow] === 1 && ssOutput[indexRow].frec>0))?   
                    <div
                        style={{
                            display:'flex',
                            flexWrap:'wrap',
                            justifyItems:'center',
                            justifyContent:'center',                        
                            gap:'10px',
                            width:'100%',
                            maxWidth:'730px',
                            }}
                        >                   
                    
                        <div
                            style={{
                                display:'flex',
                                gap:'10px',
                                whiteSpace: 'nowrap',
                                justifyContent:'center',
                                justifyItems:'center',
                                alignContent:'center',
                                alignItems:'center',
                                border:'1px solid #ced4da',
                                padding:'10px 10px 10px 10px',
                                flexWrap:'wrap',
                                borderRadius:'10px'

                            }}
                        >
                        <span style={{justifySelf:'flex-start',color:'black'}}>{ssPeriodSelected[indexRow] === 2?"Fecha:  ":"Desde: "}</span>
                        <Autocomplete
                            id={"combo-ini"+indexRow}
                            disableClearable={true}
                            size="small"
                            onChange={(event: any, newValue: iList | null)=>handleComboChange(newValue,'varINI')}
                            options={row.varList}
                            getOptionLabel={(option:any) => option.name}
                            style={{ width: 180, textAlign:'left' }}
                            value={ssOutput[indexRow].ini.id === null? undefined:row.varList.find((lElm:any)=>lElm.id === ssOutput[indexRow].ini.id)}
                            renderInput={(params) => <TextField {...params} label="Variable" variant="outlined" />}
                            renderOption={(option) => <span style={{textAlign:'left'}}> {option.name}  </span>}
                            disabled={ssOptionSelec[indexRow]!==1}
                        />
                        <span style={{color:'black'}}>{"+"}</span>
                        <input 
                            style={{width:'60px',textAlign:'right'}}
                            type="number" name="dINI" id="dINI" onKeyDown={(e)=>handleKeyDown(e)} value={ssOutput[indexRow].ini.days} onChange={(e)=>handleInputChange(e)} />
                        <span style={{color:'black'}}>{"días"}</span>
                        </div>
                        {ssPeriodSelected[indexRow] === 2?"":
                        <div
                        style={{
                            display:'flex',
                            gap:'10px',
                            whiteSpace: 'nowrap',
                            justifyContent:'center',
                            justifyItems:'center',
                            alignContent:'center',
                            alignItems:'center',
                            padding:'10px 10px 10px 10px',
                            border:'1px solid #ced4da',
                            flexWrap:'wrap',
                            borderRadius:'10px'

                        
                        }}
                        >                            
                        <span style={{justifySelf:'flex-start',color:'black'}}>{"Hasta: "}</span>
                        <Autocomplete
                                id={"combo-fin"+indexRow}
                                disableClearable={true}
                                size="small"
                                onChange={(event: any, newValue: iList | null)=>handleComboChange(newValue,'varFIN')}
                                options={row.varList}
                                getOptionLabel={(option:any) => option.name}
                                style={{ width: 180 }}
                                value={ssOutput[indexRow].fin.id === null? undefined:row.varList.find((lElm:any)=>lElm.id === ssOutput[indexRow].fin.id)}
                                renderInput={(params) => <TextField {...params} label="Variable" variant="outlined" />}
                                renderOption={(option) => <span style={{textAlign:'left'}}> {option.name}  </span>}
                                disabled={ssOptionSelec[indexRow]!==1}
                            />
                            <span style={{color:'black'}}>{"+"}</span>
                            <input 
                                style={{width:'60px',textAlign:'right'}}
                                type="number" name="dFIN" id="dFIN" onKeyDown={(e)=>handleKeyDown(e)} value={ssOutput[indexRow].fin.days} onChange={(e)=>handleInputChange(e)} />
                            <span style={{color:'black'}}>{"días"}</span>

                        </div>
                        }
                       
                    </div>
                    
                    :""
                }
                {ssOptionSelec[indexRow]>0 && (ssPeriodSelected[indexRow] >= 2 || (ssPeriodSelected[indexRow] === 1 && ssOutput[indexRow].frec>0))?   
                <div style={{display:"flex",justifyContent:"start",justifyItems:"start",width:"100%",maxWidth:'730px',  padding:'10px 10px 10px 10px',
                        border:'1px solid #ced4da', borderRadius:"10px"}}
                        >
                    {row.refVar.length >1    ?
                    <div 
                    style={{display:"flex",justifyContent:"start",justifyItems:"start",gap: '15px',alignItems:'center'}}
                    >
                        <span style={{whiteSpace: 'nowrap',color:'black'}}>{"El intervalo debe contener:"}</span>
                        <Form.Control  
                            name={'selectRef'} as="select" value = {row.refVar.findIndex((vl:iList)=> vl.id === ssOutput[indexRow].ref.id)} onChange={(e)=>handleFormRefVal(e)} >
                            {row.refVar.map((refL:any,indexRef:number)=>{
                                return <option value={indexRef} > {refL.name} </option>
                            })
                            }
                        </Form.Control>
                    </div>
                    
                    :
                    <span style={{color:'black'}}>{"El estudio se realizará respecto a: ["+ row.refVar.find((vl:iList)=>vl.id === ssOutput[indexRow].ref.id)?.name+"]"}</span>
                    }
                 </div> 
                 :""
                }
            </div>
        )
    }

    const fcn_renderComponent = ()=>{
        return ( 
            <div
            style={{width: "100%", gap: "1rem",
                    display: "flex", flexDirection: "column", 
                    alignItems: "center",
                    justifyContent: "flex-start",                                
                    }}
            >
            {
                values?.map((row:iInputData,index:number)=>{
                    return (
                        <div style={{display:visibleValues.find((el:iInputData)=>el.id===row.id)?'':'none',width:'100%'}}>
                            {fcn_buildIntervalComp(row,index)}
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

export default VarIntervalSelectionV2
