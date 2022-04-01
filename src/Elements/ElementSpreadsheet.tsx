import React, { useRef, useState } from 'react'

/*namespace CustomSpreadSheet {
    type ColumnValidationResult = {
        valid: boolean
        errorMessage?: string
    }

    export type Column = {
        name: string
        validator: (value: string) => ColumnValidationResult
    }

    export namespace DefaultColumns {
        export const Text: Column = {
            name: "Texto",
            // En este caso la validación siempre pasa correctamente
            validator: (value: string) => { return { valid: true } }
        }

        export const Numeric: Column = {
            name: "Número",
            validator: (value: string) => {
                if (Number(value)) return { valid: true }
                else return { valid: false, errorMessage: "No se ha introducido un valor numérico" }
            }
        }

        export const NHC: Column = {
            name: "NHC",
            validator: (value: string) => {
                let num = Number(value)
                if (!num) return { valid: false, errorMessage: "El valor introducido no es numérico" }
                else if (num.toString().length > 7) return { valid: false, errorMessage: "El valor es demasiado largo" }
                else return { valid: true }
            }
        }
    }

    type ValuePosition = {
        row: number,
        column: number
    }

    type AddValueResult = {
        succeded: boolean,
        errorMessage?: string
    }

    export class CustomSpreadSheet {
        private _values: any[][] = [[]]
        private _columns: Column[] = []
        private _nRows: number = 0
        private _nPossibleValues: number = 0
        private _nSetValues: number = 0
        private _nNullValues: number = 0

        private _onNewSizeCallback: (size: { rows: number, cols: number }) => void
        private _onValueAddedCallback: (newValues: any[][], size: { rows: number, cols: number }) => void
        private _onAddNewColumnCallback: (columns: Column[]) => void
        private _onErrorAddingValueCallback?: (errorMessage?: string) => void

        constructor(
            onNewSizeCallback: (size: { rows: number, cols: number }) => void,
            onValueAddedCallback: (newValues: any[][], size: { rows: number, cols: number }) => void,
            onAddNewColumnCallback: (columns: Column[]) => void,
            onErrorAddingValueCallback?: (errorMessage?: string) => void
        ) {
            this._onNewSizeCallback = onNewSizeCallback
            this._onValueAddedCallback = onValueAddedCallback
            this._onAddNewColumnCallback = onAddNewColumnCallback
            this._onErrorAddingValueCallback = onErrorAddingValueCallback
        }

        private _valuesCopy(): any[][] {
            let val: any[][] = [[]]
            for (let i = 0; i < this._nRows; i++) {
                for (let j = 0; j < this._columns.length; j++) {
                    val[i][j] = this._values[i][j]
                }
            }
            return val
        }
        private _recalculateValues() {
            this._nPossibleValues = this._nRows * this._columns.length
            this._nNullValues = this._nPossibleValues - this._nSetValues
        }
        private _getSizeObject(): { rows: number, cols: number } {
            return {
                rows: this._nRows,
                cols: this._columns.length
            }
        }

        public addNewValue(value: any, position: ValuePosition): AddValueResult {
            let result: AddValueResult
            if (position.row >= this._nRows || position.column >= this._columns.length) result = { succeded: false, errorMessage: "Posición del valor fuera de rango" }
            else {
                let validation = this._columns[position.column].validator(value)
                if (!validation.valid) {
                    if (validation.errorMessage) result = { succeded: false, errorMessage: validation.errorMessage }
                    else result = { succeded: false }
                } else result = { succeded: true }
            }
            if (!result.succeded && this._onErrorAddingValueCallback) this._onErrorAddingValueCallback(result.errorMessage)
            else {
                this._values[position.row][position.column] = value
                this._nSetValues++
                this._onValueAddedCallback(this._valuesCopy(), this._getSizeObject())
            }
            return result
        }

        public addNewColumn(column: Column) {
            this._columns.push(column)
            if (this._nRows === 0) {
                this.addNewRow()
                this._onAddNewColumnCallback([...this._columns])
                return
            }
            this._recalculateValues()
            this._onNewSizeCallback(this._getSizeObject())
            this._onAddNewColumnCallback([...this._columns])
        }

        public addNewRow() {
            if (this._columns.length < 1) {
                return
            }
            this._nRows++
            this._recalculateValues()
            this._onNewSizeCallback(this._getSizeObject())
        }
    }
}

export default function ElementCustomSpreadsheet() {

    const [size, setSize] = useState<{ rows: number, cols: number }>({ rows: 0, cols: 0 })
    const [columns, setColumns] = useState<CustomSpreadSheet.Column[]>([])
    const [values, setValues] = useState<any[][]>([[]])
    const [errors, setErrors] = useState<string[]>([])

    const spreadSheet = useRef(new CustomSpreadSheet.CustomSpreadSheet(
        (size) => { setSize(size) },
        (values) => { setValues(values) },
        (columns) => { setColumns(columns) },
        // (errMsg) => { errMsg ? setErrors([...errors, errMsg]) : null }
    ))

    function renderTable() {
        return (
            <table>
                <tr>
                    {columns.map((col) => <th>{col.name}</th>)}
                </tr>
                {
                    Array.from(Array(size.rows).keys()).map((_) => {
                        return (
                            <tr>
                                {
                                    Array.from(Array(size.cols).keys()).map((_) => {
                                        return (
                                            <td>
                                                <input type="text" defaultValue="---" />
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </table>
        )
    }

    return (
        <div>
            <div style={{color: "black"}}>
                <span>Number of rows: </span>
                <span>{size.rows}</span>
                <button onClick={() => spreadSheet.current.addNewRow()}>+</button>
            </div>
            <div style={{color: "black"}}>
                <span>Number of columns: </span>
                <span>{size.cols}</span>
                <button onClick={() => spreadSheet.current.addNewColumn(CustomSpreadSheet.DefaultColumns.Numeric)}>+</button>
            </div>
            <div style={{color: "black"}}>
                {renderTable()}
            </div>
        </div>
    )
}*/

