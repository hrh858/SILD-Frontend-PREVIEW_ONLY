import React, { useEffect, useState } from 'react'
import ContentCell from './ContentCell'
import SurroundingCell, { SurroundingCellType } from './SurroundingCell'
import { Matrix } from './MatrixNamespace'
import ColumnTypeSelectorButton from './ColumnTypeSelectorButton'

enum PastingIn { Row, Column }

export default function MySpreadsheet(props: {
    onChange: (output: any) => void
    onValidate: (validationWasCorrect: boolean) => void
}) {
    const [matrixState, setMatrixState] = useState<Matrix.MatrixState>({
        values: [[""]],
        types: [Matrix.MatrixColumnType.NHC]
    })
    const [cursorPosition, setCursorPosition] = useState<[number, number] | null>()

    const withClipboardData = async (pastingEntity: PastingIn, next: (pastedData: string[]) => any) => {
        let aux = await navigator.clipboard.readText()
        let pastedData: string[] = aux.split(pastingEntity == PastingIn.Row ? '\t' : '\n')
        return next(pastedData)
    }
    const typeToString = (type: Matrix.MatrixColumnType): string => {
        switch(type) {
            case Matrix.MatrixColumnType.NHC:
                return "NHC"
            case Matrix.MatrixColumnType.Decimal:
                return "Decimál"
            case Matrix.MatrixColumnType.Integer:
                return "Entero"
            case Matrix.MatrixColumnType.String:
                return "Texto"
        }
    }
    const getArrayFromNColumns = (): number[] => {
        let aux = new Array(matrixState.values[0].length)
        for (let i = 0; i < aux.length; i++) aux[i] = i
        return aux
    }

    useEffect(() => {
        window.addEventListener("keydown", ev => {
            if (ev.key == "Enter") setCursorPosition(null)
        })
        window.addEventListener("paste", ev => ev.preventDefault())
    }, [])

    useEffect(() => {
        console.log("Matrix state: ", matrixState)
        const output = Matrix.generateOutput(matrixState)
        console.log("Output: ", output)
        props.onChange(output)
    })

    return (
        <div style={{
            display: "flex",
            flexDirection: "column"
        }}>
            <div style={{
                display: "flex",
                flexDirection: "row"
            }}>
                <div style={{ width: "10rem" }} />
                {getArrayFromNColumns().map((_, colIdx) =>
                    <ColumnTypeSelectorButton
                        displayText={typeToString(matrixState.types[colIdx])}
                        onChangeColumnType={(newType) => { setMatrixState((current) => Matrix.modifyColumnType(current, newType, colIdx)) }}
                    />
                )}
            </div>
            <div style={{
                display: "flex",
                flexDirection: "row"
            }}>
                <div style={{ width: "10rem" }} />
                {getArrayFromNColumns().map((_, colIdx) =>
                    <SurroundingCell
                        type={SurroundingCellType.Column}
                        displayBadge={(colIdx + 1).toString()}
                        selectCell={() => { }}
                        removeFunction={() => setMatrixState((current) => Matrix.deleteColumn(current, colIdx))}
                        addFunctions={[() => { setMatrixState((current) => Matrix.addColumn(current, colIdx, Matrix.AddColumnSide.Left)) }, () => { setMatrixState((current) => Matrix.addColumn(current, colIdx, Matrix.AddColumnSide.Right)) }]}
                        pasteFunction={() => withClipboardData(PastingIn.Column, (data) => { setMatrixState((current) => Matrix.pasteColumn(current, data, colIdx)) })}
                    />
                )}
            </div>
            {
                matrixState.values.map((rowValues, rowIdx) => {
                    return (
                        <div style={{
                            display: "flex",
                            flexDirection: "row"
                        }}>
                            <SurroundingCell
                                type={SurroundingCellType.Row}
                                displayBadge={(rowIdx + 1).toString()}
                                selectCell={() => { }}
                                removeFunction={() => setMatrixState((current) => Matrix.deleteRow(current, rowIdx))}
                                addFunctions={[() => setMatrixState((current) => Matrix.addRow(current, rowIdx, Matrix.AddRowSide.Above)), () => setMatrixState((current) => Matrix.addRow(current, rowIdx, Matrix.AddRowSide.Below))]}
                                pasteFunction={() => withClipboardData(PastingIn.Row, (data) => { setMatrixState((current) => Matrix.pasteRow(current, data, rowIdx)) })}
                            />
                            {
                                rowValues.map((value, colIdx) =>
                                    <ContentCell
                                        key={[rowIdx, colIdx].toString()}
                                        value={value}
                                        onClick={() => setCursorPosition([rowIdx, colIdx])}
                                        onChange={(newValue => { setMatrixState((current) => Matrix.modifyValue(current, [rowIdx, colIdx], newValue)) })}
                                        editing={cursorPosition != null && (rowIdx == cursorPosition[0] && colIdx == cursorPosition[1])}
                                        invalid={false}
                                    />
                                )
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}