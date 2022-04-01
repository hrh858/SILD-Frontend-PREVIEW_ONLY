import React, { ReactElement } from 'react'
import { defBlackColor } from '../Shared/Colors'

interface Props {
    text: string
    boldText: boolean
    element: ReactElement
}

function ElementTextSide(props: Props) {
    return (
        <div style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "space-between"
        }}>
            {props.text !== ""?
            <span style={{
                fontWeight: props.boldText ? "bold" : "normal",
                color: defBlackColor
            }}>{props.text}</span>
            :null}
            {props.element}
        </div>
    )
}

export default ElementTextSide
