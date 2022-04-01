import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { TreeView } from '@material-ui/lab'
import styled from 'styled-components'

// MY COMPONENTS -  ELEMENTS
import { CustomTreeContainer } from '../../zComponents/CustomTree'
import renderSelectedScreen from '../../zComponents/RenderScreenToShow'
import Navbar from '../../zComponents/Navbar'

// MODELS
import { MyModal, MyModalButton, MyModalIcon } from "../../zComponents/MyModal"
import { cPackFE } from '../../Models/cPackFE'

// SHARE
import { Loader } from '../../Shared/GlobalStyle'
import { defBlackColor, defGrayColor, defMainThemeColor, defWhiteColor } from '../../Shared/Colors'
import { defScrollBar } from '../../Shared/Colors'
import { defShadow } from '../../Shared/Shadows'

// API
import { endD2_getDatabase, endD3_loadBaseInServerCache, endDB6_searchInMyBase } from '../../Services/api'
import QueryNHCbyID from './QueryNHCbyID';



const ScrollDiv = styled.div`
    overflow-y: scroll;
    height: 100%;
    &::-webkit-scrollbar {
        width: 0.35rem !important ; 
        display: flex;
        padding-bottom: 5rem;
    }
    &::-webkit-scrollbar-thumb  {
        background: ${defScrollBar}; 
        border:none ;
        border-radius: 0.3rem;
    }
`



