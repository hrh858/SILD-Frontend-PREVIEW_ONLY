import React, { useState } from 'react'
import styled from 'styled-components'
import { FaFolder, FaSearch, FaEraser } from 'react-icons/fa'

// MY COMPONENTS -  ELEMENTS
import { TooltipNAV } from "../../Elements/ElementStyledTooltip";

// MODELS
import { LeafVizFolder, NonLeafVizFolder } from '../../Models/CreateDatabaseVizStructures'
import { FolderSimp, GroupSimp } from '../../Models/DataStructure'

// SHARE
import * as colorDef from '../../Shared/Colors'
import { IoIosArrowDown } from 'react-icons/io';
import ElementTextInput from '../../Elements/ElementInputText';

// API

const ChangeFolderButton = styled.button`
    width: 60%;
    height: 40px;
    background-color: white;
    color: ${colorDef.defMainThemeColor};
    border: 1px solid ${colorDef.defMainThemeColor};
    border-radius: 40px;;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;
    padding: 0rem 0rem 0rem 1rem;
    /* overflow-x: hidden; */
`

const SearchBoxContainer = styled.div`
    width: 40%;
    min-width: 10rem;
    min-height: 40px;
    background-color: white;
    color: ${colorDef.defMainThemeColor};
    border-radius: 2rem;
    border: 1px solid ${colorDef.defMainThemeColor};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 0rem 0rem 0rem 1rem;
    overflow-x: hidden;
    gap: 0.5rem;
`

const SearchBoxInput = styled.input`
    width: 100%;
    border: 0;
    margin: 0;
    color: ${colorDef.defMainThemeColor};
    ::placeholder,
    ::-webkit-input-placeholder {
        color: #149583;
    }
    :-ms-input-placeholder {
        color: #149583;
    }
`

const TilesContainer = styled.div`
    width: 100%;
    /* height: calc(100% - 40px); */
    /* height: 100%;  */
    padding: 1rem;
    display: grid;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 10rem));
    overflow-y: scroll;
    justify-content: center;
`
const VariableTile = styled.button`
    width: 100%;
    height: 7rem;
    background-color: white;
    color: ${colorDef.defMainThemeColor};
    border: 1px solid ${colorDef.defMainThemeColor};
    border-radius: 1rem;
    box-shadow: rgb(60 64 67 / 30%) 0px 1px 2px 0px, rgb(60 64 67 / 15%) 0px 2px 6px 2px;
    flex-direction: row;
    padding: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 300ms ease-in;
    word-break: break-word;
    &:hover{
        background-color: ${colorDef.defMainThemeColor};
        color: white;
    }
`

const VariableTileText = styled.p`
    /* font-size: 0.85em; */
    // white-space: nowrap;
    // overflow: hidden;
    // text-overflow: ellipsis;
    margin: 0;
`

const InsideButton = styled.div`
    color: ${colorDef.defGreenColor};
    height: 100%;
    width: 2.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    cursor: pointer;
    &:hover{       
        transform: scale(1.15);
        transition: 0.1s;
        animation-timing-function: ease-in-out;
    }
`
const MyFaEraser = styled(FaEraser)`

    &:hover{       
        transform: scale(1.07);
        transition: 0.1s;
        animation-timing-function: ease-in-out;
    }
`


export interface SearchReturnValue {
    idCarpeta: number
    idGroup: number
    idVariable: number
    nameCarpeta: string
    nameGroup: string
    nameVar: string
}

interface Props {
    onShowFolderSelector: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    folder?: LeafVizFolder
    parentFolder?: NonLeafVizFolder
    onSelectGroup: (folder: FolderSimp, group: GroupSimp) => void
}

export default function SelectNewVariableDisplayer(props: Props) {

    const [groupFilteringStr, setGroupFilteringStr] = useState<string | undefined>()

    function shortenDisplayName(original: string, maxChars: number = 35): string {
        let finalStr = original
        if (original.length > maxChars) {
            finalStr = finalStr.slice(0, maxChars).trimEnd();
            finalStr += '...'
        }
        return finalStr
    }

    function cleanSearch() {
        let searchInput = document.getElementById("selectNewVariableSearchBox") as HTMLInputElement
        searchInput.value = ""
        setGroupFilteringStr(undefined)
    }

    function callSearch() {
        let searchInput = document.getElementById("selectNewVariableSearchBox") as HTMLInputElement
        let searchText = searchInput.value
        if (searchText && searchText.length > 0) setGroupFilteringStr(searchText)
        else setGroupFilteringStr(undefined)
    }

    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "row",
                padding: "0.5rem 0.75rem",
                gap: "0.5rem"
            }}>
                <ChangeFolderButton
                    onClick={(event) => props.onShowFolderSelector(event)}
                >
                    <FaFolder />
                    <div style={{ height:"90%", display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <span style={{overflowY:"auto",maxHeight:"100%"}}>
                    {
                        props.folder ?
                            props.parentFolder ?
                                props.folder.name + " (" + props.parentFolder.name + ")"
                                :
                                props.folder.name
                            : "Seleccione una carpeta"
                    }
                    </span>
                    </div>
                    <InsideButton >
                        <IoIosArrowDown size={"1.2rem"}/>
                    </InsideButton>
                </ChangeFolderButton>
                <SearchBoxContainer  style={{borderRight: groupFilteringStr?0:""}}>
                    <FaSearch size={"30px"} />
                    <SearchBoxInput placeholder="Filtrar grupos " id="selectNewVariableSearchBox" onChange={callSearch} />
                    <div
                        style={{
                        // backgroundColor: colorDef.defGreenColor,
                        height: "100%",
                        minWidth: "40px",                      
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        backgroundColor: colorDef.defGreenColor, 
                        color: 'white',borderRadius:"50%",
                        visibility: groupFilteringStr?"visible":'hidden',
                         
                    }}
                    onClick={cleanSearch}   
                    >                   
                        <MyFaEraser  />

                    </div>
                </SearchBoxContainer>
            </div>
            <TilesContainer>
                {
                    props.folder ?
                        props.folder.getActiveGroups().map((group) => {
                            return (
                                groupFilteringStr ?
                                    group.name.toLowerCase().includes(groupFilteringStr.toLowerCase()) ?
                                        <TooltipNAV title={group.name} arrow>
                                            <VariableTile onClick={() => props.onSelectGroup(props.folder!, group)}>
                                                <VariableTileText>{shortenDisplayName(group.name)}</VariableTileText>
                                            </VariableTile>
                                        </TooltipNAV>
                                        :
                                        null
                                    :
                                    <TooltipNAV title={group.name} arrow>
                                        <VariableTile onClick={() => props.onSelectGroup(props.folder!, group)}>
                                            <VariableTileText>{shortenDisplayName(group.name)}</VariableTileText>
                                        </VariableTile>
                                    </TooltipNAV>
                            )
                        })
                        : <span style={{
                            color: colorDef.defGreenColor,
                            width: "100%"
                        }}>Seleccione una carpeta para mostrar su contenido</span>
                }
            </TilesContainer>
        </>
    )
}
