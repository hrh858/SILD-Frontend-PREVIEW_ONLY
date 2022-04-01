import React, { ReactElement, useState } from "react";
import { useHistory } from 'react-router-dom';
import { TreeView } from '@material-ui/lab'
import Form from "react-bootstrap/Form";
import UseAnimations from "react-useanimations";
import arrowDownCircle from 'react-useanimations/lib/arrowDownCircle';
import edit from 'react-useanimations/lib/edit';
import styled from "styled-components";
import { FaTrash, FaDatabase, FaEye, FaCircle, FaFilter, FaSearch, FaTimesCircle, FaBan } from "react-icons/fa"
import { MdEdit } from 'react-icons/md';

// MY COMPONENTS -  ELEMENTS
import { TooltipNAV } from "../../Elements/ElementStyledTooltip";
import { MyModal, MyModalButton, MyModalIcon } from "../../zComponents/MyModal"
import { DatabaseData } from "./zMainPage";
import { CustomTreeContainer } from '../../zComponents/CustomTree'
import { DeactivableTooltipIcon, MyDBOptions } from "./DeactivableTooltipIcon";

// MODELS
import { cPackFE } from '../../Models/cPackFE'

// SHARE
import * as colorDef from "../../Shared/Colors";
import { defShadow } from "../../Shared/Shadows";

// API
import { endD4_getUserPermisosDownload, endDB2_downloadDatabase, endDB3_BuildBase, endDB4_updatePrivilegies } from "../../Services/api";
import { endD2_getDatabase } from '../../Services/api'



const CustomFieldset = styled.fieldset`
    border: 3px solid ${colorDef.defMainThemeColor};
    border-radius:0.5rem;
    width: 100%;
    justify-items: center;
    color:black;
    padding-top: 0.2rem;
    padding-bottom: 1rem;
    padding-left:1rem;
    padding-right:1rem;
     &::-webkit-scrollbar {
        width: 0.35rem !important ; 
        display: flex;
        padding-bottom: 5rem;
    }
    &::-webkit-scrollbar-thumb  {
        background: ${colorDef.defScrollBar}; 
        border:none ;
        border-radius: 0.3rem;
    }
    &::-webkit-scrollbar-track {
        margin-bottom: ${colorDef.defBorderRadius};
        }
`

const CustomLegend = styled.legend`
    color: ${colorDef.defMainThemeColor};
    font-weight: bold;
    width: auto;
    font-size:1.5rem;
    padding:0rem 0.7rem;
    text-align: left;
    margin-right: 1.5rem;
    margin-left: 2.5rem;
    margin-bottom: 0px;
    display: flex;
    gap:1rem;
    white-space: nowrap;
    text-overflow:  ellipsis;
    cursor: default;
    align-items: center;
    justify-content: center;
    
`

const DatabaseRowR = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap:1rem;
`

const ButtonCrearteDB = styled.button`
    color: ${colorDef.defWhiteColor};
    background-color: ${colorDef.defMainThemeColor};
    height: 2.5rem;
    width: 12rem;
    min-height: 2.4rem;
    border-radius: 1.2rem;
    cursor: pointer;
    font-weight: bold;
    border: 0;
    transition: 0.1s;
    animation-timing-function: ease-in-out;

    &:hover{
        box-shadow: rgba(0, 0, 0, 0.6) 0 1px 10px;
        transform: scale(1.02);
        transition: 0.1s;
        animation-timing-function: ease-in-out;
    }
`

const MyCardHeader = styled.div`
    width:100%;
    height: 3.2rem;
    background-color:${colorDef.defMainThemeColor};
    color: white;
    text-align: center;
    display:flex;
    justify-content: center;
    justify-items: center;
    align-items: center;
    align-content: center;
    font-weight: 900;
    font-size:1.3rem; 
    border: 1px solid ${colorDef.defBorderCardizqColor};
`

const MyCardBody = styled.div`
    width:100%;
    height: 3rem;
    background-color:white ;
    color: black;
    text-align: center;
    display:flex;
    justify-content: space-between;
    justify-items: space-between;
    align-items: center;
    align-content: center;
    border-bottom: 1px solid ${colorDef.defBorderCardizqColor};
    border-left: 1px solid ${colorDef.defBorderCardizqColor};
    border-right: 1px solid ${colorDef.defBorderCardizqColor};
    padding: 0 1rem;
    cursor: pointer;
    &:hover{
        background-color:lightgray;
    }
   
