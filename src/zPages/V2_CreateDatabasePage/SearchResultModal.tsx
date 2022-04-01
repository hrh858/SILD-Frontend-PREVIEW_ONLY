import { Modal } from '@material-ui/core'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import styled from "styled-components"
import { FaSearch, FaCheck } from 'react-icons/fa'
import { GrFormClose } from "react-icons/gr"

// MY COMPONENTS -  ELEMENTS
import { ElementBagdeTreeItem } from '../../Elements/ElementBagdeTreeItem'

// MODELS
import { GroupMode } from '../../Models/cPackFE'

// SHARE
import { Loader } from '../../Shared/GlobalStyle'
import * as colorDef from '../../Shared/Colors'

// API
import { endpVAR2_searchFolderGroupVar } from '../../Services/api'
import { render } from '@testing-library/react'
import { MyModal, MyModalButton, MyModalIcon } from '../../zComponents/MyModal'


// STYLES
const InsideModalContainer = styled.div`
    width: calc(100% - 2rem);
    /* max-height: 10rem; */
    max-height: calc(100vh - 18rem);
    /* overflow-y: scroll; */
    border-radius: 1rem;
    background-color: white;
    /* margin: auto; */
    /* margin-top: 1rem; */
    display: flex;
    flex-direction: column;
    /* padding: 0.5rem 1rem 0rem 1rem; */
    gap:1.2rem;
    /* padding: 1rem; */
`
const SearchInputContainer = styled.div`
    width: 100%;
    border-radius: 1rem;
    border: 2px solid ${colorDef.defMainThemeColor};
    border-right: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 2rem;

`

const SearchInput = styled.input`
    height: 100%;
    border: 0;
    color: ${colorDef.defMainThemeColor};
    border: 2px solid ${colorDef.defMainThemeColor};
    width: 100%;
    border-radius: 3rem;
    padding: 0rem 0rem 0rem 1rem;
    ::placeholder {
        color: ${colorDef.defMainThemeColor + "77"};
    }
    /* margin:0.2rem; */
`
const PerformSearchButton = styled.button`
    height: 100%;
    margin: 0;
    width: 10rem;
    background-color: ${colorDef.defMainThemeColor};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    /* border: solid 1px  ${colorDef.defMainThemeColor}; */
    /* border-right: 0; */
    /* border-radius: 0rem 1rem 1rem 0rem; */
    /* gap: 0.5rem; */
    border: 0;
    border-radius: 0.2rem;
    &:hover{
        transform:scale(1.03);
    }
`

const ResultsContainer = styled.div`
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        width: 0.45rem !important ; 
        display: flex;
    }
    &::-webkit-scrollbar-thumb  {
        background: ${colorDef.defScrollBar}; 
        border:none ;
        border-radius: 0.3rem;
    }

`
const ResultsTable = styled.table`
    /* margin-top: 1rem; */
    /* border: solid 1px  ${colorDef.defMainThemeColor}; */
    border-top:0;
    width: 100%;
    position: relative;
    border-collapse: collapse;     
    thead{
        position: sticky;
        z-index: 999;
        /* background-color:  "black"; */
    }

`
const TableHeader = styled.th`
    font-weight: bold;
    color: white;
    background-color:  ${colorDef.defMainThemeColor};
    position: sticky;
    top: 1px; 
    text-align:center;
    vertical-align: middle;
`

interface canBeShadowed {
    shadowed: boolean
}
const TableElement = styled.td<canBeShadowed>`
    /* cursor: pointer; */
    background-color: ${p => p.shadowed ? colorDef.defMainThemeColor + "33" : "white"};
    /* color: ${p => p.shadowed ? "white" : "rgb(20, 149, 131)"}; */
    color: ${p => p.shadowed ? "black" : "black"};
    padding: 0.5rem;
`

// --------------------------------------------------------
interface SearchResult {
    idCarpeta: number,
    idGroup: number,
    idVariable: number,
    nameCarpeta: string,
    nameGroup: string,
    nameVar: string,
    canBe: string
}
enum SearchState {
    Inintial,
    Searching,
    Results,
    NoResults,
    Error
}

interface Props {
    open: boolean
    onClose: () => void
}

