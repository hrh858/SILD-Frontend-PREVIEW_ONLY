import React from 'react'
import ElementDescription from './ElementDisplay/ElementDescription'

interface Props {
    output: { id: number, name: string, varSelected: { id: string, name: string }[] }[]
    outputKey: string
}

function MultiBooleanSelectionProgressDisplayer(props: Props) {
    return (
        <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "0.7rem"
        }}>
            {
            props.output.length === 0 ?
                <ElementDescription>
                    <span>Sin selección</span>
                </ElementDescription>
                : 
                props.output.map((outputObj) => {
                    return (
                        <ElementDescription
                            propsElem={{justifyContent:"flex-start"}}
                        >
                            <div style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.3rem"
                            }}>
                            <span style={{textAlign:"left", fontSize:"1rem"}}>
                                <b>{outputObj.name}</b>
                            </span>                            
                                {outputObj.varSelected.map((varSelec) => <span style={{ color: "#149583",textAlign:"left"}}> &nbsp;&nbsp;- {varSelec.name}</span>)}
                            
                            </div>
                        </ElementDescription>
                    )
                })                  
            }
        </div>)
}

export default MultiBooleanSelectionProgressDisplayer
