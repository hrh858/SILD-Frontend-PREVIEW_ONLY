import React from 'react'
import styled from 'styled-components'
import { defGreenColor } from '../../../../../Shared/Colors'
import { defShadow } from '../../../../../Shared/Shadows'
import { Spreadsheet } from './Types'

const TypeListItem = styled.li`
    width: 100%;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1.5rem;
    &:hover {
        background-color: white;
        color: #149583;
    }
`

export default function HeaderSelectionDropdown(props: {
    onChange: (newType: Spreadsheet.ColumnType) => void
}) {
  return (
      <ul style={{
          position: "absolute",
          width: "9rem",
          top: "2rem",
          textAlign: "left",
          backgroundColor: defGreenColor,
          borderRadius: "0rem 0rem 1rem 1rem",
          listStyleType: "none",
          margin: 0,
          padding: 0,
          border: 0,
          gap: "0.2rem",
          overflow: "hidden",
          boxShadow: defShadow
      }}>
          <TypeListItem onClick={() => props.onChange(Spreadsheet.NHCColumnType)}>
              {Spreadsheet.NHCColumnType.name}
          </TypeListItem>
          <TypeListItem onClick={() => props.onChange(Spreadsheet.IntColumnType)}>
              {Spreadsheet.IntColumnType.name}
          </TypeListItem>
          <TypeListItem onClick={() => props.onChange(Spreadsheet.FloatColumnType)}>
              {Spreadsheet.FloatColumnType.name}
          </TypeListItem>
          <TypeListItem onClick={() => props.onChange(Spreadsheet.StringColumnType)}>
              {Spreadsheet.StringColumnType.name}
          </TypeListItem>
      </ul>
  )
}
