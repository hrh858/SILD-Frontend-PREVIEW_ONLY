import React, { useRef, useState } from 'react'
import { Typography } from '@material-ui/core'

import ElementAccordion from './ElementDisplay/ElementAccordion'
import ElementText from './ElementDisplay/ElementText'

//SHARE
import { defMainThemeColor, defWhiteColor, defCDGreenColorAlpha } from '../Shared/Colors'
import { NestedSearchMultipleConditions } from '../Shared/NestedSearchMultipleConditions'
import { FilterDrama } from '@material-ui/icons'
import ElementTextField from '../Elements/ElementTextField'
import ElementSearchBoxV2 from '../Elements/ElementSearchBoxV2'


interface outputStruc {
    id: string,
    name: string, 
    varSelected: [{ id: string, name: string, max: number, varSelected: [{ id: string, name: string, max: number }] }] 
}

interface Props {
    output: outputStruc[]
    outputKey: string
}

interface SearchResultProps {
    match:boolean;
    children:SearchResultProps[]
}

export default function GroupMultiTileSelectProgressDisplayer(props: Props) {

    const searchStr = useRef<string>("")
    const [searchResult, setSearchResult] = useState<SearchResultProps[]>([])

    function performSearch() {
        NestedSearchMultipleConditions.runNestedSearch(
            props.output,
            [
                (value) => {
                    let aux = value.name as string
                    return aux.toLowerCase().includes(searchStr.current.toLowerCase())
                    // return aux.includes(searchStr.current.toLowerCase()) || aux.includes(searchStr.current.toUpperCase())
                },
                (value) => {
                    let aux = value.name as string
                    return aux.toLowerCase().includes(searchStr.current.toLowerCase())
                    // return aux.includes(searchStr.current.toLowerCase()) || aux.includes(searchStr.current.toUpperCase())
                },
                (value) => { // Should get the last object
                    let aux = value as string
                    return aux.toLowerCase().includes(searchStr.current.toLowerCase())
                    // return aux.includes(searchStr.current.toLowerCase()) || aux.includes(searchStr.current.toUpperCase())
                }
            ],
            ["varSelected", "varSelected", "name"],
            (res) => {
                // NestedSearchMultipleConditions.ResultInterpretationFunctions.compactResults(res)
                // NestedSearchMultipleConditions.ResultInterpretationFunctions.compactResults(res)
                // console.log('resAAA',res) 
                // Aqui puedes ver como queda el resultado, por favor úsalo para la renderización del componente
                console.log("Resultado NestedSearch - ", res)
                setSearchResult(res) // Queda guardado aquí
            }
        )
    }

    const renderOutput = () => {
        const outputFiltred:outputStruc[] = searchResult.length ===0?[...props.output]:NestedSearchMultipleConditions.filterOutput([...props.output],[...searchResult],"varSelected")
        
        return (
            <>
            {
            outputFiltred.map((out, idx) => {
                return (
                    <ElementAccordion
                        id={out.name+idx.toString()}
                        propsElem={{ numColumns: 1, backgroundColor: defCDGreenColorAlpha, unboundedMaxHeigh: true }}
                        summaryElement={<Typography style={{ fontWeight: "bold" }}>{out.name}</Typography>}
                        detailElement={
                            out.varSelected.map((varSel, idx2) => {
                                    return (
                                        <ElementAccordion
                                            id={varSel.name+idx2.toString()}
                                            summaryElement={
                                                <div style={{ display: "flex", justifyContent: "space-between", width: "100%", height: "100%", alignItems: "center", gap: "0.5rem" }}>
                                                    <Typography style={{
                                                        fontWeight: "bold",
                                                        textAlign: "left",
                                                    }}>
                                                        {varSel.name}
                                                    </Typography>
                                                    {varSel.varSelected.length === varSel.max ?
                                                        <div style={{ backgroundColor: defMainThemeColor, borderRadius: "1rem", minWidth: "4.5rem", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                            <span style={{ color: defWhiteColor, fontSize: "0.9em" }}>Todo</span>
                                                        </div>
                                                        : null}

                                                </div>
                                            }
                                            detailElement={
                                                varSel.varSelected.map((inVarSel) => {
                                                    return (
                                                        <ElementText
                                                            name={inVarSel.name}
                                                            hoverText={inVarSel.name}
                                                        />
                                                    )
                                                })
                                            }
                                        />
                                    )
                            })
                        }
                    />
                )
            })}
            </>
            )
    }

    return (
        <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            gap: "0.7rem"
        }}>
            <ElementSearchBoxV2 onChange={(txt) => {
                searchStr.current = txt
                performSearch()
            }} />
            {renderOutput()}
        </div>
    )
}