export default function SearchResultModal(props: Props) {
    const currentSeatchStr = useRef<string>("")
    const [showPerformSearchButton, setShowPerformSearchButton] = useState<boolean>(false)
    const [searchResults, setSearchResults] = useState<SearchResult[] | undefined>(undefined)
    const [searchState, setSearchState] = useState<SearchState>(SearchState.Inintial)

    useEffect(() => {
        currentSeatchStr.current = ""
        setShowPerformSearchButton(false);
        setSearchResults(undefined)
        setSearchState(SearchState.Inintial)
    },[props.open])
    function onChangeSearchString(event: React.ChangeEvent<HTMLInputElement>) {
        let newValue = event.target.value
        currentSeatchStr.current = newValue
        if (showPerformSearchButton && (!newValue || newValue === "")) setShowPerformSearchButton(false)
        else if (!showPerformSearchButton) setShowPerformSearchButton(true)
    }

    async function performSearch() {
        console.log("Se ha realizado una busqueda!")
        setSearchState(SearchState.Searching)
        let searchStr = currentSeatchStr.current
        let res = await endpVAR2_searchFolderGroupVar(searchStr)
        if (res && res.success === 1) {
            let searchRes: SearchResult[] = res.sections
            if (searchRes.length > 0) setSearchState(SearchState.Results)
            else setSearchState(SearchState.NoResults)
            setSearchResults(searchRes)
        } else {
            setSearchResults(undefined)
            setSearchState(SearchState.Error)
        }
    }

    function renderVariableTypeViz(canBe: string) {
        let booleanCanBe = [Boolean(Number(canBe[0])), Boolean(Number(canBe[1])), Boolean(Number(canBe[2]))]
        let elements: ReactElement[] = booleanCanBe.map((possible, idx) => {
            return (
                <ElementBagdeTreeItem
                    type={idx == 0 ? GroupMode.Master : idx == 1 ? GroupMode.Associated : GroupMode.Filter} size={"1.2rem"}
                    desaturate={!possible}
                />
            )
        })

        return <div style={{
            width: "5rem",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            gap: "0.5rem"
        }}>
            {elements}
        </div>
    }


    const renderTable = () => {
        return (
            <>
                {
                    searchResults ?
                        searchResults.length > 0 ?
                            <ResultsContainer>
                                <ResultsTable>
                                    <thead>
                                        <tr style={{ height: "3rem", fontSize: "1.2rem"}}>
                                            <TableHeader >Carpeta</TableHeader>
                                            <TableHeader>Grupo</TableHeader>
                                            <TableHeader>Variable</TableHeader>
                                            <TableHeader>Tipo</TableHeader>
                                        </tr>
                                    </thead>
                                    {
                                        searchResults.map((res, idx) => {
                                            let shadowed = idx % 2 !== 0
                                            return (
                                                <tr 
                                                    // style={{borderLeft: "solid 1px "  + colorDef.defMainThemeColor,borderRight: "solid 1px "  + colorDef.defMainThemeColor,}}
                                                >
                                                    <TableElement shadowed={shadowed}>
                                                        {res.nameCarpeta}
                                                    </TableElement>
                                                    <TableElement shadowed={shadowed}>
                                                        {res.nameGroup}
                                                    </TableElement>
                                                    <TableElement shadowed={shadowed}>
                                                        {res.nameVar}
                                                    </TableElement>
                                                    <TableElement shadowed={shadowed}>
                                                        {renderVariableTypeViz(res.canBe)}
                                                    </TableElement>
                                                </tr>
                                            )
                                        })
                                    }
                                </ResultsTable>
                            </ResultsContainer>
                            : null
                        : <span style={{ color: "black" }}> Error contactando con el servidor </span>
                }
            </>
        )
    }

    function stateRenderSwitch(state: SearchState) {
        switch (state) {
            case SearchState.Inintial:
                return (null
                    // <span style={{ color: colorDef.defBlackColor }}>Realize una búsqueda.</span>
                )
            case SearchState.Searching:
                return (
                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}><Loader /></div>
                )
            case SearchState.Error:
                return (
                    <span style={{ color: colorDef.defBlackColor }}>Se ha producido un error por parte del servidor al intentar realizar la búsqueda.</span>
                )
            case SearchState.NoResults:
                return (
                    <span style={{ color: colorDef.defBlackColor }}>No se han obtenido resultados para su búsqueda.</span>
                )
            case SearchState.Results:
                return (
                    renderTable()
                )
        }
    }
    // console.log("Current State: ", searchState)

    return (
        props.open ?
        <MyModal
        icon={MyModalIcon.None}
            showOverEverything
            style={{
                // width: "calc(100vw - 4rem)"
                width: "920px",
                maxWidth: "calc(100vw - 4rem)"
                
            }}

            titleText="Buscador Carpetas/Grupos/Variables"
            removeAltert
            middleElements={
            <InsideModalContainer>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.7rem",
                    height: "2.5rem",
                    // margin: "0.5rem"
                }}>
                    <FaSearch size={"1.5rem"} color={colorDef.defMainThemeColor} />
                    {/* <SearchInputContainer> */}
                    <SearchInput type="text" placeholder="Introduzca su búsqueda" onChange={onChangeSearchString} onKeyDown={(event) => event.key === "Enter" ? performSearch() : null} />                     
                    <PerformSearchButton onClick={performSearch}
                        disabled={!showPerformSearchButton}
                        style={{backgroundColor:!showPerformSearchButton?"gray":""}}
                    >
                        Buscar
                        {/* <FaCheck size={"0.8em"} /> */}
                    </PerformSearchButton> 
                        
                        
                    {/* <GrFormClose color="balck" size="1.6em" style={{ cursor: "pointer" }} onClick={props.onClose} /> */}
                </div>
                {stateRenderSwitch(searchState)}
            </InsideModalContainer>}
            bottomElements={
                <MyModalButton
                    style={{
                        width: "10rem",
                        color: colorDef.defCreateBaseSalirSinGuardarButton,
                        textColor: colorDef.defWhiteColor
                    }}
                    displayText="Cerrar buscador"
                    onClickCallback={props.onClose}
                />
            }
        /> : null
    )
}

{/* <Modal open={props.open}>
            <InsideModalContainer>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    margin: "0.5rem"
                }}>
                    <FaSearch color={colorDef.defMainThemeColor} />
                    <SearchInputContainer>
                        <SearchInput type="text" placeholder="Introduzca su búsqueda" onChange={onChangeSearchString} onKeyDown={(event) => event.key === "Enter" ? performSearch() : null} />
                        {
                            showPerformSearchButton ?
                                <PerformSearchButton onClick={performSearch}>
                                    Realizar busqueda
                                    <FaCheck size={"0.8em"} />
                                </PerformSearchButton> :
                                null
                        }
                    </SearchInputContainer>
                    <GrFormClose color="balck" size="1.6em" style={{ cursor: "pointer" }} onClick={props.onClose} />
                </div>
                { stateRenderSwitch(searchState) }
            </InsideModalContainer>
        </Modal> */}