`

const IconFiltroActivo = styled.div`
    background-color:${colorDef.defRedColor};
    width:1.5rem;
    height:1.5rem;
    border-radius:50%;
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;

    transition: 0.1s;
    animation-timing-function: ease-in-out;

    &:hover{
        transform: scale(1.1);
        transition: 0.1s;
        animation-timing-function: ease-in-out;
    }
`

const StyledInput = styled.input`
  ::placeholder {
    color: #eeeeee,
  }
  ::-webkit-input-placeholder {
    color: #eeeeee;
  }
  :-ms-input-placeholder {
     color: #eeeeee;
  }
`



type AvailableDatabasesProps = {
    catcheBase: undefined | { name: string, date: string }
    databases: Array<DatabaseData> | undefined
    onClickDatabase: (id: number, name: string) => void
    onDeleteBase: (idBase: string) => void
    onClickTrashCacheBase: () => void
    isGetDatabaseSuccess: boolean
    isGetCacheBaseSuccess: boolean
}

const AvailableDatabases = (props: AvailableDatabasesProps) => {

    const [ssModalState, setModalState] = useState<number>(0)
    const [ssSelectedBase, setSelectedBase] = useState<{ id: number, name: string, status: number }>({ id: -1, name: "", status: 0 })

    const [ssModalText, setModalText] = useState<string>("");
    const [ssBuscadorText, setBuscadorText] = useState<string>("");
    const [ssFiltroSeleccionado, setFiltroSeleccionado] = useState<number>(0);

    //---------------------------------------------------
    const ssShowBaseDetails = true;
    const [ssBaseAllInfo, setBaseAllInfo] = useState<{ id: number, name: string, createdAt: string, base: cPackFE[] } | undefined>(undefined)

    async function getBaseDetails(dbID: number, dbName: string) {
        endD2_getDatabase(dbID.toString()).then((res) => {
            if (res.success <= -1) setBaseAllInfo({ id: -1, name: "unknown (ERROR)", createdAt: "", base: [] })
            else {
                const database = res.data;
                setBaseAllInfo({ id: dbID, name: database.baseName, createdAt: database.createdAt, base: database.packs })
            }
        })

    }

    const [ssBaseSelected, setBaseSelected] = useState<number | undefined>(undefined)

    //-------------------------------------------------------
    const [ssDownloadPerm, setDownloadPerm] = useState<number>(-1)
    const [ssDownloadOptionSelected, setDownloadOptionSelected] = useState<number>(0)

    const history = useHistory();
    const changePath = (path: string) => {
        history.push(path);
    }

    const getFiltredDB = (filterStatus: number) => {
        if (props.databases) {
            if (filterStatus === 2) return props.databases?.filter((elDB => elDB.status === 0))
            if (filterStatus === 3) return props.databases?.filter((elDB => elDB.status === 1))
            if (filterStatus === 4) return props.databases?.filter((elDB => elDB.status === 3))
            if (filterStatus === 5) return props.databases?.filter((elDB => elDB.status === 2 || elDB.status === 4))
            if (filterStatus === 6) return props.databases?.filter((elDB => elDB.status === 4))
            if (filterStatus === 7) return props.databases?.filter((elDB => elDB.status === 2))
            return props.databases
        }
        return []
    }

    async function fcn_downloadBase() {
        // OPEN INFO SCREEN
        if (ssSelectedBase && ssSelectedBase.id !== -1) {
            let temp = await endDB2_downloadDatabase(ssSelectedBase.id, ssDownloadOptionSelected);
            if (temp.success === 1) setModalText("El proceso de descarga de la base " + ssSelectedBase.name + " ha comenzado. Cuando la base esté disponible recibirá un correo a su mail @clinc.cat. " + temp.link)
            else setModalText("Se ha producido un error. Vuelva a intentarlo más tarde.")
        }
    }

    async function fcn_BuildBase(replace?:Boolean) {
        // OPEN INFO SCREEN
        if (ssSelectedBase && ssSelectedBase.id !== -1) {
            let temp = await endDB3_BuildBase(ssSelectedBase.id,replace);
            setModalState(3);
            if (temp.success === 1) setModalText("El proceso de construcción de la base " + ssSelectedBase.name + " ha comenzado. Cuando la base esté disponible recibirá un correo a su mail @clinc.cat.")
            else if (temp.success === -3){
                setModalState(8);
                setModalText("Se ha detectado un fichero de descarga de la base.\n ¿ Desea borrar este fichero y constuir la nueva base ? \n" + (temp.link ? "Link: "+temp.link :""))
            }
            else setModalText("Se ha producido un error. Vuelva a intentarlo más tarde. \n" + (temp.msg ? temp.msg : ""))
        }

    }

    async function fcn_DarPermisosVisulizacionBase() {
        if (ssSelectedBase && (ssSelectedBase.status === 2 || ssSelectedBase.status === 4)) {
            // OPEN INFO SCREEN
            let temp = await endDB4_updatePrivilegies(ssSelectedBase.id, ssSelectedBase.status === 2 ? 1 : 0);
            setModalState(3);
            if (temp.success === 1) setModalText("La base " + ssSelectedBase.name + " ya " + (ssSelectedBase.status === 4 ? "NO" : "") + " es visible en su cuenta MySQL")
            else setModalText("Se ha producido un error. Vuelva a intentarlo más tarde. \n" + (temp.msg ? temp.msg : ""))
        }
        else setModalText("Error 1")
    }

    var databasesToRender: Array<ReactElement> = [];
    let dataBaseFiltrado = getFiltredDB(ssFiltroSeleccionado);
    if (ssBuscadorText !== "") dataBaseFiltrado = dataBaseFiltrado.filter((elDb) => elDb.name.toLowerCase().includes(ssBuscadorText.toLowerCase()))

    if (dataBaseFiltrado) {
        dataBaseFiltrado.forEach((database: DatabaseData, idx: number) => {
            databasesToRender.push(
                <InfoDBStructure
                    id={"d" + idx.toString() + ";" + database.name}
                    status={database.status !== undefined ? database.status : -2}
                    dbName={database.name}
                    dbDate={database.date}
                    onClickDb={
                        () => { getBaseDetails(database.idDatabase, database.name) }
                    }
                    selected={ssBaseSelected ? database.idDatabase === ssBaseSelected : false}
                    buttons={<DatabaseRowR>
                        <MyDBOptions
                            id={database.idDatabase.toString()}
                            status={database.status}
                            onOpen={() => setBaseSelected(database.idDatabase)}
                            onClose={() => setBaseSelected(undefined)}
                            onClickBuild={() => { setSelectedBase({ id: database.idDatabase, name: database.name, status: database.status }); setModalState(5); }}
                            onClickDownload={() => { setSelectedBase({ id: database.idDatabase, name: database.name, status: database.status }); setModalState(2); getUserDownloadPerm() }}
                            onClickDelete={() => { setSelectedBase({ id: database.idDatabase, name: database.name, status: database.status }); setModalState(1) }}
                            onClickVisualizar={() => { setSelectedBase({ id: database.idDatabase, name: database.name, status: database.status }); setModalState(6); }}
                            onClickEdit={() => { props.onClickDatabase(database.idDatabase, database.name) }}

                        />
                    </DatabaseRowR>}
                />
            )
        });
    }

    const getUserDownloadPerm = async () => {
        let response = await endD4_getUserPermisosDownload();
        if (response.success === 1) setDownloadPerm(response.permDownload);
        else {
            setModalState(3);
            setModalText("Se ha producido un error. " + response.msg ? response.msg : "")
        }
    }

    function renderModal() {
        const restartStates = () => {
            setModalText("");
            setSelectedBase({ id: -1, name: "", status: -10 });
            setModalState(0)

        }
        if (ssModalState > 0) {
            if (ssModalState === 1) return <MyModal
                icon={MyModalIcon.Alert}
                style={{ width: '37rem', height: '16rem', zIndex: 1500 }}
                titleText={"Eliminar Base"}
                middleElements={
                    <span style={{ fontSize: "1.3rem" }}>
                        ¿Desea eliminar la base "{ssSelectedBase.name}"?
                    </span>
                }
                onCloseCallback={() => { }}
                onOpenCallback={() => { }}
                onCloseButtonCallback={() => { restartStates() }}
                bottomElements={
                    <>
                        <MyModalButton
                            style={{
                                width: '8rem', height: '2.5rem', color: colorDef.defButtonAccept, textColor: colorDef.defButtonAcceptText
                            }}
                            displayText="Sí"
                            onClickCallback={() => { props.onDeleteBase(ssSelectedBase.id.toString()); restartStates() }}
                        />
                        <MyModalButton
                            style={{
                                width: '8rem', height: '2.5rem'
                            }}
                            displayText="No"
                            onClickCallback={() => { restartStates() }}
                        />
                    </>
                }
            />
            else if (ssModalState === 2) return <MyModal
                icon={MyModalIcon.Alert}
                style={{ width: '37rem', height: '18rem', zIndex: 1500 }}
                titleText={"Descarga Base"}
                middleElements={
                    <>
                        {ssDownloadPerm === -1 ?
                            <span style={{ fontSize: "1.3rem" }}>
                                Comprobando permisos...
                            </span>
                            :
                            <>
                                <span style={{ fontSize: "1.3rem" }}>
                                    ¿Desea descargar la base <b>{ssSelectedBase.name}</b>?
                                </span>
                                {ssDownloadPerm === 1 &&
                                    <div
                                        style={{ display: "flex", justifyContent: "start", justifyItems: "start", gap: '15px', alignItems: 'center' }}
                                    >
                                        <span style={{ whiteSpace: 'nowrap', color: 'black' }}>{"El fichero debe incluir:"}</span>

                                        <Form.Control
                                            name={'selectRef'} as="select" value={ssDownloadOptionSelected} onChange={(e) => setDownloadOptionSelected(parseInt(e.target.value))} >
                                            <option value={0} > Nada</option>
                                            <option value={1} > NHC</option>
                                            <option value={2} > idEpisodio</option>
                                            <option value={3} > NHC y idEpisodio </option>
                                        </Form.Control>
                                    </div>
                                }
                            </>
                        }
                    </>

                }
                onCloseCallback={() => { }}
                onOpenCallback={() => { }}
                onCloseButtonCallback={() => { restartStates() }}
                bottomElements={
                    <>
                        <MyModalButton
                            style={{
                                width: '8rem', height: '2.5rem', color: colorDef.defButtonAccept, textColor: colorDef.defButtonAcceptText
                            }}
                            displayText="Sí"
                            onClickCallback={() => {
                                fcn_downloadBase();
                                setModalState(3);
                                setModalText("Contactando con el servidor")
                            }}
                        />
                        <MyModalButton
                            style={{
                                width: '8rem', height: '2.5rem'
                            }}
                            displayText="No"
                            onClickCallback={() => { restartStates() }}
                        />
                    </>
                }
            />
            else if (ssModalState === 3) return <MyModal
                icon={MyModalIcon.Alert}
                style={{ width: '37rem', height: '18rem', zIndex: 1500 }}
                titleText={"Información"}
                middleElements={
                    <span style={{ fontSize: "1.3rem", whiteSpace:"pre-line" }}>
                        {ssModalText}
                    </span>

                }
                onCloseCallback={() => { }}
                onOpenCallback={() => { }}
                onCloseButtonCallback={() => { restartStates() }}
                bottomElements={
                    <>
                        <MyModalButton
                            style={{
                                width: '8rem', height: '2.5rem'
                            }}
                            displayText="Cerrar"
                            onClickCallback={() => { window.location.reload(); restartStates() }}
                        />
                    </>
                }
            />
            else if (ssModalState === 5) return <MyModal
                icon={MyModalIcon.Alert}
                style={{ width: '37rem', height: '18rem', zIndex: 1500 }}
                titleText={"Construcción Base"}
                middleElements={
                    <span style={{ fontSize: "1.3rem" }}>
                        ¿Desea construir la base <b>{ssSelectedBase.name}</b>?
                    </span>

                }
                onCloseCallback={() => { }}
                onOpenCallback={() => { }}
                onCloseButtonCallback={() => { restartStates() }}
                bottomElements={
                    <>
                        <MyModalButton
                            style={{
                                width: '8rem', height: '2.5rem', color: colorDef.defButtonAccept, textColor: colorDef.defButtonAcceptText
                            }}
                            displayText="Sí"
                            onClickCallback={() => {
                                fcn_BuildBase();
                                setModalState(3);
                                setModalText("Contactando con el servidor")
                            }}
                        />
                        <MyModalButton
                            style={{
                                width: '8rem', height: '2.5rem'
                            }}
                            displayText="No"
                            onClickCallback={() => { restartStates() }}
                        />
                    </>
                }
            />
            else if (ssModalState === 6) return <MyModal
                icon={MyModalIcon.Alert}
                style={{ width: '37rem', height: '18rem', zIndex: 1500 }}
                titleText={"Visualización Base"}
                middleElements={
                    <span style={{ fontSize: "1.3rem" }}>
                        ¿Desea {ssSelectedBase.status === 2 ? "poder" : "dejar de"} visualizar la base <b>{ssSelectedBase.name}</b> en su cuenta MySQL?
                    </span>

                }
                onCloseCallback={() => { }}
                onOpenCallback={() => { }}
                onCloseButtonCallback={() => { restartStates() }}
                bottomElements={
                    <>
                        <MyModalButton
                            style={{
                                width: '8rem', height: '2.5rem', color: colorDef.defButtonAccept, textColor: colorDef.defButtonAcceptText
                            }}
                            displayText="Sí"
                            onClickCallback={() => {
                                fcn_DarPermisosVisulizacionBase(); setModalState(3);
                                setModalText("Contactando con el servidor...")
                            }}
                        />
                        <MyModalButton
                            style={{
                                width: '8rem', height: '2.5rem'
                            }}
                            displayText="No"
                            onClickCallback={() => { restartStates() }}
                        />
                    </>
                }
            />
            else if (ssModalState === 7) return <MyModal
                icon={MyModalIcon.Alert}
                style={{ width: '37rem', height: '16rem', zIndex: 1500 }}
                titleText={"Eliminar Base"}
                middleElements={
                    <span style={{ fontSize: "1.3rem" }}>
                        ¿Desea eliminar de memoria la base "{ssSelectedBase.name}"?
                    </span>

                }
                onCloseCallback={() => { }}
                onOpenCallback={() => { }}
                onCloseButtonCallback={() => { restartStates() }}
                bottomElements={
                    <>
                        <MyModalButton
                            style={{
                                width: '8rem', height: '2.5rem', color: colorDef.defButtonAccept, textColor: colorDef.defButtonAcceptText
                            }}
                            displayText="Sí"
                            onClickCallback={() => { props.onClickTrashCacheBase(); restartStates() }}
                        />
                        <MyModalButton
                            style={{
                                width: '8rem', height: '2.5rem'
                            }}
                            displayText="No"
                            onClickCallback={() => { restartStates() }}
                        />
                    </>
                }
            />
            else if (ssModalState === 8) return <MyModal
            icon={MyModalIcon.Alert}
            style={{ width: '37rem', height: '18rem', zIndex: 1500 }}
            titleText={"Información"}
            middleElements={
                <span style={{ fontSize: "1.3rem", whiteSpace:"pre-line" }}>
                    {ssModalText.split("Link")[0]}
                </span>

            }
            onCloseCallback={() => { }}
            onOpenCallback={() => { }}
            onCloseButtonCallback={() => { restartStates() }}
            bottomElements={
                <>
                    <MyModalButton
                        style={{
                            width: '8rem', height: '2.5rem'
                        }}
                        displayText="Sí"
                        onClickCallback={() => {
                            fcn_BuildBase(true);
                            setModalState(3);
                            setModalText("Contactando con el servidor")
                        }}
                    />
                     <MyModalButton
                        style={{
                            width: '8rem', height: '2.5rem'
                        }}
                        displayText="No"
                        onClickCallback={() => {       
                            setModalState(3);
                            setModalText("Recuerde descargue el fichero de la base antes de reconstruir una base. \n Link de descarga: "+ ssModalText.split("Link:")[1])
                         }}
                    />
                </>
            }
        />
        }
    }



    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "18rem minmax(40rem, 50rem) 1fr",
                width: "100%",
                height: "calc(100% - 60px)",
                gap: '0.7rem',
            }}
        >
            {renderModal()}
            <div style={{ padding: "0.7rem 0.7rem" }}>
                <MyCardHeader>ESTADO</MyCardHeader>
                <MyCardHeader style={{ backgroundColor: colorDef.defMainThemeColor + "44", color: colorDef.defBlackColor2, borderTop: 0 }} > Mis Bases  </MyCardHeader>
                <MyCardBody
                    style={{
                        backgroundColor: 'white',
                        cursor: "default",
                        padding: "0",
                        border: 0,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignContent: "center",
                            alignItems: "center",
                            borderRadius: "0",
                            backgroundColor: colorDef.defSearchCardizqColor,
                            padding: "0 0.7rem",
                            height: "100%",
                            fontSize: "1.1rem",
                        }}>
                        <FaSearch
                            color={colorDef.defWhiteColor}
                            size="1.7rem"
                        />
                        <StyledInput
                            value={ssBuscadorText}
                            placeholder={"Buscar"}
                            onChange={(e) => setBuscadorText(e.target.value)}
                            type="text"
                            style={{
                                border: 0,
                                width: "100%",
                                backgroundColor: "transparent",
                                color: colorDef.defWhiteColor,
                                padding: "0.4rem 0.8rem",
                                borderRadius: colorDef.defBorderRadius
                            }}
                        />
                        <FaTimesCircle
                            color={colorDef.defWhiteColor}
                            size="2rem"
                            onClick={() => setBuscadorText("")}
                            style={{
                                visibility: ssBuscadorText === "" ? "hidden" : "visible",
                                cursor: "pointer"
                            }}
                        />
                    </div>
                </MyCardBody>
                <MyCardBody
                    style={{
                        backgroundColor: ssFiltroSeleccionado === 0 ? colorDef.defSelectedCardizqColor : "",
                        color: ssFiltroSeleccionado === 0 ? 'white' : ""
                    }}
                    onClick={() => setFiltroSeleccionado(0)}
                >
                    <div> Total </div>
                    <div>{getFiltredDB(1).length}</div>
                </MyCardBody>
                <MyCardBody
                    style={{
                        backgroundColor: ssFiltroSeleccionado === 2 ? colorDef.defSelectedCardizqColor : "",
                        color: ssFiltroSeleccionado === 2 ? 'white' : ""
                    }}
                    onClick={() => setFiltroSeleccionado(ssFiltroSeleccionado === 2 ? 0 : 2)}
                >
                    <div> Estructura creada </div>
                    <div>{getFiltredDB(2).length}</div>
                </MyCardBody>
                <MyCardBody
                    style={{
                        backgroundColor: ssFiltroSeleccionado === 3 ? colorDef.defSelectedCardizqColor : "",
                        color: ssFiltroSeleccionado === 3 ? 'white' : ""
                    }}
                    onClick={() => setFiltroSeleccionado(ssFiltroSeleccionado === 3 ? 0 : 3)}
                >
                    <div> En construcción </div>
                    <div>{getFiltredDB(3).length}</div>
                </MyCardBody>
                <MyCardBody
                    style={{
                        backgroundColor: ssFiltroSeleccionado === 4 ? colorDef.defSelectedCardizqColor : "",
                        color: ssFiltroSeleccionado === 4 ? 'white' : ""
                    }}
                    onClick={() => setFiltroSeleccionado(ssFiltroSeleccionado === 4 ? 0 : 4)}
                >
                    <div> Descargando </div>
                    <div>{getFiltredDB(4).length}</div>
                </MyCardBody>
                <MyCardBody
                    style={{
                        backgroundColor: ssFiltroSeleccionado >= 5 && ssFiltroSeleccionado <= 7 ? colorDef.defSelectedCardizqColor : "",
                        color: ssFiltroSeleccionado >= 5 && ssFiltroSeleccionado <= 7 ? 'white' : ""
                    }}
                    onClick={() => setFiltroSeleccionado(ssFiltroSeleccionado >= 5 && ssFiltroSeleccionado <= 7 ? 0 : 5)}
                >
                    <div> Disponible </div>
                    <div>{getFiltredDB(5).length}</div>
                </MyCardBody>
                <MyCardBody
                    style={{
                        backgroundColor: ssFiltroSeleccionado === 6 ? colorDef.defSelectedCardizqColor : "",
                        color: ssFiltroSeleccionado === 6 ? 'white' : ""
                    }}
                    onClick={() => setFiltroSeleccionado(ssFiltroSeleccionado === 6 ? 5 : 6)}
                >
                    <div style={{ marginLeft: "1rem" }}> - Visible </div>
                    <div>{getFiltredDB(6).length}</div>
                </MyCardBody>
                <MyCardBody
                    style={{
                        backgroundColor: ssFiltroSeleccionado === 7 ? colorDef.defSelectedCardizqColor : "",
                        color: ssFiltroSeleccionado === 7 ? 'white' : ""
                    }}
                    onClick={() => setFiltroSeleccionado(ssFiltroSeleccionado === 7 ? 5 : 7)}
                >
                    <div style={{ marginLeft: "1rem" }}> - No visible </div>
                    <div>{getFiltredDB(7).length}</div>
                </MyCardBody>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    maxWidth: "50rem",
                    height: "100%",
                    justifyItems: 'center',
                    maxHeight: "100%",
                    alignItems: 'center',
                    paddingBottom: '1rem',
                    paddingTop: '0.5rem',
                    paddingRight: '0.3rem',
                    gap: '1rem',
                    overflowY: 'scroll'
                }}
            >
                <CustomFieldset
                    style={{
                    }}
                >
                    <CustomLegend
                        style={{

                        }}
                    >
                        {props.catcheBase ? "Base en memoria" : "Nueva base"}
                    </CustomLegend>
                    {
                        !props.isGetCacheBaseSuccess ?
                            <span>Error contactando con el servidor</span>
                            :
                            props.catcheBase ?
                                <InfoDBStructure
                                    id={"c0"}
                                    status={-2}
                                    dbName={props.catcheBase.name[0] === "0" && props.catcheBase.name[1] === ";" ? props.catcheBase.name.slice(2) : props.catcheBase.name}
                                    dbDate={""}
                                    onClickDb={() => changePath("/databases/new")}
                                    buttons={<DatabaseRowR>
                                        <DeactivableTooltipIcon
                                            visible={true}
                                            tooltipKey={"currentBase"}
                                            tooltipText="Editar base"
                                            icon={<MdEdit size={"60%"} />}
                                            backgroundColor={colorDef.defMainThemeColor}
                                            onClickActivatedFunction={() => changePath("/databases/new")}
                                        />
                                        <DeactivableTooltipIcon
                                            visible={true}
                                            tooltipKey={"currentBase"}
                                            tooltipText="Eliminar base"
                                            icon={<FaTrash size={"60%"} />}
                                            onClickActivatedFunction={props.onClickTrashCacheBase}
                                        />
                                    </DatabaseRowR>}
                                />
                                :
                                <ButtonCrearteDB
                                    style={{
                                        backgroundColor: props.catcheBase !== undefined ? colorDef.defGrayLightColor : colorDef.defMainThemeColor,
                                        boxShadow: defShadow,
                                    }}
                                    disabled={props.catcheBase !== undefined}
                                    onClick={() => changePath("/databases/new")}
                                >
                                    <span>Crear Base</span>
                                </ButtonCrearteDB>
                    }
                </CustomFieldset>

                <CustomFieldset
                    style={{
                        overflowY: "scroll",
                        minHeight: '40%',
                        height: "100%",
                    }}
                >
                    <CustomLegend>
                        {(ssFiltroSeleccionado > 0) &&
                            <TooltipNAV title="Filtro: ACTIVO" arrow>
                                <IconFiltroActivo style={{}}
                                    onClick={() => { setFiltroSeleccionado(0); setBuscadorText("") }}
                                >
                                    <FaFilter size={"1rem"}
                                        color={"white"}
                                        style={{ paddingTop: "2px" }}
                                    />
                                </IconFiltroActivo>
                            </TooltipNAV>
                        }
                        {(ssBuscadorText !== "") &&
                            <TooltipNAV title="Busqueda de base: ACTIVO" arrow>
                                <IconFiltroActivo style={{}}
                                    onClick={() => { setFiltroSeleccionado(0); setBuscadorText("") }}
                                >
                                    <FaSearch size={"0.9rem"}
                                        color={"white"}
                                    />
                                </IconFiltroActivo>
                            </TooltipNAV>
                        }
                        Mis Bases
                    </CustomLegend>

                    {!props.isGetDatabaseSuccess ?
                        <span>Error contactando con el servidor</span>
                        :
                        databasesToRender}

                </CustomFieldset>
            </div>
            {ssShowBaseDetails &&
                <div
                    style={{
                        color: colorDef.defBlackColor, boxShadow: defShadow, margin: "0.5rem 0.5rem 0.5rem 0.5rem",
                    }}
                >
                    {ssBaseAllInfo && ssBaseAllInfo.base.length > 0 ?
                        <div
                            style={
                                {
                                    width: "100%", height: "100%",
                                    boxShadow: defShadow,
                                    padding: "1rem",
                                    color: colorDef.defBlackColor,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.5rem'
                                }}
                            onClick={() => props.onClickDatabase(ssBaseAllInfo.id, ssBaseAllInfo.name)}
                        >
                            <div style={{ width: "100%", color: "white", backgroundColor: colorDef.defMainThemeColor, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: "0.75rem", borderRadius: "0.3rem" }}>
                                <span style={{ fontWeight: "bolder" }}>{ssBaseAllInfo.name}</span>
                                <span style={{ fontWeight: "lighter" }}>{new Date(ssBaseAllInfo.createdAt).toLocaleDateString()}</span>
                            </div>
                            <TreeView
                                expanded={ssBaseAllInfo.base.filter((pck: cPackFE) => pck.linkTO === "").map((pckA) => pckA.idPack)}
                            >
                                {ssBaseAllInfo.base.filter((pck: cPackFE) => pck.linkTO === "").map((pck) => {
                                    return <CustomTreeContainer
                                        pack={pck}
                                        filters={ssBaseAllInfo.base.filter((pckList) => pckList.linkTO === pck.idPack)}
                                        setViewScreenCallback={(screenRef) => { }}
                                        hideActions
                                        preVisualization
                                    />
                                }
                                )}
                            </TreeView>
                        </div>
                        :
                        <div style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            fontSize: "2rem",
                            gap: "2rem",
                            padding: "2rem"
                        }}>
                            {ssBaseAllInfo ?
                                <>
                                    <FaBan size={"8rem"} color={colorDef.defRedColor} />
                                    <span style={{ color: colorDef.defRedColor, }}>Base NO disponible</span>

                                </>
                                :
                                <>
                                    <FaDatabase size={"8rem"} color={colorDef.defBlackColor2} />
                                    <span style={{ color: colorDef.defBlackColor2, }}>Previsualización</span>
                                </>
                            }
                        </div>
                    }
                </div>
            }
        </div>
    )
}


/************************************************************************************** */
// CARD DB
/************************************************************************************** */
const CardDB = styled.div`
    width: 100%;
    /* display: grid; */
    display: flex;
    flex-direction: row;
    /* grid-template-columns: 1fr 5rem 1fr; */
    padding: 1rem 1.5rem;
    border: 2px solid rgba(0, 0, 0, 0.15);
    transition: 0.1s;    
    animation-timing-function: ease-in-out;
    justify-content:center;
    justify-items:center;
    align-items: center;
    cursor: pointer;

    gap: 1rem;

    &:hover{
        box-shadow: rgba(0, 0, 0, 0.6) 0 1px 10px;
        transform: scale(1.01);
        transition: 0.1s;
        animation-timing-function: ease-in-out;
        background-color: ${colorDef.defCardDBHoverColor}
    }
