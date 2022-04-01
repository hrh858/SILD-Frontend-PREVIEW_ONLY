import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { defBlackColor, defBorderRadius, defMainThemeColor, defWhiteColor } from '../Shared/Colors'

interface Props {
    onChange: (text: string) => void
}

export default function ElementSearchBox(props: Props) {
    const [text, setText] = useState<string>("")

    const onChange = (newText: string) => {
            props.onChange(newText)
            setText(newText)
    }

    return (
        <div style={{
            height: "3rem",
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <FaSearch
                color={defBlackColor}
                size="1.3rem"
            />
            <input
                value={text}
                // placeholder = {"Buscar"}
                onChange={(e) => onChange(e.target.value)}
                type="text"
                style={{
                    border: 0,
                    width: "100%",
                    backgroundColor: defMainThemeColor,
                    color: defWhiteColor,
                    padding: "0.4rem 0.8rem",
                    borderRadius: defBorderRadius
                }}
            />
        </div>
    )
}


