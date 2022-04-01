import React from 'react'
import ReactSwitch from 'react-switch'
import {  defSelectedElem,   defGrayColor } from '../Shared/Colors'

interface Props {
    active: boolean
    onChange: (active: boolean) => void
}

function ElementSwitch(props: Props) {

    const onClick = () => {
        props.onChange(!props.active)
    }

    return (
        <ReactSwitch
            checked={props.active}
            onChange={() => onClick()}
            onColor={defSelectedElem}
            offColor={defGrayColor}
        />
    )
}

export default ElementSwitch
