// Mirar en cada nivel (boolean) + searchConditions para cada nivel
// Si hay una searchCondition, usar la misma para todos los niveles
// Que se puedan devolver objetos (completos) que cumplen la condición

export namespace NestedSearchMultipleConditions {

    type NestedSearchResult = {
        match: boolean,
        children: Array<NestedSearchResult>
    }

    export function runNestedSearch(
        object: any,
        searchConditions: ((value: any) => boolean)[],
        levelsFieldName: string[],
        rawResultInterpretation?: (objectrawSearchResult: any) => any
    ) {
        let found = []
        for (let obj of object) {
            found.push(nestedSearch(obj, searchConditions, levelsFieldName, 0))
        }
        return rawResultInterpretation ? rawResultInterpretation(found) : found
    }

    function nestedSearch(
        object: any,
        searchConditions: ((value: any) => boolean)[],
        levelsFieldName: string[],
        nestingDepth: number
    ): NestedSearchResult {
        if (nestingDepth === levelsFieldName.length - 1) {
            let currentFieldName = levelsFieldName[nestingDepth]
            let name = object[currentFieldName] as string
            return { match: searchConditions[nestingDepth](name), children: [] }
        } else {
            let match = searchConditions[nestingDepth](object)
            let result: { match: boolean, children: Array<any> } = { match: false, children: [] }
            if (match) result.match = true
            let found = []
            let iterableItems = object[levelsFieldName[nestingDepth]]
            for (let obj of iterableItems) found.push(nestedSearch(obj, searchConditions, levelsFieldName, nestingDepth + 1))
            result.children = found
            return result
        }
    }

   /*  export namespace ResultInterpretationFunctions {

        export function filterObjectWithSearchResult(initialObject: any, searchResult: any, levelsFieldName: string[]) {
            for (let [idx, obj] of (initialObject).entries()) {
                filterObjectWithSearchResultRec(obj, searchResult[idx], 0, levelsFieldName)
                if ((obj[levelsFieldName[0]] as Array<any>).length < 1) delete initialObject[idx]
            }
            initialObject = initialObject.filter((a: any) => a)
        }

        function filterObjectWithSearchResultRec(object: any, searchResults: any, nestingDepth: number, levelsFieldName: string[]) {
            if (nestingDepth === levelsFieldName.length - 2) {
                for (let [idx, result] of searchResults.entries()) {
                    if (result !== true) delete object[levelsFieldName[nestingDepth]][idx]
                }
            } else {
                let res: Array<any> = searchResults as Array<any>
                let iterableItems = object[levelsFieldName[nestingDepth]]
                for (let i = 0; i < iterableItems.length; i++) {
                    filterObjectWithSearchResultRec(iterableItems[i], res[i], nestingDepth + 1, levelsFieldName)
                    iterableItems[i][levelsFieldName[nestingDepth + 1]] = iterableItems[i][levelsFieldName[nestingDepth + 1]].filter((a: any) => a)
                    if ((iterableItems[i][levelsFieldName[nestingDepth + 1]] as Array<any>).length < 1) delete iterableItems[i]
                }
                object[levelsFieldName[nestingDepth]] = iterableItems.filter((a: any) => a)
            }
        }

        export function compactResults(results: NestedSearchResult[]) {
            return results.map((res) => compactResultsRec(res))
        }

        function compactResultsRec(result: NestedSearchResult) {
            if (result.children.length == 0) {
                return result.match
            } else {
                result.children.map((c) => compactResultsRec(c))
                if (result.children.some((c) => c.match)) {
                    // result.children.forEach((c) => c.match = true)
                    result.match = true
                }
            }
        }
    } */

    export function filterOutput(
        object: any,
        searchResult: NestedSearchResult[],
        childenName: string,
    ) 
    {
        var outputFil:any[] = []
        searchResult.forEach((el,idx)=>{
            if (el.match)
            {
                outputFil.push({...object[idx]})
            }
            else
            {
                if (object[idx][childenName] !== undefined)
                {
                    const chidrenElements = filterOutput([...object[idx][childenName]],[...el.children],childenName)
                    if (chidrenElements.length > 0)
                    {
                        const newOutput = {...object[idx]}
                        newOutput[childenName] = [...chidrenElements]
                        outputFil.push(newOutput)
                    }
                }                                    
            }
        })

        return [...outputFil];

    }
}