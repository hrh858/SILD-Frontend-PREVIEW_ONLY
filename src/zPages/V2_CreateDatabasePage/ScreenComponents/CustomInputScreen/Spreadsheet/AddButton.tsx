import React from 'react'
import { AiOutlineColumnWidth } from 'react-icons/ai'
import { defGreenColor, defWhiteColor } from '../../../../../Shared/Colors'

export default function AddColsButton() {
  return (
    <button style={{
        border: "solid 1px xxx",
        padding: "1rem",
        borderRadius: "0.5rem",
        backgroundColor: defWhiteColor,
        color: defGreenColor,
    }}>
        Añadir nueva columna
        <AiOutlineColumnWidth />
    </button>
  )
}
