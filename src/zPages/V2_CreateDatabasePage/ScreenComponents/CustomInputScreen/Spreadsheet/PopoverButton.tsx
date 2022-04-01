import React, { ReactElement, useState } from 'react'
import { defGreenColor, defWhiteColor } from '../../../../../Shared/Colors'

export default function PopoverButton(props: {
    callbackFunction: () => void
    text: string
    icon: ReactElement
}) {
    const [hover, setHover] = useState<boolean>(false)
  return (
      <button style={{
          width: "15rem",
          height: "2.5rem",
          fontSize: "0.8em",
          border: 0,
          color: hover ? "white" : "black",
          backgroundColor: hover ? defGreenColor : defWhiteColor,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0rem 1rem"
      }}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onClick={() => props.callbackFunction()}
      >
          { props.text }
          { props.icon }
      </button>
  )
}
