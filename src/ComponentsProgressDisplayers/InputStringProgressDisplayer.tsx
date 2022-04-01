import React from 'react'

import ElementMyDisplayFieldset from './ElementDisplay/ElementMyDisplayFieldset'

interface iOutput {
    id: number,
    name: string,
    realName?: string
}


interface Props {
    output: iOutput[]
    outputKey: string
}

function InputStringProgressDisplayer(props: Props) {
    return (
        <div style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns:  props.output.length===1? "":"repeat(2, 1fr)",
            gap: "0.5rem"
        }}>
            {
                props.output.map((outputObj) => {
                    return (
                        <ElementMyDisplayFieldset
                            legendText={outputObj.realName!}
                        >
                            <span style={{
                            }}>
                                {outputObj.name ? outputObj.name : "Sin asignación"}
                            </span>
                        </ElementMyDisplayFieldset>
                    )
                })
            }
        </div>
    )
}

export default InputStringProgressDisplayer
