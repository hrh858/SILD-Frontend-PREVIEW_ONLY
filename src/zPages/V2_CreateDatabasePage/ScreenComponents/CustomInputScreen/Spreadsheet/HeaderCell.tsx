import React, { useState } from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'
import { defWhiteColor } from '../../../../../Shared/Colors'
import HeaderSelectionDropdown from './HeaderSelectionDropdown'
import { Spreadsheet } from './Types'

export default function HeaderCell(props: {
    value: string | null
    showDropdown: boolean
    onChangeColumnType: (newType: Spreadsheet.ColumnType) => void
    onClick: () => void
}) {

    const onSelectFromDropdown = (newType: Spreadsheet.ColumnType) => props.onChangeColumnType(newType)

    return (
        <div>
            {
                props.showDropdown ?
                    <HeaderSelectionDropdown
                        onChange={(type) => { onSelectFromDropdown(type) }}
                    /> : null
            }
            <button style={{
                width: "9rem",
                height: "2rem",
                border: "solid 1px #149583",
                backgroundColor: defWhiteColor
            }}
            onClick={props.onClick}
            >
                <div style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around"
                }}>
                    <span style={{
                        fontWeight: "bold",
                        color: "#149583"
                    }}>{props.value}</span>
                    <IoMdArrowDropdown color="#149583" />
                </div>
            </button>
        </div>
    )
}
