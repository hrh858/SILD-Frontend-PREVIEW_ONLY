import React from 'react'
import { defBlackColor } from '../Shared/Colors'

interface Props {
    text: string
}

function ElementInformativeText(props: Props) {
    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            color: defBlackColor
        }}>
            <span style={{
                fontWeight: "bold",
                textDecoration: "underline"
            }}>{props.text}</span>
        </div>
    )
}

export default ElementInformativeText