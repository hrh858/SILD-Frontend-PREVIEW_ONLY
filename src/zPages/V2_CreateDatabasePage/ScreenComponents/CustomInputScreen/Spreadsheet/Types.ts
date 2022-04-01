export namespace Spreadsheet {
    export type ColumnType = {
        id: string,
        name: string,
        validate: (values: Array<null | string>) => null | number
        transform: (values: Array<string>) => Array<any>
    }

    export const NHCColumnType: ColumnType = {
        id: "nhc",
        name: "NHC",
        validate: (values) => {
            for (let i=0; i < values.length; i++) {
                const val = values[i]
                if (val == null) return i
                if (val.length != 4) return i
                if (!parseInt(val)) return i
            }
            return null
        },
        transform: (values) => {
            return values.map(val => parseInt(val))
        }
    }

    export const IntColumnType: ColumnType = {
        id: "int",
        name: "Entero",
        validate: () => null,
        transform: () => []
    }

    export const FloatColumnType: ColumnType = {
        id: "float",
        name: "Decimal",
        validate: () => null,
        transform: () => []
    }

    export const StringColumnType: ColumnType = {
        id: "string",
        name: "Cadena",
        validate: () => null,
        transform: () => []
    }

    export type Column = {
        type: ColumnType
        values: Array<null | string>
    }
}