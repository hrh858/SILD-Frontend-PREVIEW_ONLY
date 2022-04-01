import React, { ReactElement } from 'react'
import { defBorderRadius } from '../Shared/Colors'
import { defShadow } from '../Shared/Shadows'

interface Props {
    elements: ReactElement[]
    direction: string
}

function ElementCardContainer(props: Props) {
    const {} = props

    return (
        <div style={{
            padding: "1rem",
            boxShadow: defShadow,
            display: "flex",
            flexDirection: props.direction == "column" ? "column" : "row",
            justifyContent:'space-between',
            alignContent:'center',
            alignItems:'center',
            borderRadius: defBorderRadius,
            gap: "1rem"
        }}>
            {props.elements}
        </div>
    )
}

export default ElementCardContainer
