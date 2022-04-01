import React from 'react'
import {  defSelectedElem,defWhiteColor, defBlackColor, defBorderRadius } from '../Shared/Colors'
import { defShadow } from '../Shared/Shadows'

interface Props {
    name: string
    description?: string
    type: string
    onChange: (active: boolean) => void
    active: boolean
    showFullText?: boolean
}

function ElementTile(props: Props) {
    const onClick = () => {
        props.onChange(!props.active)
    }

    return (
        <>
            <button style={{
                border: 0,
                width: "11.3rem",
                height: "6rem",
                overflowY:"auto",
                color: props.active ? defWhiteColor : defBlackColor,
                backgroundColor: props.active ? defSelectedElem : defWhiteColor,
                boxShadow: defShadow,
                borderRadius: defBorderRadius,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s",
                padding: "1rem"
            }}
                onClick={() => onClick()}
            >
                <span style={{
                    overflow: "hidden",
                    whiteSpace: props.showFullText?"normal":"nowrap",
                    textOverflow:  props.showFullText?"":"ellipsis"
                }}>
                    {props.name}                    
                </span>
            </button>
        </>
    )
}

export default ElementTile
