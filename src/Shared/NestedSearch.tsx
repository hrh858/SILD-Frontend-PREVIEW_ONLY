// Mirar en cada nivel (boolean) + searchConditions para cada nivel
// Si hay una searchCondition, usar la misma para todos los niveles
// Que se puedan devolver objetos (completos) que cumplen la condición

export namespace NestedSearch {

    export function runNestedSearch(object: any, searchCondition: (value: any) => boolean, levelsFieldName: string[], rawResultInterpretation?: (objectrawSearchResult: any) => any) {
        let found = []
        for (let obj of object) {
            found.push(nestedSearch(obj, searchCondition, levelsFieldName, 0))
        }
        return rawResultInterpretation ? rawResultInterpretation(found) : found
    } 
    
    function nestedSearch(object: any, searchCondition: (value: any) => boolean, levelsFieldName: string[], nestingDepth: number): any {
        if (nestingDepth === levelsFieldName.length - 1) {
            let currentFieldName = levelsFieldName[nestingDepth]
            let name = object[currentFieldName] as string
            return searchCondition(name)
        } else {
            let found = []
            let iterableItems = object[levelsFieldName[nestingDepth]]
            for (let obj of iterableItems) found.push(nestedSearch(obj, searchCondition, levelsFieldName, nestingDepth + 1))
            return found
        }
    }

    export namespace ResultInterpretationFunctions {

        export function filterObjectWithSearchResult(initialObject: any, searchResult: any, levelsFieldName: string[]) {
            for (let [idx, obj] of (initialObject).entries()) {
                filterObjectWithSearchResultRec(obj, searchResult[idx], 0, levelsFieldName)
                if ((obj[levelsFieldName[0]] as Array<any>).length < 1) delete initialObject[idx]
            }
            initialObject = initialObject.filter((a: any) => a)
        }

        function filterObjectWithSearchResultRec(object: any, searchResults: any, nestingDepth: number, levelsFieldName: string[]) {
            if (nestingDepth === levelsFieldName.length - 2) {
                for (let [idx, result] of searchResults.entries()){
                    if (result !== true) delete object[levelsFieldName[nestingDepth]][idx]
                }
            } else {
                let res: Array<any> = searchResults as Array<any>
                let iterableItems = object[levelsFieldName[nestingDepth]]
                for (let i=0; i<iterableItems.length/*-1*/; i++) {
                    filterObjectWithSearchResultRec(iterableItems[i], res[i], nestingDepth + 1, levelsFieldName)
                    iterableItems[i][levelsFieldName[nestingDepth + 1]] = iterableItems[i][levelsFieldName[nestingDepth + 1]].filter((a: any) => a)
                    if ((iterableItems[i][levelsFieldName[nestingDepth + 1]] as Array<any>).length < 1) delete iterableItems[i]
                }
                object[levelsFieldName[nestingDepth]] = iterableItems.filter((a: any) => a)
            }
        }
    }
}