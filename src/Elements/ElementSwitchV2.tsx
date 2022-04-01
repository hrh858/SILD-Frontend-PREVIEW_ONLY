import React, { useState } from 'react'
import ReactSwitch from 'react-switch'
import { defMainThemeColor, defWhiteColor, defSelectedElem,defBlackColor2, defGrayLightColor, defBorderRadius, defGrayColor } from '../Shared/Colors'

interface Props {
    active: boolean
    onChange: (active: boolean) => void
}

function ElementSwitchV2(props: Props) {

    const onClick = () => {
        props.onChange(!props.active)
    }

    return (
        <ReactSwitch
            checked={props.active}
            onChange={() => onClick()}
            onColor={defSelectedElem}
            offColor={defGrayLightColor}
            // onHandleColor={defWhiteColor}
        />
    )
}

export default ElementSwitchV2