`


interface iPropsInfoDBstructure {
    id: string;
    status: number;
    dbName: string;
    dbDate: string;
    onClickDb: () => void;
    buttons: ReactElement;
    selected?: boolean;
}
const InfoDBStructure = (props: iPropsInfoDBstructure) => {

    const getStatus = () => {
        switch (props.status) {
            case -2:
                return { color: colorDef.defStatusCreandoEstruc, text: "Definición de la base NO finalizada" };
            case 0:
                return { color: colorDef.defStatusEstrucRdy, text: "Creación de la estructura de la base finalizada" };
            case 1:
                return { color: colorDef.defStatusRellenando, text: "Constuyendo base..." };
            case 2:
                return { color: colorDef.defStatusCreada, text: "Base Disponible" };
            case 3:
                return { color: colorDef.defStatusDescargando, text: "Descargando..." };
            case 4:
                return { color: colorDef.defStatusCreada, text: "Base Disponible/Visible" };
            default:
                return { color: colorDef.defStatusEstrucRdy, text: "Error?" };
        }
    }

    const statusInfo = getStatus()
    return <CardDB
        key={props.id}
        onClick={props.onClickDb}
        style={{
            color: colorDef.defMainThemeColor,
            borderTop: props.id.split(';')[0].slice(1, undefined) === "0" ? "" : "0",
            backgroundColor: props.selected ? colorDef.defCardDBHoverColor : "",
        }}
    >
        <div style={{ display: "grid", gridTemplateColumns: "2rem 1fr", justifyContent: "flex-start", alignItems: "center", gap: "0.5rem", justifySelf: "flex-start" }}>
            <TooltipNAV title={"Estado: " + statusInfo.text} arrow>
                <div style={{ justifySelf: "center", }}>
                    {
                        props.status === 1 ?
                            <UseAnimations animation={edit} autoplay={true} speed={0.5} loop={true} strokeColor={colorDef.defIconAnimations} size={30} />
                            : props.status === 3 ?
                                <UseAnimations animation={arrowDownCircle} autoplay={true} speed={0.5} loop={true} strokeColor={colorDef.defIconAnimations} size={30} />
                                :
                                props.status === 4 ?
                                    <div style={{ display: "flex", borderRadius: "50%", justifyContent: "center", alignItems: "center", backgroundColor: statusInfo.color, height: "1.1rem", width: "1.1rem" }}>
                                        <FaEye size={"70%"} color={"white"} />
                                    </div>
                                    :
                                    <FaCircle size={"1.1rem"} color={statusInfo.color} />
                    }
                </div>
            </TooltipNAV >
            <span style={{ justifySelf: "flex-start", fontWeight: 900, fontSize: "1.3rem", color: props.status === -2 ? colorDef.defBlackColor : "" }}>
                {props.dbName}
            </span>
        </div>
        <span style={{ marginLeft: "auto", fontWeight: "lighter", paddingRight:'1rem' }}>
            {props.dbDate === "" ? "" : new Date(props.dbDate).toLocaleDateString()}
        </span>
        <div style={{ justifySelf: "flex-end" }}>
            {props.buttons}
        </div>
    </CardDB>
}
export default AvailableDatabases;



