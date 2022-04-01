import React from 'react'
import styled from 'styled-components'
import { IoMdFolder, IoMdFolderOpen } from 'react-icons/io'

// MODELS
import { LeafVizFolder, NonLeafVizFolder, VizFolder } from '../../Models/CreateDatabaseVizStructures'

// SHARE
import * as colorDef from '../../Shared/Colors'

const FoldersContainer = styled.div`
    width: 20rem;
    height: 100%;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    padding-top: 0.3rem;
`
interface Activable {
    active: boolean;
}
const FolderButton = styled.div<Activable>`
    gap: 0.7rem;
    height: 40px;
    display: grid;
    grid-template-columns: 1.5rem 1fr;
    align-items: center;
    justify-items: start;
    padding: 0rem 0.5rem;
    white-space: nowrap;
    background-color: ${(props) => props.active? colorDef.defFolderButton: "white"};
    color: ${(props) => props.active ? "white" : "black"};
    border-radius: 0.3rem;
    font-size: 1em;
    margin: 0.3rem 0.7rem;
    cursor: pointer;
    transition: all ease-in 0.15s;
    &:hover{
        background-color: ${(props: Activable) => props.active ? colorDef.defFolderButton : colorDef.defFolderButtonHover};
        color: white;
    }
`

const SubFolderButton = styled.div<Activable>`
    gap: 0.7rem;
    height: 30px;
    display: grid;
    grid-template-columns: 1.5rem 1fr;
    align-items: center;
    justify-items: start;
    padding-left: 2rem;
    white-space: nowrap;
    background-color: ${(props) => props.active ? colorDef.defFolderButton : "white"};
    color: ${(props) => props.active ? "white" : "black"};
    border-radius: 0.3rem;
    font-size: 0.8em;
    margin: 0.3rem 0.7rem;
    cursor: pointer;
    transition: all ease-in 0.15s;
    &:hover{
        background-color: ${(props: Activable) => props.active ? colorDef.defFolderButton : colorDef.defFolderButtonHover};
        color: white;
    }
`


interface Props {
    folders: Array<VizFolder>
    onSelectFolder(folderId: number): void
    miniView?: boolean;
}

function FoldersPicker(props: Props) {

    const renderFolderButtons = () => {
        return props.folders.map((vizFolder) => {
            if (vizFolder instanceof LeafVizFolder) {
                return (
                    <FolderButton active={vizFolder.isSelected()} onClick={() => props.onSelectFolder(vizFolder.id)}>
                        {vizFolder.isSelected() ? <IoMdFolderOpen size={"1.3em"}/> : <IoMdFolder size={"1.3em"}/>}
                        {vizFolder.name}
                    </FolderButton>
                )
            } else if (vizFolder instanceof NonLeafVizFolder) {
                let folder = vizFolder as NonLeafVizFolder
                return (
                    <>
                        <FolderButton active={folder.isSelected()}>
                            {folder.isSelected() ? <IoMdFolderOpen size={"1.3em"}/> : <IoMdFolder size={"1.3em"}/>}
                            {folder.name}
                        </FolderButton>
                        {folder.children.map((childFolder) => {
                            return (
                                <SubFolderButton active={childFolder.isSelected()} onClick={() => props.onSelectFolder(childFolder.id)}>
                                    {childFolder.isSelected() ? <IoMdFolderOpen size={"1.3em"}/> : <IoMdFolder size={"1.3em"}/>}
                                    {childFolder.name}
                                </SubFolderButton>
                            )
                        })}
                    </>
                )
            }
        })
    }

    return (
        <FoldersContainer style={{width:props.miniView?"100%":""}}>
            {renderFolderButtons()}
        </FoldersContainer>
    )
}

export default FoldersPicker
