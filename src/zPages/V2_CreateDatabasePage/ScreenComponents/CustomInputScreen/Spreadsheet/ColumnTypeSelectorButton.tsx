import React, { useState } from 'react'
import { Popover } from '@material-ui/core'
import { AiOutlineNumber } from 'react-icons/ai'
import { IoMdClose, IoMdPerson, IoMdText } from 'react-icons/io'
import PopoverButton from './PopoverButton'
import { Matrix } from './MatrixNamespace'

export default function ColumnTypeSelectorButton(props: {
    displayText: string
    onChangeColumnType: (newType: Matrix.MatrixColumnType) => void
}) {

    const [anchorEl, setAnchorEl] = useState<any>(null)

    return (
        <>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: 0
                }}
            >
                <PopoverButton
                    callbackFunction={() => { props.onChangeColumnType(Matrix.MatrixColumnType.NHC); setAnchorEl(null)  }}
                    text="NHC"
                    icon={<IoMdPerson size="1.5em"/>}
                />
                <PopoverButton
                    callbackFunction={() => { props.onChangeColumnType(Matrix.MatrixColumnType.Integer); setAnchorEl(null)  }}
                    text="Entero"
                    icon={<AiOutlineNumber size="1.5em"/>}
                />
                <PopoverButton
                    callbackFunction={() => { props.onChangeColumnType(Matrix.MatrixColumnType.Decimal); setAnchorEl(null)  }}
                    text="Decimal"
                    icon={<AiOutlineNumber size="1.5em"/>}
                />
                <PopoverButton
                    callbackFunction={() => { props.onChangeColumnType(Matrix.MatrixColumnType.String); setAnchorEl(null)  }}
                    text="Texto"
                    icon={<IoMdText size="1.5em"/>}
                />
                <PopoverButton
                    callbackFunction={() => { setAnchorEl(null) }}
                    text="Cerrar"
                    icon={<IoMdClose size="1.5em"/>}
                />
            </Popover>
            <div style={{
                width: "10rem",
                backgroundColor: anchorEl ? "#149583" : "white",
                color: anchorEl ? "white" : "black",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: anchorEl ? "solid 1px grey" : "solid 1px grey",
                cursor: "pointer"
            }}
                onClick={(event) => {
                    anchorEl ? setAnchorEl(null) : setAnchorEl(event.currentTarget)
                }}
            >
                <span style={{
                    color: anchorEl ? "white" : "grey",
                }}>
                    {props.displayText}
                </span>
            </div>
        </>
    )
}
