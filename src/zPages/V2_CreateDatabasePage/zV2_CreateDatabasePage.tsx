import React, { ReactElement, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import Popover from '@material-ui/core/Popover'
import { TreeView } from '@material-ui/lab'
import { MdClear } from 'react-icons/md'
import { IoMdExit } from 'react-icons/io'
import { IoMdSend } from 'react-icons/io'
import { FaSearch } from 'react-icons/fa'
import { FaExchangeAlt } from 'react-icons/fa/'
import { FaInfoCircle } from 'react-icons/fa'
import { IoIosCloseCircleOutline } from 'react-icons/io'

// MY COMPONENTS
import Navbar from '../../zComponents/Navbar'
import CompRenameBase from './CompRenameBase'
import FoldersPicker from './FoldersPicker'
import SearchResultModal from './SearchResultModal'
import SelectNewVariableDisplayer from './SelectNewVariableDisplayer'
import Popup from './Popup'
import renderSelectedScreen from '../../zComponents/RenderScreenToShow'
import FinishCreationPopUp from './FinishCreationPopUp'

import { CustomTreeContainer } from '../../zComponents/CustomTree'

// ELEMENTS
import { TooltipNAV } from '../../Elements/ElementStyledTooltip'
import { CompInputName } from '../../Elements/ElementInputDefineBaseName'
import { ElementBagdeTreeItem } from '../../Elements/ElementBagdeTreeItem';

// MODELS
import { Folder, FolderConstructorData, FolderSimp, GroupSimp } from '../../Models/DataStructure'
import { cPackFE } from '../../Models/cPackFE'
import { GroupFilteringType, LeafVizFolder, VizFolder, VizFoldersStructure } from '../../Models/CreateDatabaseVizStructures'
import SchemaScreen from '../../Models/SchemaScreen'
import { MyModal, MyModalButton, MyModalIcon } from '../../zComponents/MyModal'

//SHARE
import { Loader } from '../../Shared/GlobalStyle'
import * as colorDef from '../../Shared/Colors'

// API
import * as apiBE from '../../Services/api'
import { isConstructorTypeNode } from 'typescript'
import { NavItemProps } from 'reactstrap'
import { red } from '@material-ui/core/colors'
import { CheckboxClassKey } from '@material-ui/core'



interface GeneralLayoutProps {
    blurred: boolean
}

const GeneralLayout = styled.div<GeneralLayoutProps>`
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    filter: ${p => p.blurred ? "blur(1rem)" : "0"};
    transition: filter 100ms ease-in;
`

const BottomButtonsContainer = styled.div`
    width: 100%;
    height: 60px;
    position: absolute;
    bottom: 0px;
    background-color: ${colorDef.defMainThemeColor};
    // border-radius: 1rem 1rem 0rem 0rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0rem 1rem;
`
const BottomButton = styled.button`
    height: 45px;
    background-color: white;
    color: ${colorDef.defMainThemeColor};
    border-radius: 1rem;
    border: 2px solid ${colorDef.defMainThemeColor};
    padding: 0rem 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    &:hover{
            transform:scale(1.07);
        }
`

const CentralDisplayContainer = styled.div`
    width: 100%;
    height: calc(100vh - 60px - 60px);
    padding: 0.7rem 0.7rem;
`
const TreeDisplayContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 0.7rem 0.7rem;
`
const ComponentDisplayContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 0.7rem 0.7rem ;
    padding-top: 0.2rem;
`

const Container = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 1.5rem;
    box-shadow: rgb(60 64 67 / 30%) 0px 1px 2px 0px, rgb(60 64 67 / 15%) 0px 2px 6px 2px;
    overflow-x: hidden;
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
    color: black;
    /* margin: 0 1rem; */
`
const Header = styled.div`
    width: 100%;
    min-height: 60px;
    background-color: ${colorDef.defMainThemeColor};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: white;
    font-size: 1.4rem;
`

const FloatingChangeViewButton = styled.button`
    padding: 0.5rem;
    border-radius: 100%;
    width: 3.5rem;
    height: 3.5rem;
    position: absolute;
    bottom: 4.5rem;
    right: 0.5rem;
    border: solid 1px ${colorDef.defMainThemeColor};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: white;
    color: ${colorDef.defMainThemeColor};
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`
const CloseComponentViewButton = styled.button`
    width: 100%;
    height: 3rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    border: 0;
    color: gray;
    border-radius: 1rem 1rem 0rem 0rem;
`

const SearchInfoButton = styled.button`
    /* min-width: 13rem; */
    height: 2rem;
    border-radius: 1rem;
    /* background-color: white;
    color: ${colorDef.defMainThemeColor}; */
    background-color:  ${colorDef.defBlackColor2};
    color: white;
    padding: 0.5rem;
    margin-left: 1rem;
    margin-right: 1rem;
    border: 0;
    font-size: 0.7em;
    font-weight: bold;
    /* margin-right: 1rem; */
    display: flex;
    align-items: center;
    justify-content: space-around;
    justify-items: center;
    
    /* position:absolute; */
    /* left: 40px; */
    &:hover{       
        transform: scale(1.15);
        transition: 0.1s;
        animation-timing-function: ease-in-out;
    }
`

interface SelectFolderFloatingContainerProps {
    visible: boolean
}
const SelectFolderFloatingContainer = styled.div<SelectFolderFloatingContainerProps>`
    width: 80vw;
    margin-left: calc(50vw - 40vw);
    height: calc(100vh - 10rem);
    border-radius: 1rem;
    box-shadow: rgb(60 64 67 / 30%) 0px 1px 2px 0px, rgb(60 64 67 / 15%) 0px 2px 6px 2px;
    background-color: white;
    position: absolute;
    top: 1rem;
    z-index: 500;
    transform: translateY(${p => p.visible ? "0rem" : "calc((100vh + 10rem) * -1)"});
    transition: transform 300ms ease-in-out;
    border: 2px solid ${colorDef.defMainThemeColor};
    overflow-x: hidden;
    overflow-y: scroll;
`


export default function V2_CreateDatabasePage() {

    const FillerText = (text: string): () => ReactElement => {
        return () => (<span style={{
            color: colorDef.defGreenColor,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "3rem"
        }}>
            { text }
        </span>)
    }

    const FillerText1 = FillerText("Aquí puede ver el progreso de la base a medida que la vaya creando")
    const FillerText2 = FillerText("Seleccione un componente en 'Visualización del progreso' para ver detalles")
    const FillerText3 = FillerText("Aquí puede ver el progreso de la base a medida que la vaya creando, cuando haya componentes para visualizar, seleccione uno para ver detalles")

    let history = useHistory();
    const screenWidthBorder = 1010 // En píxeles

    const [miniView, setMiniView] = useState<boolean>(window.innerWidth < screenWidthBorder);
    const [miniViewShowTree, setMiniViewShowTree] = useState<boolean>(false);

    const [groupFilteringString, setGroupFilteringString] = useState<string | undefined>(undefined)
    const [showSearchResultModal, setShowSearchResultModal] = useState<boolean>(false)

    const [showFinishPopup, setShowFinishPopup] = useState<number>(0);
    const [ssErrorFinishPopup, setErrorFinishPopup] = useState<string>("");
    const [ssModalState, setModalState] = useState<number>(0);
    const [showDailyInfoModal, setShowDailyInfoModal] = useState<boolean>(false)
    const [textDailyInfoModal, setTextDailyInfoModal] = useState<any | undefined>(undefined)

    const [ssScreenToShowRef, setScreenToShowRef] = useState<{ idPack: string, idScreen: string, idxComp: number }>() // {idPack, idScreen, idComp}
    const [ssBase, setBase] = useState<cPackFE[]>([])
    const [ssCurrentPack, setCurrentPack] = useState<cPackFE>()
    const [ssCurrentScreen, setCurrentScreen] = useState<SchemaScreen>()
    const [ssEditingMode, setEditingMode] = useState<boolean>(false)
    const [ssBaseName, setBaseName] = useState<string>("")
    const [ssNewBaseName, setNewBaseName] = useState<string>("")

    function handleClickOnChangeFolder(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        miniView ?
            setShowFolderSelector(true)
            :
            setAnchorEl(event.currentTarget)
    }

    async function editPack(idPack: string, idScreen: string) {
        let response: string | any
        try {
            let editPack = ssBase.find((pck) => pck.idPack === idPack)

            if (editPack !== undefined) {
                let indxScreen = editPack?.screens.findIndex((scr) => scr.screenId === idScreen);
                if (indxScreen >= 0) {
                    response = await apiBE.endC3_changeScreen(idPack, idScreen)
                    if (response.success !== undefined && response.success === 1) {
                        let responseScreen = await apiBE.endC4_getScreen(idPack)
                        if (responseScreen.success !== undefined && responseScreen.success === 1) {
                            let nextScreen = new SchemaScreen(responseScreen.res)

                            editPack.screens = editPack.screens.filter((scr, idx) => idx < indxScreen)
                            editPack.createScreen(nextScreen)

                            setEditingMode(true)
                            setCurrentPack(editPack)
                            setCurrentScreen(nextScreen)
                        }
                        else {

                            setModalState(-1)
                            setErrorFinishPopup(responseScreen.msg ? responseScreen.msg : "Error")
                        }
                    }
                    else {
                        setModalState(-1)
                        setErrorFinishPopup(response.msg ? response.msg : "")
                    }
                }
            }

        } catch (err) {
            console.error(err)
            return
        }
    }

    async function deletePack(idPackDelete: string) {
        try {
            let responseScreen = await apiBE.endB2_deletePack(idPackDelete)
            if (responseScreen.success === 1) {
                setBase((prev) => {
                    let tempBase: cPackFE[] = prev.filter((pck) => !(pck.idPack === idPackDelete || pck.linkTO === idPackDelete));
                    // if (tempBase.length == 0) filterFoldersByType(GroupFilteringType.Master)
                    // else filterFoldersByType(GroupFilteringType.Associated)
                    return [...tempBase];
                })
                setModalState(0);
                setErrorFinishPopup("");
            }
            else {
                setModalState(3)
                setErrorFinishPopup(responseScreen.msg ? responseScreen.msg : "Error")
            }
        } catch (err) {
            console.error(err)
            return
        }
    }

    async function startCreation(folder: FolderSimp, group: GroupSimp, type: string, link: string) {
        try {
            // NEW BEnd
            let responseCreation = await apiBE.endB1_createPack(group.id, type, link)

            if (responseCreation.success >= 0) {
                const newPack: cPackFE = new cPackFE(responseCreation.idPack, { id: folder.id, name: folder.name }, { id: group.id, name: group.name }, responseCreation.tipologia, responseCreation.linkTO, [])
                let responseScreen = await apiBE.endC4_getScreen(newPack.idPack)
                if (responseScreen.success !== undefined && responseScreen.success === 1) {
                    let firstScreen = new SchemaScreen(responseScreen.res)
                    newPack.createScreen(firstScreen)
                    setCurrentPack(newPack)
                    setCurrentScreen(firstScreen)
                    return firstScreen
                }
                else {
                    setModalState(-1)
                    setErrorFinishPopup(responseScreen.msg ? responseScreen.msg : "Error")
                }
            }
            else {

                // EN DESARROLLO 
                //CASO: existe un PACK editandose (debería salir un mensaje informativo y preguntará si quiere acabar el pack que se estaba editando)
                //console.log('Hay un PACK que se está editando')
                setModalState(3)
                setErrorFinishPopup(responseCreation.msg ? responseCreation.msg : "Error creation")
                return;
            }
        }
        catch {
            setCurrentPack(undefined)
            //console.log("No se pudo cargar la screen inical")
            return null
        }
    }

    function cancelCreation() {
        const getResponse = async () => {
            const responseB2 = await apiBE.endB2_deletePack(ssCurrentPack!.idPack);
            if (responseB2.success !== 1) {
                setModalState(3)
                setErrorFinishPopup(responseB2.msg ? responseB2.msg : "Error endB2")
            }
        }
        if (ssCurrentPack) {
            getResponse();
            // apiBE.endB2_deletePack(ssCurrentPack.idPack);
            setCurrentPack(undefined)
        }
        setCurrentScreen(undefined)

    }

    async function postNextScreen(currentScreen: SchemaScreen, output: any): Promise<void> {
        let response: string | any
        try {
            if (ssCurrentPack !== undefined) {
                ssCurrentPack.addOnlyOutputToScreen(currentScreen!, output)

                response = await apiBE.endC1_nextScreen(ssCurrentPack.idPack, currentScreen.id, output)

                if (response.success === 1) {
                    let responseScreen = await apiBE.endC4_getScreen(ssCurrentPack.idPack)
                    if (responseScreen.success !== undefined && responseScreen.success === 1) {
                        let nextScreen = new SchemaScreen(responseScreen.res)
                        ssCurrentPack.createScreen(nextScreen)
                        setCurrentScreen(nextScreen)
                    }
                    else {

                        setModalState(-1)
                        setErrorFinishPopup(responseScreen.msg ? responseScreen.msg : "Error")
                    }
                } else if (response.success === 2) {
                    let aux = [...ssBase]
                    let indxBase = aux.findIndex((pck) => pck.idPack === ssCurrentPack.idPack);
                    let newFinishedPack = new cPackFE(ssCurrentPack!.idPack, ssCurrentPack!.folder, ssCurrentPack!.group, ssCurrentPack!.type, ssCurrentPack!.linkTO ? ssCurrentPack!.linkTO : "", [...ssCurrentPack!.screens])
                    if (indxBase === -1) aux.push(newFinishedPack)
                    else aux[indxBase] = newFinishedPack
                    setBase([...aux]);
                    setCurrentScreen(undefined);
                    setEditingMode(false);
                    setSelectedFolder(undefined);
                    foldersStructure!.resetSelectedFolder();
                    // filterFoldersByType(GroupFilteringType.Associated)       
                } else {
                    setCurrentScreen(undefined);
                    setEditingMode(false);
                    setModalState(-1)
                    setErrorFinishPopup(response.msg ? response.msg : "Error")
                }
            }
        } catch (err) {
            console.error(err)
            return
        }
    }
    async function getPreviousScreen() {
        let response: string | any
        try {
            if (ssCurrentPack !== undefined && ssCurrentScreen !== undefined) {
                response = await apiBE.endC2_previousScreen(ssCurrentPack.idPack)
                let successDeleteScreen = ssCurrentPack.goPreviousScreen(ssCurrentScreen.id)
                if (response.success === 1 && successDeleteScreen) {
                    let responseScreen = await apiBE.endC4_getScreen(ssCurrentPack.idPack)
                    if (responseScreen.success !== undefined && responseScreen.success === 1) {
                        let nextScreen = new SchemaScreen(responseScreen.res)
                        setCurrentScreen(nextScreen)
                    }
                    else {
                        setModalState(-1)
                        setErrorFinishPopup(responseScreen.msg ? responseScreen.msg : "Error")
                    }
                } else {
                    setCurrentScreen(undefined);
                    setEditingMode(false);
                    setModalState(-1)
                    setErrorFinishPopup(response.msg ? response.msg : "Error")
                }
            }
        } catch (err) {
            console.error(err)
            return
        }
    }
    async function cleanCreation(goToMainPage?: boolean) {
        await apiBE.endA2_deleteBase();
        setCurrentPack(undefined);
        setBase([]);
        if (goToMainPage) history.push("/databases")
        else window.location.reload()
        // filterFoldersByType(GroupFilteringType.Master)
    }
    async function saveDataBase(name: string) {
        let res = await apiBE.endD1_finishBase(name);
        if (res.success === 1) {
            setShowFinishPopup(0)
            history.push("/databases")
        }
        else {
            if (showFinishPopup > 0) setShowFinishPopup(2);
            else setModalState(3)
            setErrorFinishPopup(res.msg ? res.msg : "Error finish base")
        }
    }

    async function fcn_saveNewDBName() {
        const getNewBaseName = () => {
            let newText = "";
            if (ssNewBaseName !== "") {
                if (ssBaseName === "" || (ssBaseName[0] === "0" && ssBaseName[1] === ";")) newText = "0;" + ssNewBaseName
                else newText = ssNewBaseName
            }

            return newText;
        }
        let res = await apiBE.endA3_setNameBase(getNewBaseName());
        setModalState(3)
        setErrorFinishPopup(res.msg ? res.msg : "Se ha producido un error. No se ha podido contactar con el servidor")
    }

    function renderRighVisualizacion() {
        if (ssScreenToShowRef) {
            const scrnToRender = ssBase?.find((pck: cPackFE) => pck.idPack === ssScreenToShowRef.idPack)?.screens.find((scn) => scn.screenId === ssScreenToShowRef.idScreen);
            if (scrnToRender) return renderSelectedScreen(scrnToRender, ssScreenToShowRef.idxComp === -1 ? undefined : ssScreenToShowRef.idxComp);
        }
        return null
    }
    function renderModal() {
        if (ssModalState > 0) {
            if (ssModalState === 1) return <MyModal
                icon={MyModalIcon.Alert}
                style={{ width: '48rem', height: '18rem', zIndex: 1500 }}
                middleElements={
                    <span>Se ha detectado un base de datos no finalizada. ¿Desea continuar o crear una nueva (se eliminará la base en desarrollo)?</span>
                }
                onCloseCallback={() => { }}
                onOpenCallback={() => { }}
                // onCloseButtonCallback={()=>{}}
                bottomElements={
                    <>
                        <MyModalButton
                            style={{
                                width: '8rem', height: '2.5rem'
                            }}
                            displayText="Continuar"
                            onClickCallback={() => { setModalState(0) }}
                        />
                        <MyModalButton
                            style={{
                                width: '8rem', height: '2.5rem'
                            }}
                            displayText="Nueva Base"
                            onClickCallback={() => { cleanCreation(); setModalState(0) }}
                        />
                    </>
                }
            />

            if (ssModalState === 2) return <MyModal
                icon={MyModalIcon.Alert}
                style={{ width: '37rem', height: '16rem', zIndex: 1500 }}
                middleElements={
                    <span style={{ fontSize: "1.3rem", whiteSpace: 'normal' }}>¿Desea sobrescribir la base o guardarla con otro nombre?</span>
                }
                onCloseCallback={() => { }}
                onOpenCallback={() => { }}
                onCloseButtonCallback={() => { setModalState(0) }}
                bottomElements={
                    <>
                        {/* {console.log(ssNewBaseName)} */}
                        <MyModalButton
                            style={{
                                width: '10rem', height: '2.5rem'
                            }}
                            displayText="Sobrescribir"
                            onClickCallback={() => { saveDataBase("!default"); setModalState(0) }}
                        />
                        <MyModalButton
                            style={{
                                width: '10rem', height: '2.5rem'
                            }}
                            displayText="Guardar como..."
                            onClickCallback={() => { setModalState(0); setShowFinishPopup(1); }}
                        />
                    </>
                }
            />
            if (ssModalState === 3) return <MyModal
                icon={MyModalIcon.Alert}
                style={{ width: '37rem', height: '16rem', zIndex: 1500 }}
                middleElements={
                    <span style={{ fontSize: "1.3rem", whiteSpace: 'normal' }}>{ssErrorFinishPopup}</span>
                }
                onCloseCallback={() => { }}
                onOpenCallback={() => { }}
                onCloseButtonCallback={() => { setModalState(0); window.location.reload() }}
                bottomElements={
                    <>
                        <MyModalButton
                            style={{
                                width: '10rem', height: '2.5rem'
                            }}
                            displayText="Cerrar"
                            onClickCallback={() => { setModalState(0); window.location.reload() }}
                        />
                    </>
                }
            />
            if (ssModalState === 4) return <MyModal
                icon={MyModalIcon.Alert}
                style={{ width: '37rem', height: '16rem', zIndex: 1500 }}
                middleElements={
                    <>
                        <span style={{ fontSize: "1.3rem", whiteSpace: 'normal' }}>Defina el nombre de la base</span>
                        <CompInputName
                            initialName={ssBaseName !== "" && ssBaseName[0] === "0" && ssBaseName[1] === ";" ? ssBaseName.slice(2) : ssBaseName}
                            onChangeName={(newName) => { setNewBaseName(newName) }}
                        />
                    </>
                }
                removeAltert
                titleText={"Definición Nombre Base"}
                onCloseCallback={() => { }}
                onOpenCallback={() => { }}
                onCloseButtonCallback={() => { setModalState(0) }}
                bottomElements={
                    <>
                        <MyModalButton
                            style={{
                                width: '10rem', height: '2.5rem', color: colorDef.defButtonAccept, textColor: colorDef.defButtonAcceptText
                            }}
                            displayText="Aceptar"
                            onClickCallback={() => { fcn_saveNewDBName() }}
                        />
                        <MyModalButton
                            style={{
                                width: '10rem', height: '2.5rem'
                            }}
                            displayText="Cerrar"
                            onClickCallback={() => { setModalState(0) }}
                        />
                    </>
                }
            />
            if (ssModalState === 5) return <MyModal
                icon={MyModalIcon.Alert}
                style={{ width: '37rem', height: '16rem', zIndex: 1500 }}
                middleElements={
                    <>
                        <span style={{ fontSize: "1.3rem", whiteSpace: 'normal' }}>¿Desea eliminar el grupo {ssBase.find((pack) => pack.idPack == ssErrorFinishPopup)?.group.name}?</span>
                    </>
                }
                removeAltert
                titleText={"Eliminar grupo"}
                onCloseCallback={() => { }}
                onOpenCallback={() => { }}
                onCloseButtonCallback={() => { setModalState(0) }}
                bottomElements={
                    <>
                        <MyModalButton
                            style={{
                                width: '10rem', height: '2.5rem', color: colorDef.defButtonAccept, textColor: colorDef.defButtonAcceptText
                            }}
                            displayText="Sí"
                            onClickCallback={() => { deletePack(ssErrorFinishPopup); }}
                        />
                        <MyModalButton
                            style={{
                                width: '10rem', height: '2.5rem'
                            }}
                            displayText="No"
                            onClickCallback={() => { setModalState(0) }}
                        />
                    </>
                }
            />
            if (ssModalState === 6) return <MyModal
                icon={MyModalIcon.Alert}
                style={{ width: '37rem', height: '16rem', zIndex: 1500 }}
                middleElements={
                    <>
                        <span style={{ fontSize: "1.3rem", whiteSpace: 'normal' }}>¿Desea eliminar la base que está creando/editando?</span>
                    </>
                }
                removeAltert
                titleText={"Limpiar memoria"}
                onCloseCallback={() => { }}
                onOpenCallback={() => { }}
                onCloseButtonCallback={() => { setModalState(0) }}
                bottomElements={
                    <>
                        <MyModalButton
                            style={{
                                width: '10rem', height: '2.5rem', color: colorDef.defButtonAccept, textColor: colorDef.defButtonAcceptText
                            }}
                            displayText="Sí"
                            onClickCallback={() => { cleanCreation(); setModalState(0); }}
                        />
                        <MyModalButton
                            style={{
                                width: '10rem', height: '2.5rem'
                            }}
                            displayText="No"
                            onClickCallback={() => { setModalState(0) }}
                        />
                    </>
                }
            />

        }
        else if (ssModalState < 0) return <MyModal
            icon={MyModalIcon.Alert}
            style={{ width: '37rem', height: '16rem', zIndex: 1500 }}
            middleElements={
                <>
                    <span style={{ fontSize: "1.3rem", whiteSpace: 'normal' }}>{"Se ha detectado un error. "}</span>
                    {ssModalState === -1 &&
                        <span style={{ fontSize: "1.3rem", whiteSpace: 'normal' }}>{"Error en los datos enviados al servidor. Vuélvalo a intentar más tarde. Si el problema persiste póngase en contacto con el equipo de desarrollo."}</span>
                    }
                    {ssModalState === -2 &&
                        <span style={{ fontSize: "1.3rem", whiteSpace: 'normal' }}>{"Error recibiendo los datos del servidor."}</span>
                    }
                    {ssErrorFinishPopup !== "" && <span style={{ fontSize: "1.3rem", whiteSpace: 'normal' }}>{ssErrorFinishPopup}</span>}
                </>
            }
            onCloseCallback={() => { }}
            onOpenCallback={() => { }}
            onCloseButtonCallback={() => {
                setModalState(0);
                { ssModalState === -1 && window.location.reload() }
                { ssModalState === -2 && cleanCreation(true) }
            }}
            bottomElements={
                <>
                    <MyModalButton
                        style={{
                            width: '10rem', height: '2.5rem'
                        }}
                        displayText="Cerrar"
                        onClickCallback={() => {
                            setModalState(0);
                            { ssModalState === -1 && window.location.reload() }
                            { ssModalState === -2 && cleanCreation(true) }
                        }}
                    />
                </>
            }
        />
    }



    // ---
    const [foldersStructure, setFoldersStructure] = useState<VizFoldersStructure>()
    const [activeFolders, setActiveFolders] = useState<VizFolder[]>([])
    const [selectedFolder, setSelectedFolder] = useState<LeafVizFolder>()

    const [showFolderSelector, setShowFolderSelector] = useState<boolean>(false)
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
    const [showRename, setShowRename] = useState<boolean>(false)

    async function loadFolders() {
        let res = await apiBE.endpVAR1_getAllVariables();
        if (res && res.success === 1) {
            let aux: Folder[] = res.sections.map((data: FolderConstructorData) => new Folder(data))

            let foldersStructure = new VizFoldersStructure(aux)
            foldersStructure.filterFoldersByType(GroupFilteringType.Master)
            // foldersStructure.selectFolder(1)
            setActiveFolders(foldersStructure.getActiveFolders())
            // setSelectedFolder(foldersStructure.getSelectedFolder())
            setFoldersStructure(foldersStructure)
        }
        else {
            setModalState(3)
            setErrorFinishPopup(res.msg ? res.msg : "Se ha producido un error")
        }
    }
    function selectFolder(folderId: number) {
        foldersStructure!.selectFolder(folderId)
        setSelectedFolder(foldersStructure!.getSelectedFolder())
        setShowFolderSelector(false)
        setAnchorEl(null)
    }
    function filterFoldersByType(type: GroupFilteringType) {
        foldersStructure!.filterFoldersByType(type)
        setActiveFolders(foldersStructure!.getActiveFolders())
    }
    // ---

    useEffect(() => {
        const checkBaseInCache = async () => {
            const resBase = (await apiBE.endA1_getBase());
            //console.log('resBase',resBase  )
            if (resBase && resBase.success >= 0) {
                if (resBase !== undefined && resBase.packs !== undefined) {
                    setBaseName(resBase.baseName)
                    // if(resBase.baseName === "")
                    // setModalState(1);
                    const trueBase = resBase.packs.map((pck: cPackFE) => new cPackFE(pck.idPack, pck.folder, pck.group, pck.type, pck.linkTO ? pck.linkTO : "", pck.screens));
                    const resScreen = await apiBE.endC4_getScreen();
                    if (resScreen.success !== undefined && resScreen.success === 1) {
                        const resPackep = resScreen.res;
                        if (resPackep.idPack !== "none") {
                            let curPack = trueBase.find((pck: cPackFE) => pck.idPack === resPackep.idPack);
                            if (curPack !== undefined) {
                                setCurrentPack(curPack)
                                setBase([...trueBase])
                                let currScreen = new SchemaScreen(resPackep)
                                setCurrentScreen(currScreen)
                                setEditingMode(true)
                                return
                            }
                            else console.log('No se ha encontrado el pack de la screen')
                        }
                        else {
                            setModalState(-1)
                            setErrorFinishPopup(resScreen.msg ? resScreen.msg : "Error")
                        }
                    }
                    else {
                        setCurrentPack(undefined)
                        setBase([...trueBase])
                        setCurrentScreen(undefined)
                        return
                    }
                }
                else {
                    setCurrentPack(undefined)
                    setBase([])
                    setCurrentScreen(undefined)
                }
            }
            // Handle Error
            else {
                setCurrentScreen(undefined);
                setEditingMode(false);
                setModalState(-2)
                setErrorFinishPopup(resBase.msg ? resBase.msg : "")
            }

        }

        checkBaseInCache();
        loadFolders();
        window.addEventListener('resize', () => {
            window.innerWidth < screenWidthBorder ?
                setMiniView(true)
                :
                setMiniView(false)
        })

        /* let showModal = false
        let acceptedPreviouslyStr: string | null
        acceptedPreviouslyStr = localStorage.getItem("infoAccepted")
        if (acceptedPreviouslyStr) {
            showModal = false
            // let dateAccepted = new Date(acceptedPreviouslyStr)
            // let dateNow = new Date()
            // let sameDay = dateAccepted.getDay() == dateNow.getDay()
            // if (!sameDay) showModal = true
        } else showModal = true
        if (showModal) setShowDailyInfoModal(showModal) */
        async function loadTextInfoDaily() {
            let res = await apiBE.endI1_loadTextInfoMessage();
            // console.log("res", res)
            if (res && res.success === 1) {
                let dateInMsg = new Date(res.data.date)
                let dateInStg = localStorage.getItem("infoAccepted") || null
                console.log("res", dateInStg, dateInMsg, dateInStg ? new Date(dateInStg) >= dateInMsg : 'error')
                if (dateInStg && (new Date(dateInStg) >= dateInMsg)) {
                    setShowDailyInfoModal(false)
                }
                else {
                    setTextDailyInfoModal(res.data)
                    setShowDailyInfoModal(true)
                }
            }
            else {
                setModalState(3)
                setErrorFinishPopup(res.msg ? res.msg : "Se ha producido un error")
            }
        }
        loadTextInfoDaily()

    }, [])

    /* useEffect(() => {
        async function loadTextInfoDaily() {
            let res = await apiBE.endI1_loadTextInfoMessage();
            console.log("res",res)
            if (res && res.success === 1) {
                let dateInMsg = new Date(res.date)
                let dateInStg = localStorage.getItem("infoAccepted") || null
                if (dateInStg) console.log(dateInMsg, new Date(dateInStg))
                if (dateInStg) if (new Date(dateInStg) > dateInMsg) return
                setTextDailyInfoModal(res.data)
            }
            else {
                setModalState(3)
                setErrorFinishPopup(res.msg ? res.msg : "Se ha producido un error")
            }
        }
 
 
        if (showDailyInfoModal) {
            loadTextInfoDaily();
        }
    }, [showDailyInfoModal]) */

    useEffect(() => {
        if (foldersStructure) {
            if (ssBase.length === 0) filterFoldersByType(GroupFilteringType.Master)
            else filterFoldersByType(GroupFilteringType.Associated)
        }
    }, [foldersStructure, ssBase])

    function StandardRenderer() {
        return (
            <GeneralLayout
                blurred={(showFolderSelector || (miniViewShowTree && (ssScreenToShowRef !== undefined && ssScreenToShowRef !== null)))}
            >
                <Navbar />
                {
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "2fr minmax(35rem, 40rem)"
                    }}>
                        <CentralDisplayContainer>
                            <Container>
                                <Header>

                                    <div style={{ width: "100%" }}>  Selección de nueva variable</div>
                                    <TooltipNAV title="Buscar en Carpetas/Grupos/Variables por nombre" arrow>
                                        <SearchInfoButton onClick={() => setShowSearchResultModal(true)}>
                                            {/* Busqueda general */}
                                            <FaSearch />
                                        </SearchInfoButton>
                                    </TooltipNAV>

                                </Header>
                                <SelectNewVariableDisplayer
                                    onShowFolderSelector={(event) => handleClickOnChangeFolder(event)}
                                    folder={selectedFolder!}
                                    onSelectGroup={(folder, group) => startCreation(folder, group, "", "")}
                                />
                            </Container>
                            <Popover
                                id="selectFolderPopover"
                                open={anchorEl ? true : false}
                                anchorEl={anchorEl}
                                onClose={() => setAnchorEl(null)}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                            >
                                <FoldersPicker
                                    folders={activeFolders}
                                    onSelectFolder={(id) => selectFolder(id)}
                                />
                            </Popover>
                        </CentralDisplayContainer>
                        <div style={{
                            height: "calc(100vh - 60px - 60px)",
                            display: "grid",
                            gridTemplateRows: "50% 50%",

                        }}>
                            <TreeDisplayContainer>
                                <Container>
                                    <Header>
                                        Visualización del progreso
                                    </Header>
                                    {
                                        ssBase.length > 0 ?
                                            <TreeView id={"treeview"} style={{ padding: "0.3rem", overflow: "scroll", margin: "0 0.7rem" }}>
                                                {ssBase.length > 0 &&
                                                    <CompRenameBase
                                                        baseName={ssBaseName}
                                                        onClickRename={() => { setModalState(4) }}
                                                    />
                                                }
                                                {ssBase.filter((pck) => !pck.isFilter()).map((pck) => {
                                                    return <CustomTreeContainer
                                                        pack={pck}
                                                        filters={ssBase.filter((pckList) => pckList.linkTO === pck.idPack)}
                                                        setViewScreenCallback={(screenRef) => { setScreenToShowRef(screenRef) }}
                                                        setEditingFunctionCallback={(id: string, screen: string) => editPack(id, screen)}
                                                        setFilteringFunctionCallback={() => {
                                                            startCreation(
                                                                { id: -1, name: "Filtro" },
                                                                { id: -1, name: "Filtro" },
                                                                "Filtro", pck.idPack
                                                            )
                                                        }}
                                                        setDeletingFunctionCallback={(id) => { setModalState(5); setErrorFinishPopup(id) }}
                                                    />
                                                }
                                                )}
                                            </TreeView>
                                            :
                                            <FillerText1 />
                                    }
                                </Container>
                            </TreeDisplayContainer>
                            <ComponentDisplayContainer>
                                <Container>
                                    <Header>
                                        Visualización del componente
                                    </Header>
                                    {
                                        ssScreenToShowRef ?
                                        renderRighVisualizacion()
                                        :
                                        <FillerText2 />
                                    }
                                </Container>
                            </ComponentDisplayContainer>
                        </div>
                    </div>
                }
                <BottomButtonsContainer>
                    <BottomButton
                        onClick={() => setModalState(6)}
                    >
                        Limpiar
                        <MdClear color={colorDef.defMainThemeColor} />
                    </BottomButton>
                    <BottomButton
                        style={{ backgroundColor: colorDef.defCreateBaseSalirSinGuardarButton, color: "white" }}
                        onClick={() => cleanCreation(true)}
                    >
                        Salir sin guardar
                        <IoMdExit color={"white"} />
                    </BottomButton>
                    <BottomButton
                        style={{
                            backgroundColor: colorDef.defCreateBaseFinalizarButton, color: "white",
                            visibility: ssBase.length === 0 ? "hidden" : "visible",
                        }}
                        // onClick={() => ssBaseName === "" ? setShowFinishPopup(1) : setModalState(2)}
                        onClick={() => {
                            if (ssBaseName === "" || (ssBaseName[0] === "0" && ssBaseName[1] === ";")) {
                                setShowFinishPopup(1);
                                setNewBaseName(ssBaseName === "" ? "" : ssBaseName.slice(2))
                            }
                            else {
                                setNewBaseName(ssBaseName)
                                setModalState(2)
                            }
                        }}
                    >
                        Finalizar
                        <IoMdSend color={"white"} />
                    </BottomButton>
                </BottomButtonsContainer>
            </GeneralLayout>
        )
    }

    function MiniViewRenderer() {
        return (
            <>
                <GeneralLayout
                    blurred={(showFolderSelector || (miniViewShowTree && (ssScreenToShowRef !== undefined && ssScreenToShowRef !== null)))}
                >
                    <Navbar />
                    <CentralDisplayContainer>
                        {
                            miniViewShowTree ?
                                <div style={{ color: "black" }}>
                                    {ssBase.length > 0 &&
                                        <CompRenameBase
                                            baseName={ssBaseName}
                                            onClickRename={() => { setModalState(4) }}
                                        />
                                    }
                                    <TreeView >
                                        {
                                            ssBase.length > 0 ?
                                            ssBase.filter((pck) => !pck.isFilter()).map((pck) => {
                                                return <CustomTreeContainer
                                                    pack={pck}
                                                    filters={ssBase.filter((pckList) => pckList.linkTO === pck.idPack)}
                                                    setViewScreenCallback={(screenRef) => { setScreenToShowRef(screenRef) }}
    
                                                    setEditingFunctionCallback={(id: string, screen: string) => editPack(id, screen)}
                                                    setFilteringFunctionCallback={() => {
                                                        startCreation(
                                                            { id: -1, name: "Filtro" },
                                                            { id: -1, name: "Filtro" },
                                                            "Filtro", pck.idPack
                                                        )
                                                    }}
                                                    setDeletingFunctionCallback={(id) => { setModalState(5); setErrorFinishPopup(id) }}
                                                // NOTA: setErrorFinishPopup se utiliza para guardar id del elemento seleccionado y así poderlo utilizar en el modal. 
                                                />})
                                            :
                                            <FillerText3/>
                                        }
                                    </TreeView>
                                </div>
                                :
                                <>
                                    <SelectNewVariableDisplayer
                                        onShowFolderSelector={(event) => handleClickOnChangeFolder(event)}
                                        folder={selectedFolder!}
                                        onSelectGroup={(folder, group) => startCreation(folder, group, "", "")}
                                    />
                                    <Popover
                                        id="selectFolderPopover"
                                        open={anchorEl ? true : false}
                                        anchorEl={anchorEl}
                                        onClose={() => setAnchorEl(null)}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                    >
                                        <FoldersPicker
                                            folders={activeFolders}
                                            onSelectFolder={(id) => selectFolder(id)}
                                        />
                                    </Popover>
                                </>
                        }
                    </CentralDisplayContainer>
                    <BottomButtonsContainer>
                        <BottomButton
                            onClick={() => cleanCreation()}
                        >
                            Limpiar
                            <MdClear color={colorDef.defMainThemeColor} />
                        </BottomButton>
                        <BottomButton
                            style={{ backgroundColor: colorDef.defCreateBaseSalirSinGuardarButton, color: "white" }}
                            onClick={() => cleanCreation(true)}
                        >
                            Salir sin guardar
                            <IoMdExit color={"white"} />
                        </BottomButton>
                        <BottomButton
                            style={{
                                backgroundColor: colorDef.defCreateBaseFinalizarButton, color: "white",
                                visibility: ssBase.length === 0 ? "hidden" : "visible",
                            }}
                            onClick={() => {
                                if (ssBaseName === "" || (ssBaseName[0] === "0" && ssBaseName[1] === ";")) {
                                    setShowFinishPopup(1);
                                    setNewBaseName(ssBaseName === "" ? "" : ssBaseName.slice(2))
                                }
                                else {
                                    setNewBaseName(ssBaseName)
                                    setModalState(2)
                                }
                            }}

                        >
                            Finalizar
                            <IoMdSend color={"white"} />
                        </BottomButton>
                    </BottomButtonsContainer>
                </GeneralLayout>
                {
                    !ssScreenToShowRef && !showFolderSelector ? <FloatingChangeViewButton
                        onClick={() => setMiniViewShowTree(!miniViewShowTree)}
                    >
                        <FaExchangeAlt />
                    </FloatingChangeViewButton>
                        : null
                }
            </>
        )
    }
    function fcn_buildTextDailyInfo(paragText: string[]) {
        const fcn_identSpecialText = (rawMsg: string) => {
            const arrayMsg = rawMsg.split("//");
            return arrayMsg.map((el: string) => {
                if (el[0] === "$") {
                    if (el[1] === "b") return <b>{el.slice(2)}</b>
                    else if (el[1] === "E") return <ElementBagdeTreeItem type={el.slice(2)} size={'1.3rem'} />
                    else if (el[1] === "I") return <TooltipNAV
                        title={"Información"}
                        arrow={true}
                        placement={'right-start'}
                    >
                        <div style={{ display: "inline" }}>
                            <FaInfoCircle style={{ color: colorDef.defInfoIcon }} />
                        </div>
                    </TooltipNAV>
                    else if (el[1] === "L") return <span style={{ textDecoration: "underline", color: "blue", cursor: "pointer" }}> Link </span>
                }
                return el
            })

        }

        return (
            <>
                {paragText.map((msgEl) =>
                    <p>{fcn_identSpecialText(msgEl)}</p>)
                }
            </>
        )

    }

    function ModalDailyInfo() {
        return (
            <MyModal
                noTop
                showOverEverything
                titleText={"Información"}
                middleElements={
                    // <div style={{
                    //     display: "flex",
                    //     flexDirection: "column",
                    //     justifyContent: "center",
                    //     width: "100%",
                    //     height: "100%",
                    // }}>
                    //     <h1 style={{ color: colorDef.defBlackColor }}>Bienvenido/a a SILD</h1>
                    //     <div style={{ textAlign: "justify" }}>
                    //         <span>El proceso de construcción de la Base se divide en dos partes:</span>
                    //         <br />
                    //         <span>1. Vas a decidir la variable que va a relacionar toda tu base de datos, que recibe el nombre VARIABLE MASTER.</span>
                    //         <br />
                    //         <span>2. Una vez construida la VARIABLE MASTER, vas a seleccionar aquellas variables que quieres relacionar con dicha variable, que recibe el nombre de variable asociada.</span>
                    //         <br />
                    //         <span>Para construir cada una de las variables se va a realizar  a partir de un conjunto de pasos guiados.</span>
                    //     </div>
                    //     <label><input type="checkbox" id="infoCheckbox" value="first_checkbox"/> No volver a mostrar</label>
                    //     {/* <span style={{ color: colorDef.defRedColor, fontSize: "0.6em" }}>*Tras aceptar este aviso, no se mostrará de nuevo durante el día de hoy</span> */}
                    // </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                        textAlign: "left",
                        paddingLeft: "0.5rem",
                        paddingRight: "0.5rem",

                    }}>
                        <h2 style={{ textAlign: "center", fontSize: "1.8rem", marginBottom: "1rem", marginTop: "1rem" }}>{textDailyInfoModal ? textDailyInfoModal.title : " "}</h2>
                        {/* <div style={{ textAlign: "justify" }} dangerouslySetInnerHTML={{ __html: textDailyInfoModal ? textDailyInfoModal.message : "Error cargando el mensaje..." }} /> */}
                        <div style={{ textAlign: "justify" }}>{textDailyInfoModal ? fcn_buildTextDailyInfo(textDailyInfoModal.message) : "Error cargando el mensaje..."}</div>
                        {/* <p><span>AAA</span> <ElementBagdeTreeItem type={'Master'} size={'1.3rem'} /></p> */}

                        <label style={{ justifySelf: "center" }}><input type="checkbox" id="infoCheckbox" value="first_checkbox" /> No volver a mostrar</label>
                    </div>
                }
                bottomElements={
                    <MyModalButton
                        displayText={"Cerrar"}
                        onClickCallback={() => {
                            let cbox: any = document.getElementById("infoCheckbox")!
                            if (cbox.checked) localStorage.setItem("infoAccepted", new Date().toString())
                            setShowDailyInfoModal(false)
                        }}
                    />
                }
            />
        )
    }


    return (
        <>
            <>
                {showDailyInfoModal ? ModalDailyInfo() : null}
                <SearchResultModal open={showSearchResultModal} onClose={() => setShowSearchResultModal(false)} />
                {
                    showFinishPopup > 0 ?
                        <FinishCreationPopUp
                            initialName={ssNewBaseName}
                            status={showFinishPopup}
                            closePopup={() => setShowFinishPopup(0)}
                            onClearMessage={() => setShowFinishPopup(1)}
                            onSaveDatabase={saveDataBase}
                            errorString={ssErrorFinishPopup}
                        />
                        : null
                }
                {renderModal()}
                {
                    ssCurrentScreen ?
                        <Popup
                            progress={ssCurrentPack!}
                            screen={ssCurrentScreen}
                            editingMode={ssEditingMode}
                            onHide={() => cancelCreation()}
                            onSave={postNextScreen}
                            onBack={getPreviousScreen}
                        /> : null
                }
                <SelectFolderFloatingContainer
                    visible={showFolderSelector}
                >
                    <CloseComponentViewButton onClick={() => setShowFolderSelector(false)}>
                        <IoIosCloseCircleOutline size="1.5rem" />
                    </CloseComponentViewButton>
                    <FoldersPicker
                        folders={activeFolders}
                        onSelectFolder={(id) => selectFolder(id)}
                        miniView
                    />
                </SelectFolderFloatingContainer>
                <SelectFolderFloatingContainer
                    visible={miniView && ssScreenToShowRef !== null && ssScreenToShowRef !== undefined}
                >
                    <CloseComponentViewButton onClick={() => setScreenToShowRef(undefined)}>
                        <IoIosCloseCircleOutline size="1.5rem" />
                    </CloseComponentViewButton>
                    {
                        ssScreenToShowRef ?
                            <div style={{
                                color: "white",
                                backgroundColor: colorDef.defMainThemeColor,
                                width: "100%",
                                padding: "1rem",
                                fontWeight: "bold"
                            }}>
                                <span>{ssBase.find((pack) => pack.idPack === ssScreenToShowRef.idPack)?.screens.find((screen) => screen.screenId === ssScreenToShowRef.idScreen)?.screenTitle}</span>
                            </div>
                            : null
                    }
                    {renderRighVisualizacion()}
                </SelectFolderFloatingContainer>
            </>
            {
                foldersStructure && activeFolders.length > 0 ?
                    miniView ? MiniViewRenderer() : StandardRenderer()
                    :
                    <div style={{
                        display: "flex",
                        width: "100vw",
                        height: "100vh",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Loader />
                    </div>
            }
        </>
    )
}