type SpreadsheetCellPosition = {
    row: number,
    col: number
}
function arePositionsEqual(pos1: SpreadsheetCellPosition, pos2: SpreadsheetCellPosition) {
    return pos1.row == pos2.row && pos1.col == pos2.col
}

function ElementSpreadsheetCell(props: {
    position: SpreadsheetCellPosition,
    selected: boolean,
    value: any,
    onValueChange: (position: SpreadsheetCellPosition, newValue: any) => void,
    onSelect: (position: SpreadsheetCellPosition) => void
}) {
    const {
        position,
        selected,
        value,
        onValueChange,
        onSelect
    } = props

    return (
        <div style={{
            backgroundColor: selected ? "rgba(20,149,131,0.08)" : "white",
            border: selected ? "solid 2px rgb(20,149,131)" : "solid 0.5px gray",
            // backgroundColor: "rgba(20,149,131,0.08)",
            color: "black",
            width: "6rem",
            height: "2rem",
            margin: 0
        }}
            onClick={() => onSelect(position)}
        >
            <span>
                {value}
            </span>
            {/* <input
                type="text"
                value={value}
                onChange={(e) => onValueChange(position, e.target.value,)}
                onSelect={() => onSelect(position)}
            /> */}
        </div>
    )
}


export default function ElementSpreadsheet() {
    const [selectedPosition, setSelectedPosition] = useState<SpreadsheetCellPosition>()
    console.log(selectedPosition)

    function renderCells(rows: number, columns: number) {
        let r = []
        for (let i = 0; i < rows; i++) {
            let c = []
            for (let j = 0; j < columns; j++) {
                c.push(
                    <td style={{ padding: 0 }}>
                        <ElementSpreadsheetCell
                            position={{ row: i, col: j }}
                            selected={selectedPosition ? arePositionsEqual(selectedPosition, { row: i, col: j }) : false}
                            value={0}
                            onValueChange={(pos, val) => { console.log(pos, val) }}
                            onSelect={(pos) => setSelectedPosition(pos)}
                        />
                    </td>
                )
            }
            r.push(
                <tr>
                    {c}
                </tr>
            )
        }
        return r
    }

    return (
        <div>
            <table>
                {renderCells(20, 10)}
            </table>
        </div>
    )
}

