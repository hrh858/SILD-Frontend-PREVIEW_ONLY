import React, { useEffect, useRef, useState } from 'react'
import { defMainThemeColor, defRedColor, defWhiteColor } from '../Shared/Colors'
import {fcn_sanitizeStringAlphanumeric} from "../Services/auxFunctions"

interface PropsInputName {
    initialName?: string
    onChangeName: (newName: string) => void
}

export function CompInputName(props: PropsInputName) {

    const [ssCurrentName,setCurrentName] = useState<string>("")

    useEffect(() => {
        if (props.initialName) setCurrentName(props.initialName)
    },[])

    useEffect(() => {
        props.onChangeName(ssCurrentName)
    },[ssCurrentName])

    const sanitizeNameAndCallback = (name: string) => {
        let sanitizedName = fcn_sanitizeStringAlphanumeric(name)
        setCurrentName(sanitizedName)
        
    }

    return (    
        <div style={{
            width: "calc(100% - 2rem)",
            height: "2.5rem",
            backgroundColor: defWhiteColor,
            border: "solid 2px rgb(20,149,131)",
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            borderRadius: "20rem",
            padding: "0rem 1.1rem",
            // marginTop:"0.5rem",
   
        }}>
        <input
            type="text"
            value={ssCurrentName}
            onChange={(event) => sanitizeNameAndCallback(event.target.value)}
            style={{
                width: "100%",
                border: 0,
                margin: 0,
                backgroundColor: "transparent",
                color: defMainThemeColor,
            }}
        />
        </div>
    )
}
