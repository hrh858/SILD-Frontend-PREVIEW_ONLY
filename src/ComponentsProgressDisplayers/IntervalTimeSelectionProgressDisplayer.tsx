import React from 'react'
import ElementDescription from './ElementDisplay/ElementDescription'


interface Props {
    output: [{ dateEND: string, dateINI: string, id: number, name: string }]
    outputKey:string
}

function IntervalTimeSelectionProgressDisplayer(props: Props) {
    return (
        <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "0.7rem"
        }}>
            {
                props.output.map((outputObj) => {
                    return (
                        <ElementDescription>
                        {
                            outputObj.dateINI === "undefined" && outputObj.dateEND === "undefined" ? 
                            <span><b>Sin restricciones</b></span>
                            : outputObj.dateINI !== "undefined" && outputObj.dateEND !== "undefined" ?
                            <span >Desde <b>{outputObj.dateINI}</b> hasta <b>{outputObj.dateEND}</b></span>
                            : outputObj.dateINI !== "undefined" ?
                            <span>Desde <b>{outputObj.dateINI}</b></span>
                            : <span>Hasta <b>{outputObj.dateEND}</b></span>
                        }
                        </ElementDescription>                       
                    )
                })
            }
        </div>
    )
}

export default IntervalTimeSelectionProgressDisplayer
