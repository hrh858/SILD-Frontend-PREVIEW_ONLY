import { Popover } from '@material-ui/core'
import React, { useState } from 'react'
import { AiOutlineInsertRowAbove, AiOutlineInsertRowBelow, AiOutlineInsertRowLeft, AiOutlineInsertRowRight } from 'react-icons/ai'
import { FaPaste } from 'react-icons/fa'
import { IoMdClose, IoMdTrash } from 'react-icons/io'
import PopoverButton from './PopoverButton'

export enum SurroundingCellType {
    Column,
    Row
}

export default function SurroundingCell(props: {
    type: SurroundingCellType,
    displayBadge: string,
    selectCell: () => void,
    removeFunction: () => void,
    pasteFunction: () => void,
    addFunctions: [() => void, () => void],
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
                {
                    props.type == SurroundingCellType.Column ?
                        [
                            <PopoverButton
                                text="Insertar columna a la derecha"
                                icon={<AiOutlineInsertRowRight size="1.5em"/>}
                                callbackFunction={() => {
                                    props.addFunctions[1]()
                                    setAnchorEl(null)
                                }}
                            />,
                            <PopoverButton
                                text="Insertar columna a la izquierda"
                                icon={<AiOutlineInsertRowLeft size="1.5em"/> }
                                callbackFunction={() => {
                                    props.addFunctions[0]()
                                    setAnchorEl(null)
                                }}
                            />,
                            <PopoverButton
                                text="Pegar columna"
                                icon={<FaPaste size="1.5em"/> }
                                callbackFunction={() => {
                                    props.pasteFunction()
                                    setAnchorEl(null)
                                }}
                            />,
                            <PopoverButton
                                text="Eliminar columna"
                                icon={<IoMdTrash size="1.5em"/> }
                                callbackFunction={() => {
                                    props.removeFunction()
                                    setAnchorEl(null)
                                }}
                            />,
                            <PopoverButton
                                text="Cerrar"
                                icon={<IoMdClose size="1.5em"/> }
                                callbackFunction={() => setAnchorEl(null)}
                            />
                        ]
                        :
                        [
                            <PopoverButton
                                text="Insertar fila arriba"
                                icon={<AiOutlineInsertRowAbove size="1.5em"/>}
                                callbackFunction={() => {
                                    props.addFunctions[0]()
                                    setAnchorEl(null)
                                }}
                            />,
                            <PopoverButton
                                text="Insertar fila abajo"
                                icon={<AiOutlineInsertRowBelow size="1.5em"/>}
                                callbackFunction={() => {
                                    props.addFunctions[1]()
                                    setAnchorEl(null)
                                }}
                            />,
                            <PopoverButton
                                text="Pegar fila"
                                icon={<FaPaste size="1.5em"/> }
                                callbackFunction={() => {
                                    props.pasteFunction()
                                    setAnchorEl(null)
                                }}
                            />,
                            <PopoverButton
                                text="Eliminar Fila"
                                icon={<IoMdTrash size="1.5em"/> }
                                callbackFunction={() => {
                                    props.removeFunction()
                                    setAnchorEl(null)
                                }}
                            />,
                            <PopoverButton
                                text="Cerrar"
                                icon={<IoMdClose size="1.5em"/> }
                                callbackFunction={() => setAnchorEl(null)}
                            />
                        ]
                }
            </Popover>
            <div style={{
                width: "10rem",
                backgroundColor: anchorEl ? "darkgrey" : "whitesmoke",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: anchorEl ? "solid 1px grey" : "solid 1px grey",
                cursor: "pointer"
            }}
                onClick={(event) => {
                    props.selectCell()
                    anchorEl ? setAnchorEl(null) : setAnchorEl(event.currentTarget)
                }
                }
            >
                <span style={{
                    color: anchorEl ? "white" : "grey",
                }}>
                    {props.displayBadge}
                </span>
            </div>
        </>
    )
}
