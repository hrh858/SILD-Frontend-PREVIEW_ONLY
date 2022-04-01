import React, { useState } from 'react'
import { defBorderRadius, defMainThemeColor, defWhiteColor } from '../Shared/Colors'
import { AiOutlineNumber } from 'react-icons/ai'

interface Props {
    defaultNumber: number
    maxLenght: number | null
    maxNumber: number | null
    onChange: (number: number) => void
}

function ElementNumberField(props: Props) {
    const [text, setText] = useState<number>(props.defaultNumber)
    function validateInput(input: number): boolean {
        let isValid = true
        if (props.maxNumber && input > props.maxNumber)
            isValid = false
        if (props.maxLenght && input.toString().length > props.maxLenght)
            isValid = false
        return isValid
    }
    const onChange = (newNumber: number) => {
        if (validateInput(newNumber)) {
            props.onChange(newNumber)
            setText(newNumber)
        }
    }
    return (
        <div style={{
            height: "3rem",
            display: "flex",
            gap: "0.3rem",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <AiOutlineNumber
                size="1.3rem"
            />
            <input
                value={text}
                type="number"
                onChange={(e) => onChange(parseInt(e.target.value))}
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

export default ElementNumberField
