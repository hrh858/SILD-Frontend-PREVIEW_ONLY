import React, { ReactElement, useState, useEffect } from 'react'
import styled from 'styled-components'
import { BiX } from 'react-icons/bi'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// MY COMPONENTS -  ELEMENTS
import RenderProgress from '../../ComponentsProgressDisplayers/RenderProgressScreenOutputs'
import { ElementBagdeTreeItem} from '../../Elements/ElementBagdeTreeItem';
import { TooltipNAV } from "../../Elements/ElementStyledTooltip";

// SCREENS
import ValueInsert from './ScreenComponents/ValueInsert'
import MultiTileSelect from './ScreenComponents/MultiTileSelectV2'
import GroupMultiTileSelect from './ScreenComponents/GroupMultiTileSelectV2'
import VarIntervalSelection from './ScreenComponents/VarIntervalSelectionV4'
import BooleanSelectionV2 from './ScreenComponents/BooleanSelectionV2'
import InputString from './ScreenComponents/InputString'
import IntervalTimeSelection from './ScreenComponents/IntervalTimesSelection'
import InfoScreen from './ScreenComponents/InfoScreen'
import TileSelectionV3 from './ScreenComponents/TileSelectionV3'
import MultiBooleanSelection from './ScreenComponents/MultiBooleanSelection'
import CustomInput from './ScreenComponents/CustomInputScreen/CustomInput'

// MODELS
import { cPackFE,SchemaProgressOutput} from '../../Models/cPackFE'
import SchemaScreen from '../../Models/SchemaScreen'
import SchemaScreenComponent from '../../Models/SchemaScreenComponent'

// SHARE
import {defInfoBackground,defFilterColor,defButtonCancel,defButtonCancelText} from "../../Shared/Colors"
import  * as colorDef from '../../Shared/Colors'

// API

const GeneralContainer = styled.div`
    width: 100vw;
    max-height: 100vh;
    height: 100vh;
    position: absolute;
    top:0;
    left:0;
    background-color: rgba(0,0,0,0.5);
    backdrop-filter: blur(0.3rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 600;
    padding: 1rem;
`

const CancelButton = styled.button`
    border: 0;
    border-radius: 0.7rem;
    background-color: ${defButtonCancel};
    color: ${defButtonCancelText};
    height: 2.7rem;
    width: 9rem;
    padding: 1rem;
    padding-right: 1.5rem;
    box-shadow: rgb(60 64 67 / 30%) 0px 1px 2px 0px, rgb(60 64 67 / 15%) 0px 2px 6px 2px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.2rem;
`
const CardsContainer = styled.div`
    width: 100%;
    max-height: 52rem;
    height: 52rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`

const LeftCardContainerV2 = styled.div`
    width: 53rem;
    height: 100%;
    max-height: 85vh;
    border-radius: 1rem;
    background-color: white;
    display: grid;
    grid-template-rows: 3.5rem minmax(0,1fr);
    grid-template-columns:100%;
    padding: 1rem;
    box-shadow: rgb(60 64 67 / 30%) 0px 1px 2px 0px, rgb(60 64 67 / 15%) 0px 2px 6px 2px;
    overflow-y: auto;
`

const RightCardContainer = styled.div`
    width: 30rem;
    height: 100%;
    max-height: 85vh;
    border-radius: 1rem;
    background-color: white;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    box-shadow: rgb(60 64 67 / 30%) 0px 1px 2px 0px, rgb(60 64 67 / 15%) 0px 2px 6px 2px;
`
const NavigationButtonsContainer = styled.div`
    width: 100%;
    max-width:53rem;
    display: grid;
    grid-template-columns: repeat(3,1fr);
    padding-top: 1rem;
    justify-items: center;
`


const NavigationButton = styled.button`
    height: 2.7rem;
    width: 9rem;
    background-color: white;
    color: black;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content:center;
    border: 0;
    border-radius: 1rem;
    box-shadow: rgb(60 64 67 / 30%) 0px 1px 2px 0px, rgb(60 64 67 / 15%) 0px 2px 6px 2px;
    padding-left: 1rem;
    padding-right: 1rem;
    font-weight: bold;
    gap: 0.5rem;
`

const TitleContainer = styled.div`
    width: 100%;
    background-color: #149583;
    border-radius: 1rem;
    color: white;
    padding: 0.7rem;
    font-size: 1.5em;
    z-index: 800;
`
const TitleContainerV2 = styled.div`
    width: 100%;
    background-color: #149583;
    border-radius: 1rem;
    color: white;
    font-size: 1.5em;
    z-index: 800;
    display: flex;
    height: 100%;
    justify-items: center;
    justify-content: center;
    align-items: center;
    align-content: center;
`
const ProgressValuesContainer = styled.div`
    width: 100%;
    max-height: 15rem;
    gap:1rem;
`


