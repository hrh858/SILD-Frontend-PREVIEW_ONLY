import React, { useState,useEffect } from 'react'
import styled from 'styled-components'

// MY COMPONENTS -  ELEMENTS
import {CompInputName} from '../../Elements/ElementInputDefineBaseName'

// MODELS

// SHARE
import * as colorDef from '../../Shared/Colors'
import { defShadow } from '../../Shared/Shadows'

// API


const FinishPopupBackground = styled.div`
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
const FinishPopupContainer = styled.div`
    min-height: 19rem;
    background-color: white;
    display: grid;
    grid-template-rows: 5rem 1fr 5rem;
    justify-content: space-between;
    box-shadow: rgb(60 64 67 / 30%) 0px 1px 2px 0px, rgb(60 64 67 / 15%) 0px 2px 6px 2px;
`

const FinishPopupButtonAccept = styled.button`
    border: 0;
    color: ${colorDef.defButtonAcceptText};
    height: 2.5rem;
    width: 10rem;
    border-radius: 0.2rem;
    background-color:${colorDef.defButtonAccept};
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: ${defShadow};
    &:hover{
            transform:scale(1.07);
        }
`
const FinishPopupButtonCancel = styled.button`
    border: 0;
    color: ${colorDef.defButtonCancelText};
    height: 2.5rem;
    width: 10rem;
    border-radius: 0.2rem;
    background-color: ${colorDef.defButtonCancel};
    box-shadow: ${defShadow};
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover{
            transform:scale(1.07);
        }
`
interface Props {
    initialName?:string
    status:number
    closePopup: () => void
    onSaveDatabase: (name: string) => void
    onClearMessage: () => void
    errorString: string
}

export default function FinishCreationPopUp(props: Props) {

    const [databaseName, setDatabaseName] = useState<string>("")
    const [canProceed, setCanProceed] = useState<boolean>(false)
   
    useEffect(() => {
        if(props.status === 2) props.onClearMessage()
        if(databaseName.length>0) setCanProceed(true)
        else setCanProceed(false)
    }, [databaseName])


    return (
        <FinishPopupBackground>
            <FinishPopupContainer>
                <div
                    style={{
                        color:  "white",
                        backgroundColor:colorDef.defMainThemeColor,
                        fontSize:  "2rem",
                        fontWeight:600,
                        display: "inline-flex",
                        justifyContent:"flex-start",
                        alignItems:'center',
                        gap: '1.5rem',                    
                        padding:"0rem 1.5rem",
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                    }}
                >
                    <span>Guardar Base</span>
                </div>
                
                <div style={{
                    color: colorDef.defBlackColor,
                    fontSize:  "1.3rem",
                    display: "flex",
                    flexDirection:"column",
                    gap: '1rem',
                    justifyContent:"center",
                    alignItems:'flex-start',
                    borderBottom:"1px solid "+colorDef.defLineSeparatorColor,
                    padding:"1rem 1.5rem",
                    margin: "0 1rem",
                }}>
                    <span>Introduzca un nombre para la base de datos antes de finalizar su creación</span>
                    <div style={{width:"90%", display:"flex", justifyContent:"center", alignSelf:"center"}}>
                        <CompInputName
                            initialName={props.initialName}
                            onChangeName={(newName) => {setDatabaseName(newName)}}                  
                        />
                    </div>                                       
                </div>   

                <div style={{display: "flex", flexDirection: "row", width: "100%", height:'100%',alignItems:'center', justifyContent: "space-around"}}>
                    <FinishPopupButtonAccept disabled={!canProceed} onClick={() => props.onSaveDatabase(databaseName)}>
                        Aceptar
                    </FinishPopupButtonAccept>
                    <FinishPopupButtonCancel onClick={() => props.closePopup()}>
                        Cancelar
                    </FinishPopupButtonCancel>                                      
                </div>
                    
                {props.status === 2?
                    <span style={{color: "#721c24", width:'100%',fontSize: "1em", padding:"0.5rem 0rem",backgroundColor:"#f5c6cb",border:"1px #f5c6cb solid",marginTop:'0rem'}}>
                        {props.errorString}
                    </span>
                    : null
                }
                    
            </FinishPopupContainer>
        </FinishPopupBackground>
    )
}
