import React, {  useEffect } from 'react'
import * as  colorDef from '../../Shared/Colors'
import {  FaExclamationTriangle} from "react-icons/fa"
import {  MyModalButton } from '../../zComponents/MyModal'
import { useHistory } from "react-router-dom";


export default function ErrorPage() {
    const history = useHistory();

    const getMiddleText = () =>{
        let aux = history.location.pathname.split('/')
        let errorID = aux[aux.length - 1]

        if(errorID === "1"){
            return "ERROR: servidor no responde"
        }

        if(errorID === "2"){
            return "ERROR: la respuesta proporcionada por el servidor no es interpretable"
        }
        
        if(errorID === "3"){
            return "ERROR: Su acceso ha caducado. Vuelva a entrar en la aplicación si desea continuar utilizándola."
        }

        return "ERROR: desconocido"
    }

    const onClosePage = () =>{
        history.push("/");
    }

    useEffect(() => {

    }, [])

    return (
        <div style={{
            position: "absolute",
            width: "100vw",
            height: "100vh",
            display: 'flex',
            justifyContent:'center',
            alignItems:'center',
            backdropFilter: "blur(1rem) brightness(70%)",
            zIndex:  1500
        }}>
            <div style={{
                width:  "40rem",
                minHeight: "18rem",
                backgroundColor: colorDef.defWhiteColor,
                zIndex:  1500,
                display: "grid",
                gridTemplateRows :"5rem 1fr 5rem",
            }}>
                <div
                    style={{
                        color:  "white",
                        backgroundColor:colorDef.defRedColor,
                        fontSize:  "2rem",
                        fontWeight:600,
                        display: "inline-flex",
                        justifyContent:"flex-start",
                        alignItems:'center',
                        gap: '1.5rem',
                        padding:"0rem 1.5rem",
                        minWidth: '100%',
                        height: '100%',
                        position: 'relative',
                    }}

                >
                     <FaExclamationTriangle  style={{  color: "white" }} />
                    <span>ALERTA</span>
                </div>
                <div style={{
                        color:  colorDef.defBlackColor,
                        fontSize: "1.2em",
                        display: "flex",
                        flexDirection:"column",
                        justifyContent:"center",
                        alignItems:'center',
                        borderBottom:"1px solid "+colorDef.defLineSeparatorColor,
                        padding:"1rem 0rem",
                        margin: "0 1.3rem",
                        maxWidth: '100%',
                        gap:"0.7rem"
                    }}>
                    {getMiddleText()}
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    width: "100%"
                }}>
                    <MyModalButton
                        style={{
                            width: '10rem', height: '2.5rem'
                        }}
                        displayText="Cerrar"
                        onClickCallback={onClosePage}
                      />
                </div>
            </div>
        </div>
    )
}