export default function SeeDatabasePage2() {

    const history = useHistory();
    const [ssBaseName, setBaseName] = useState<string>("")
    const [ssBaseStatus, setBaseStatus] = useState<number>(-1)
    const [ssBaseCreatedAt, setBaseCreatedAt] = useState<string>("")
    const [ssBase, setBase] = useState<cPackFE[]>([])
    const [ssScreenToShowRef, setScreenToShowRef] = useState<{ idPack: string, idScreen: string, idxComp: number }>() // {idPack, idScreen, idComp}
    const [ssModalState, setModalState] = useState<number>(0)
    const databaseId = useRef<string>()

    useEffect(() => {
        let aux = history.location.pathname.split('/')
        databaseId.current = aux[aux.length - 1]
        endD2_getDatabase(databaseId.current).then((res) => {
            if (res.success <= -1) setModalState(2);
            else {
                const database = res.data;
                setBase(database.packs)
                setBaseName(database.baseName)
                setBaseCreatedAt(database.createdAt)
                setBaseStatus(database.status)
            }
        })
    }, [])

    function isBaseEditable() {
        if (ssBaseStatus === 0 || ssBaseStatus === 2 || ssBaseStatus === 4) return true
        return false;
    }

    function renderRightSide() {
        return (
            <TreeView >
                {ssBase.filter((pck: cPackFE) => pck.linkTO === "").map((pck) => {
                    return <CustomTreeContainer
                        pack={pck}
                        filters={ssBase.filter((pckList) => pckList.linkTO === pck.idPack)}
                        setViewScreenCallback={(screenRef) => { setScreenToShowRef(screenRef) }}
                        hideActions
                    />
                }
                )}
            </TreeView>
        )
    }
    function renderRighVisualizacionSeeDataBase() {
        if (ssScreenToShowRef) {
            const scrnToRender = ssBase?.find((pck: cPackFE) => pck.idPack === ssScreenToShowRef.idPack)?.screens.find((scn) => scn.screenId === ssScreenToShowRef.idScreen);
            if (scrnToRender) return (
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    height: '100%',
                }}>
                    <span style={{
                        width: "100%",
                        backgroundColor: defMainThemeColor,
                        color: defWhiteColor,
                        fontSize: "1.8em",
                        borderRadius: "0.4rem",
                        padding: "0.4rem"
                    }}>{scrnToRender.screenTitle}</span>
                    {renderSelectedScreen(scrnToRender, ssScreenToShowRef.idxComp === -1 ? undefined : ssScreenToShowRef.idxComp)}
                </div>
            )
        }
        return null
    }


    async function goToEditMode() {
        let aux = history.location.pathname.split('/')
        let databaseName = aux[aux.length - 1]
        endD3_loadBaseInServerCache(databaseName).then((response) => {
            if (response.success === 1) history.push("/databases/edit/" + databaseName)
            else setModalState(1)
        })
    }

    function renderModal() {
        if (ssModalState > 0) {
            if (ssModalState === 1) return <MyModal
                icon={MyModalIcon.Alert}
                style={{ width: '37rem', height: '16rem', zIndex: 1500 }}
                middleElements={
                    <span style={{ fontSize: "1.3rem" }}>Elimine la "Base en desarrollo" para poder editar una nueva base</span>
                }
                onCloseCallback={() => { }}
                onOpenCallback={() => { }}
                bottomElements={
                    <MyModalButton
                        style={{
                            width: '8rem', height: '2.5rem'
                        }}
                        displayText="Cerrar"
                        onClickCallback={() => { setModalState(0) }}
                    />
                }
            />
            if (ssModalState === 2) return <MyModal
                icon={MyModalIcon.Alert}
                style={{ width: '37rem', height: '16rem', zIndex: 1500 }}
                middleElements={
                    <span style={{ fontSize: "1.3rem" }}>ERROR. No se ha podido cargar la base. Póngase en contacto con los desarrolladores</span>
                }
                onCloseCallback={() => { }}
                onOpenCallback={() => { }}
                bottomElements={
                    <MyModalButton
                        style={{
                            width: '8rem', height: '2.5rem'
                        }}
                        displayText="Cerrar"
                        onClickCallback={() => {
                            history.push("/databases")
                        }}
                    />
                }
            />
        }
    }

    return (
        <div>
            {renderModal()}
            <Navbar />
            {
                ssBase && ssBase.length > 0 ?
                    <div style={{
                        width: "100%",
                        height: "calc(100vh - 60px)",
                        display: "flex",
                        flexDirection: "row",
                        padding: "1rem",
                        gap: "1.5rem"
                    }}>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "35%",
                            height: "100%",
                            gap: "1rem"
                        }}>
                            <div style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "1rem",
                                boxShadow: defShadow,
                                padding: "1rem",
                                color: defBlackColor,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem',
                            }}>
                                <div style={{ width: "100%", color: "white", backgroundColor: defMainThemeColor, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: "0.75rem", borderRadius: "0.3rem" }}>
                                    <span style={{ fontWeight: "bolder" }}>{ssBaseName}</span>
                                    <span style={{ fontWeight: "lighter" }}>{new Date(ssBaseCreatedAt).toLocaleDateString()}</span>
                                </div>
                                <ScrollDiv>
                                    {renderRightSide()}
                                </ScrollDiv>
                                <button style={{
                                    width: "50%",
                                    height: "3rem",
                                    borderRadius: "1rem",
                                    backgroundColor: !isBaseEditable() ? defGrayColor : defMainThemeColor,
                                    color: defWhiteColor,
                                    border: 0,
                                    boxShadow: defShadow,
                                    alignSelf: 'center'

                                }}
                                    disabled={!isBaseEditable()}
                                    onClick={goToEditMode}
                                >
                                    <span>Editar base</span>
                                </button>
                            </div>

                            {(ssBaseStatus === 2 || ssBaseStatus === 4)&&
                                <div style={{
                                    width: "100%",
                                    // height: "13rem",
                                    borderRadius: "1rem",
                                    boxShadow: defShadow,
                                    padding: "1rem"
                                }}>
                                    <QueryNHCbyID
                                        databaseId={databaseId.current}
                                        canSearch
                                    />
                                </div>
                            }
                        </div>
                        <div style={{
                            width: "calc(100% - 35%)",
                            height: "100%",
                            borderRadius: "1rem",
                            boxShadow: defShadow,
                            padding: "1rem"
                        }}>
                            {
                                ssScreenToShowRef ?
                                    renderRighVisualizacionSeeDataBase()
                                    :
                                    <div style={{
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: defBlackColor
                                    }}>
                                        <span>
                                            Esta zona mostrará el contenido al hacer click en una pantalla final en la parte izquierda.
                                        </span>
                                    </div>
                            }
                        </div>
                    </div>
                    :
                    <div style={{
                        width: "100%",
                        height: "calc(100vh - 60px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Loader style={{
                            width: "7rem",
                            height: "7rem"
                        }} />
                    </div>
            }
        </div >
    )
}
