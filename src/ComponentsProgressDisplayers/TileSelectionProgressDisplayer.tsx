import React from 'react'
import ElementText from "./ElementDisplay/ElementText"

interface Props {
    output: [{ id: number, name: string }]
    outputKey:string
}

function TileSelectionProgressDisplayer(props: Props) {
    return (
        <div style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "0.7rem",
        }}>
            {
                props.output.map((outputObj) => {
                    return <ElementText
                        hoverText={outputObj.name}
                        name={outputObj.name}
                    />               
                })
            }
        </div>
    )
}

export default TileSelectionProgressDisplayer
