import React from 'react'
import { defWhiteColor } from '../Shared/Colors'

interface Props {
    output: { id: number, name: string }[]
    outputKey:string
}

function BooleanSelectionProgressDisplayer(props: Props) {
    return (
        <div style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: "0.7rem"
        }}>
            {
                props.output.length === 0 ?
                    <div style={{
                        backgroundColor: defWhiteColor,
                        color: "#149583",
                        border: "2px solid #149583",
                        padding: "0.7rem",
                        boxShadow: "rgb(60 64 67 / 30%) 0px 1px 2px 0px, rgb(60 64 67 / 15%) 0px 2px 6px 2px",
                        borderRadius: "1rem",
                        fontSize: "0.8em"
                    }}>
                        Sin selección
                </div>
                    : props.output.map((outputObj) => {
                        return (
                            <div style={{
                                backgroundColor: defWhiteColor,
                                color: "#149583",
                                border: "2px solid #149583",
                                padding: "0.7rem",
                                boxShadow: "rgb(60 64 67 / 30%) 0px 1px 2px 0px, rgb(60 64 67 / 15%) 0px 2px 6px 2px",
                                borderRadius: "1rem",
                                fontSize: "0.8em"
                            }}>
                                <b>{outputObj.name}</b>
                            </div>
                        )
                    })
            }
        </div>)
}

export default BooleanSelectionProgressDisplayer
