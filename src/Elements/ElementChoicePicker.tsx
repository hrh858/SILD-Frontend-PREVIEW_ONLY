import React, { ReactElement, useState } from 'react'
import { defBlackColor, defBoxShadow, defMainThemeColor, defWhiteColor } from '../Shared/Colors'

interface Props {
    choices: any[]
    defaultChoice: any
    onChange: (selected: any) => void
}

function ElementChoicePicker(props: Props) {
    const [selected, setSelected] = useState<any>(props.defaultChoice)

    const onClick = (selected: any) => {
        setSelected(selected)
        props.onChange(selected)
    }

    const renderChoices = (): ReactElement[] => {
        let choicesRendered = []
        for (let choice of props.choices) {
            choicesRendered.push(
                <button style={{
                    border: 0,
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "50%",
                    padding: "1rem",
                    boxShadow: defBoxShadow,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: choice == selected ? defMainThemeColor : defWhiteColor,
                    color: choice == selected ? defWhiteColor : defBlackColor,
                    transition: "all 0.3s"
                }}
                onClick={() => onClick(choice)}
                >
                    {choice}
                </button>
            )
        }
        return choicesRendered
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem"
        }}>
            {renderChoices()}
        </div>
    )
}

export default ElementChoicePicker
