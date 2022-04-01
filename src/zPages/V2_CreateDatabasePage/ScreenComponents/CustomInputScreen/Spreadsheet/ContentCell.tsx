import React, { useEffect } from 'react'
import { defBlackColor } from '../../../../../Shared/Colors'

export default function ContentCell(props: {
    onClick: () => void
    value: string
    editing: boolean
    invalid: boolean
    onChange: (newValue: string) => void
}) {

    console.log(props.invalid)
    
    return (
        <div style={{
            width: "10rem",
            height: "2rem",
            border: props.editing ? "solid 2px #149583" : props.invalid ? "solid 2px red" : "solid 1px #d3d3d3",
            cursor: "text"
        }}
        onClick={props.onClick}
        >
            {
                props.editing ?
                    <input
                        autoFocus
                        type="text"
                        onChange={e => props.onChange(e.target.value)}
                        style={{
                            width: "100%",
                            height: "100%",
                            color: defBlackColor,
                            border: 0
                        }}
                        value={props.value || ""}
                    />
                    :
                    <span style={{
                        width: "100%",
                        height: "100%",
                        color: defBlackColor
                    }}>
                        {props.value}
                    </span>
            }
        </div>
    )
}
