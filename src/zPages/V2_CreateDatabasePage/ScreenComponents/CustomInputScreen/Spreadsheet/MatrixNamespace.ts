export namespace Matrix {
    export type MatrixValue = string
    export type MatrixRawValues = MatrixValue[][]
    export type MatrixPosition = [number, number]
    export type MatrixOutput = { id: string, name: string, values: MatrixValue[] }[]
    export enum MatrixColumnType {
        NHC = "nhc",
        String = "string",
        Integer = "int",
        Decimal = "dec"
    }
    export type MatrixState = {
        values: MatrixRawValues,
        types: MatrixColumnType[]
    }
    export enum AddColumnSide {
        Left,
        Right
    }
    export enum AddRowSide {
        Above,
        Below
    }
    function _getDeepCopy(state: MatrixState): MatrixState {
        let newMat: MatrixRawValues = []
        for (let row = 0; row < state.values.length; row++) {
            let rowValues: Array<MatrixValue> = []
            for (let col = 0; col < state.values[0].length; col++) {
                rowValues.push(state.values[row][col])
            }
            newMat.push(rowValues)
        }
        return {
            values: newMat,
            types: [...state.types]
        }
    }
    export function modifyValue(state: MatrixState, position: MatrixPosition, value: string): MatrixState {
        let aux = _getDeepCopy(state)
        aux.values[position[0]][position[1]] = value
        return aux
    }
    export function resizeColumns(state: MatrixState, targetColumnsNumber: number): MatrixState {
        let aux = _getDeepCopy(state)
        const currentNumberOfColumns = state.values[0].length
        if (targetColumnsNumber > currentNumberOfColumns) {
            console.log("Augmenting columns")
            const numberOfColumnsToAdd = targetColumnsNumber - currentNumberOfColumns
            for (let rowIdx = 0; rowIdx < aux.values.length; rowIdx++) {
                for (let i = 0; i < numberOfColumnsToAdd; i++) aux.values[rowIdx].push("")
            }
        } else if (targetColumnsNumber < currentNumberOfColumns) {
            console.log("Reducing columns")
            const numberOfColumnsToDelete = currentNumberOfColumns - targetColumnsNumber
            for (let rowIdx = 0; rowIdx < aux.values.length; rowIdx++) {
                aux.values[rowIdx].splice(-numberOfColumnsToDelete, numberOfColumnsToDelete)
            }
        }
        return aux
    }
    export function resizeRows(state: MatrixState, targetRowsNumber: number): MatrixState {
        let aux = _getDeepCopy(state)
        const currentNumberOfRows = state.values.length
        if (targetRowsNumber > currentNumberOfRows) {
            console.log("Augmenting rows")
            const numberOfRowsToAdd = targetRowsNumber - currentNumberOfRows
            for (let i = 0; i < numberOfRowsToAdd; i++) {
                let newRow = Array(aux.values[0].length)
                for (let rowIdx = 0; rowIdx < newRow.length; rowIdx++) newRow[rowIdx] = ""
                aux.values.push(newRow)
            }
        } else if (targetRowsNumber < currentNumberOfRows) {
            console.log("Reducing rows")
            const numberOfRowsToDelete = currentNumberOfRows - targetRowsNumber
            aux.values.splice(-numberOfRowsToDelete, numberOfRowsToDelete)
        }
        return aux
    }
    export function addColumn(state: MatrixState, originColumn: number, side: AddColumnSide): MatrixState {
        let aux = _getDeepCopy(state)
        switch (side) {
            case AddColumnSide.Left:
                for (let rowIdx = 0; rowIdx < aux.values.length; rowIdx++) {
                    aux.values[rowIdx].splice(originColumn, 0, "")
                }
                aux.types.splice(originColumn, 0, MatrixColumnType.NHC)
                break
            case AddColumnSide.Right:
                for (let rowIdx = 0; rowIdx < aux.values.length; rowIdx++) {
                    aux.values[rowIdx].splice(originColumn + 1, 0, "")
                }
                aux.types.splice(originColumn + 1, 0, MatrixColumnType.NHC)
                break
        }
        return aux
    }
    export function addRow(state: MatrixState, originRow: number, side: AddRowSide): MatrixState {
        let aux = _getDeepCopy(state)
        const rowsLength = state.values[0].length
        let newRow = []
        switch (side) {
            case AddRowSide.Above:
                for (let i = 0; i < rowsLength; i++) {
                    newRow.push("")
                }
                aux.values.splice(originRow, 0, newRow)
                break
            case AddRowSide.Below:
                for (let i = 0; i < rowsLength; i++) {
                    newRow.push("")
                }
                aux.values.splice(originRow + 1, 0, newRow)
                break
        }
        return aux
    }
    export function deleteColumn(state: MatrixState, columnToDelete: number): MatrixState {
        let aux = _getDeepCopy(state)
        for (let i = 0; i < aux.values.length; i++) {
            aux.values[i].splice(columnToDelete, 1)
        }
        aux.types.splice(columnToDelete, 1)
        return aux
    }
    export function deleteRow(state: MatrixState, rowToDelete: number): MatrixState {
        let aux = _getDeepCopy(state)
        aux.values.splice(rowToDelete, 1)
        return aux
    }
    export function pasteColumn(state: MatrixState, data: MatrixValue[], columnToPaste: number): MatrixState {
        let aux
        if (data.length > state.values.length) aux = resizeRows(state, data.length)
        else aux = _getDeepCopy(state)
        for (let rowIdx = 0; rowIdx < aux.values.length; rowIdx++) {
            aux.values[rowIdx][columnToPaste] = data[rowIdx] || ""
        }
        return aux
    }
    export function pasteRow(state: MatrixState, data: MatrixValue[], rowToPaste: number): MatrixState {
        let aux
        if (data.length > state.values[0].length) aux = resizeColumns(state, data.length)
        else aux = _getDeepCopy(state)
        for (let colIdx = 0; colIdx < aux.values[0].length; colIdx++) {
            aux.values[rowToPaste][colIdx] = data[colIdx] || ""
        }
        return aux
    }
    export function modifyColumnType(state: MatrixState, newType: MatrixColumnType, columnToModify: number): MatrixState {
        let copy = _getDeepCopy(state)
        copy.types[columnToModify] = newType
        return copy
    }
    export function generateOutput(state: MatrixState): MatrixOutput {
        const stateCopy = _getDeepCopy(state)
        const nColumns = stateCopy.types.length
        const nRows = stateCopy.values.length

        let transposed: MatrixRawValues = new Array(nColumns).fill(new Array(nRows).fill(""))

        console.log("Initial transposed: ", transposed)

        for (let rowIdx = 0; rowIdx < nRows; rowIdx++) {
            for (let colIdx = 0; colIdx < nColumns; colIdx++) {
                console.log(`Transposed in Col: ${colIdx} and Row: ${rowIdx} is: ${stateCopy.values[rowIdx][colIdx]}`)
                transposed[colIdx][rowIdx] = stateCopy.values[rowIdx][colIdx]
                console.log(transposed[colIdx][rowIdx])
            }
        }

        console.log("Filled transposed: ", transposed)

        return stateCopy.types.map((colType, colIdx) => { return { id: colType.toString(), name: colType.toString(), values: transposed[colIdx] } })
    }
}
