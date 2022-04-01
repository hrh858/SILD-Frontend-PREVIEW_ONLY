import React from 'react'
import { defMainThemeColor, defWhiteColor } from '../Shared/Colors'
import { defShadow } from '../Shared/Shadows'


interface Props {
    output: [{ id: string, name: string, frec: number, ref: { id: string, name: string }, ini: { id: string, name: string, days: number }, fin: { id: string, name: string, days: number } }]
    outputKey: string
}

export default function VarIntervalSelectionProgressDisplayer(props: Props) {
    function getTextDays(days:number){
        if(days !== 0)
        {
            if(days > 0) return " + " +days +" día/s"
            else return " - " + Math.abs(days) +" día/s"
        }
        return "" 

    }

    function render() {
        return props.output.map((out) => {
            if (out.ini.id === out.fin.id && out.ini.days === out.fin.days) { // Día concreto
                return <span>- Captación: el día <b>{out.ini.name+getTextDays(out.ini.days)}.</b></span>
            }
            else{                
                return <span>- Captación periodo de <b>{out.ini.name+getTextDays(out.ini.days)}</b> a <b>{out.fin.name+getTextDays(out.fin.days)}</b> {out.frec === 0?".":("con una frecuencia de "+out.frec+ " día/s.")}</span>
            }
        })
    }

    return (
        <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "0.7rem"
        }}>
            {}
            {props.output.map((out) => {
                return (
                    <div style={{
                        backgroundColor: defWhiteColor,
                        color: "#149583",
                        border: "2px solid #149583",
                        boxShadow: defShadow,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        borderRadius: "1rem",
                        padding: "0 1.5rem"
                    }}>
                        <span style={{
                            alignSelf: "center",
                            padding: "0.7rem 0",
                            fontSize: "1.1em",
                            width: '100%',
                            borderBottom:"1px solid "+defMainThemeColor,
                        }}><b>{out.name}</b></span>
                         <div style={{
 
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            padding: "0.85rem 0",
                            gap:"0.4rem",
                            textAlign:"left",
                        }}>
                            {render()}                            
                            <span>- Estudio realizado respecto a <b>{out.ref.name}.</b></span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