interface Props {
    screen: SchemaScreen
    progress: cPackFE
    editingMode:boolean
    onHide: () => void
    onSave: (currentScreen: SchemaScreen, output: any) => Promise<any>
    onBack: () => void
}

function Popup(props: Props) {
    const [currentOutput, setCurrentOutput] = useState<any[]>([]);
    // Esta variable de estado determina si se puede avanzar a la siguiente
    // página. Es decir, si el input que ha realizado (o no realizar ninguno)
    // es admisible.
    // Su valor por defecto es "false", por lo tanto si un componente puede
    // aceptar el no recivir input puede poner en "true" esta variable en el
    // useEffect.
    // En el resto de casos, se debe poner en "true" cuando el input del usuario
    // sea correcto y volver a poner en "false" cuando no lo sea.
    const [canProceed, setCanProceed] = useState<boolean[]>();
    const [ssCurrentCompIndex, setCurrentCompIndex] = useState<number>(0);

    useEffect(() => {
        let arrayFalse = []
        for (let i = 0; i < props.screen.components.length; i++) {
            arrayFalse.push(false)
        }
        setCanProceed(arrayFalse)
        const idxComp = props.screen.components.findIndex((comp: any) => comp.props.values.length > 0);
        setCurrentCompIndex(idxComp === -1 ? props.screen.components.length - 1 : idxComp)
    }, [props.screen])

    const fcn_RestartCanProceeed = () => {
        setCanProceed(undefined);
    }

    const fcn_UpdateCanProceeed = (procComp: boolean, idK: number) => {
        setCanProceed((prev) => {
            if (prev !== undefined) {
                let newArray = [...prev];
                newArray[idK] = procComp;
                return [...newArray]
            }
        }
        )
    }

    const addOutput = (outputKey: string, componentType:string, id: string, output: any) => {
        let aux: any[] = [...currentOutput]
        let outputIndex = -1
        currentOutput.forEach((outputInner, idx) => {
            if (outputInner.output_key === outputKey) outputIndex = idx;
        })
        if (outputIndex >= 0) {
            aux[outputIndex].values = output
        } else {
            aux.push({
                output_key: outputKey,
                componentId: id,
                componentType:componentType,
                values: output
            })
        }
        setCurrentOutput(aux)
    }

    const fcn_Siguiente = () => {
        if(canProceed){
            let auxCompIndex = ssCurrentCompIndex;
            let isNewComp = false;
            while (auxCompIndex < props.screen.components.length - 1 && !isNewComp) {
                if (props.screen.components[auxCompIndex + 1].props.values.length > 0) isNewComp = true;
                else auxCompIndex++;
            }
            if (isNewComp) {
                setCurrentCompIndex(auxCompIndex + 1);
            }
            else {
                props.onSave(props.screen, currentOutput)
                fcn_RestartCanProceeed();
                setCurrentOutput([])
            }
        }
    }

    const fcn_Anterior = () => {
        if(canProceed){
            let auxCompIndex = ssCurrentCompIndex;
            let isNewComp = false;
            while (auxCompIndex > 0 && !isNewComp) {
                if (props.screen.components[auxCompIndex - 1].props.values.length > 0) isNewComp = true;
                else auxCompIndex--;
            }
            if (isNewComp) {
                setCurrentCompIndex(auxCompIndex - 1);
            }
            else {
                props.onBack()
                fcn_RestartCanProceeed()
                setCurrentOutput([])
            }
        }
    }

    const fcn_StringCurrentComponent = () => {
        let idxComp = 0;
        let maxComp = 0;
        props.screen.components.forEach((comp: any, idx: number) => {
            if (comp.props.values.length > 0) maxComp++;
            if (idx === ssCurrentCompIndex) idxComp = maxComp;

        })
        if (maxComp > 1) {
            return " (" + idxComp + "/" + maxComp + ")"
        }
        return ""
    }

    const renderComponent = (component: SchemaScreenComponent, key: number): ReactElement => {
        let outputKey = component.outputKey
        let id = component.id
        let propsComp = component.props
        let prevInputsBE = component.prevValues.length>0?component.prevValues:undefined;
        if (canProceed !== undefined) {
            switch (component.type) {
                case "InfoScreen":
                    return <InfoScreen
                        key={key}
                        body={propsComp}
                        onChange={(output) => addOutput(outputKey, component.type, id, output)}
                        onValidate={(validationWasCorrect) => fcn_UpdateCanProceeed(validationWasCorrect, key)}
                    />
                case "TileSelection":
                    return <TileSelectionV3
                        key={key}
                        body={propsComp}
                        onChange={(output) => addOutput(outputKey, component.type, id, output)}
                        onValidate={(validationWasCorrect) => fcn_UpdateCanProceeed(validationWasCorrect, key)}
                        previousInput={prevInputsBE}
                    />
                case "MultiBooleanSelection":
                    return <MultiBooleanSelection
                        key={key}
                        body={propsComp}
                        onChange={(output) => addOutput(outputKey, component.type, id, output)}
                        onValidate={(validationWasCorrect) => fcn_UpdateCanProceeed(validationWasCorrect, key)}
                        previousInput={prevInputsBE}
                    />
                case "BooleanSelection":
                    return <BooleanSelectionV2
                        key={key}
                        body={propsComp}
                        onChange={(output) => addOutput(outputKey, component.type, id, output)}
                        onValidate={(validationWasCorrect) => fcn_UpdateCanProceeed(validationWasCorrect, key)}
                        previousInput={prevInputsBE}
                    />
                case "InputString":
                    return <InputString
                        key={key}
                        body={propsComp}
                        onChange={(output) => addOutput(outputKey, component.type, id, output)}
                        onValidate={(validationWasCorrect) => fcn_UpdateCanProceeed(validationWasCorrect, key)}
                        previousInput={prevInputsBE}
                    />
                case "IntervalTimeSelection":
                    return <IntervalTimeSelection
                        key={key}
                        body={propsComp}
                        onChange={(output) => addOutput(outputKey, component.type, id, output)}
                        onValidate={(validationWasCorrect) => fcn_UpdateCanProceeed(validationWasCorrect, key)}
                        previousInput={prevInputsBE}
                    />
                case "VarIntervalSelection":
                    return <VarIntervalSelection
                        key={key}
                        body={propsComp}
                        onChange={(output) => addOutput(outputKey, component.type, id, output)}
                        onValidate={(validationWasCorrect) => fcn_UpdateCanProceeed(validationWasCorrect, key)}
                        previousInput={prevInputsBE}
                    />
                case "ValueInsert":
                    return <ValueInsert
                        key={key}
                        body={propsComp}
                        onChange={(output) => addOutput(outputKey, component.type, id, output)}
                        onValidate={(validationWasCorrect) => fcn_UpdateCanProceeed(validationWasCorrect, key)}
                        previousInput={prevInputsBE}
                    />
                case "MultiTileSelect":
                    return <MultiTileSelect
                        key={key}
                        body={propsComp}
                        onChange={(output) => addOutput(outputKey, component.type, id, output)}
                        onValidate={(validationWasCorrect) => fcn_UpdateCanProceeed(validationWasCorrect, key)}
                        previousInput={prevInputsBE}
                    />
                case "GroupMultiTileSelect":
                    return <GroupMultiTileSelect
                        key={key}
                        body={propsComp}
                        onChange={(output) => addOutput(outputKey, component.type, id, output)}
                        onValidate={(validationWasCorrect) => fcn_UpdateCanProceeed(validationWasCorrect, key)}
                        previousInput={prevInputsBE}
                    />
                case "CustomInput":
                    return <CustomInput
                        key={key}
                        body={propsComp}
                        onChange={(output) => addOutput(outputKey, component.type, id, output)}
                        onValidate={(validationWasCorrect) => fcn_UpdateCanProceeed(validationWasCorrect, key)}
                        previousInput={prevInputsBE}
                    />   
                default:
                    return <span style={{ color: "black" }}>Este componente no existe todavía!</span>
            }
        }
        return <span style={{ color: "black" }}>Loading...</span>
    }
    const renderProgress = (progOuts: SchemaProgressOutput[]) => {
        return <RenderProgress
                    progressOutput={progOuts}
                />      
    }
    
    const getColorTitleContainer = () => {
        let colorTitle = ""
        switch(props.progress.type) {
            case "Filtro":
                colorTitle = colorDef.defFilterColor
              break;
            case "Master":
                colorTitle = colorDef.defMasterColor
              break;
            case "Asociada":
                colorTitle = colorDef.defAsociadaColor  
                break;  
          } 
        return colorTitle
    }

    return (
        <GeneralContainer>
            <CardsContainer>
                <LeftCardContainerV2
                    onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()}
                >
                    <TitleContainerV2                         
                    ><span dangerouslySetInnerHTML={{ __html: props.screen?.title + fcn_StringCurrentComponent() }} /></TitleContainerV2>

                    {
  
                        props.screen.components[ssCurrentCompIndex] ?
                            renderComponent(props.screen.components[ssCurrentCompIndex], ssCurrentCompIndex)
                            : "error"
                    }
                </LeftCardContainerV2>
                <RightCardContainer
                    onClick={(event) => {
                        event.stopPropagation()
                    }}
                >
                    <TitleContainer
                        style={{backgroundColor:getColorTitleContainer()}}
                        >
                        Resumen
                    </TitleContainer>
                    <Accordion
                        style={{
                            borderRadius: "1rem",
                            boxShadow: "rgb(60 64 67 / 30%) 0px 1px 2px 0px, rgb(60 64 67 / 15%) 0px 2px 6px 2px",
                            marginTop: "1rem",
                            marginBottom: "0.8rem",
                            height:"3.2rem",
                            display:"flex",
                            alignItems:'center',
                            justifyContent:'center',
                            backgroundColor:defInfoBackground,
                            border: "1px solid lightgray",
                        }}>
                        <div style={{
                            display:"flex",
                            alignItems:'center',
                            justifyContent:'center',
                            gap:'1rem',
                            padding: "0.5rem 1rem",
                            width: "100%",
                            
                        }}>
                            <ElementBagdeTreeItem
                                type={props.progress.type}
                                size={'1.3rem'}
                            />
                             <TooltipNAV title={props.progress.group.name} arrow>       
                                <div style={{ fontWeight: "bold",
                                        textAlign:"left" , 
                                        fontSize:"1.2rem",
                                        overflowX: "hidden",
                                        whiteSpace: "nowrap",
                                        textOverflow: "ellipsis",
                                        width: "100%",                                        
                                    }}>
                                        {props.progress.type==="Filtro: "?"":"Grupo: "} {props.progress.group.name}
                                </div>                
                            </TooltipNAV >                            
                        </div>
                    </Accordion>
                    <div
                        style={{overflowY:"scroll", padding:"0.2rem 0.3rem 0.5rem 0.3rem",  gap:"1rem", display:"flex", flexDirection:"column"}}
                    >
                    {
                        props.progress.screens.map((progScreen) => {
                            if (progScreen.outputs.values != null) {
                                return (
                                    progScreen.outputs.length > 0 ?
                                        <Accordion style={{
                                            borderRadius: "1rem",
                                            boxShadow: "rgb(60 64 67 / 30%) 0px 1px 2px 0px, rgb(60 64 67 / 15%) 0px 2px 6px 2px",
                                            margin: "0rem",
                                        }}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="acc-content"
                                                id="acc-header"
                                            >
                                                <span style={{ fontWeight: "bold",textAlign: "left" }}>{progScreen.screenTitle}</span>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <ProgressValuesContainer>                                                   
                                                    {renderProgress(progScreen.outputs)}
                                                </ProgressValuesContainer>
                                            </AccordionDetails>
                                        </Accordion>
                                        : null
                                )
                            }
                        })
                    }
                    </div>
                </RightCardContainer>
            </CardsContainer>
            <NavigationButtonsContainer>
                <NavigationButton
                    onClick={(event) => {
                        event.stopPropagation()
                        fcn_Anterior();
                    }}
                    style={{
                        visibility: props.progress.screens.length > 1 ?
                            "visible" : "hidden",
                        paddingRight: '1.5rem',
                    }}
                >
                    <FaChevronLeft />
                    Anterior
                </NavigationButton>
                <CancelButton 
                    onClick={() => props.onHide()}
                    style={{visibility: !props.editingMode? "visible" : "hidden"}}
                    >
                    <BiX size="1.5em" />
                    Cancelar
                </CancelButton>
                <NavigationButton
                    onClick={(event) => {
                        event.stopPropagation()
                        fcn_Siguiente();
                    }}
                    disabled={
                        canProceed ?
                            !canProceed[ssCurrentCompIndex] ?
                                true : false
                            : false
                    }
                    style={{
                        paddingLeft: '1.5rem',
                        backgroundColor: canProceed ?
                            !canProceed[ssCurrentCompIndex] ?
                                "gray" : ""
                            : "gray",
                    }}
                >
                    {props.screen.id==="screen_FIN"? "Finalizar":"Siguiente"}
                    <FaChevronRight />
                </NavigationButton>
            </NavigationButtonsContainer>
        </GeneralContainer>
    )
}

export default Popup
