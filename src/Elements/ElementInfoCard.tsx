import React from 'react'
import { defWhiteColor, defBlackColor } from '../Shared/Colors'
import { defShadow } from '../Shared/Shadows'

interface Props {
    text: string
}

function ElementInfoCard(props: Props) {
    return (
            <span style={{
                backgroundColor: defWhiteColor,
                color: defBlackColor,
                borderRadius: "1rem",
                boxShadow: defShadow,
                padding: "1rem",
                width: "100%"
            }}
            dangerouslySetInnerHTML={{ __html:props.text }} 
            >
                {/* { props.text } */}
            </span>
    )
}

export default ElementInfoCard
