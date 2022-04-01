import React, { ReactElement, useEffect } from 'react'
import styled from "styled-components";
import { FaTimesCircle, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa"

//SHARE
import * as  colorDef from '../Shared/Colors'
import { defShadow } from '../Shared/Shadows'


interface DivCloseButtonProps {
    bgColor?:string
}

const DivCloseButton = styled.div<DivCloseButtonProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.3rem;
    height: 1.3rem;
    color: white;
    background-color:${({bgColor})=>bgColor?bgColor:colorDef.defMainThemeColor};
    align-items: center;
    transition: 0.1s;
    animation-timing-function: ease-in-out;
    position:absolute;
    top: 5px;
    right:5px;

    &:hover{
        transform: scale(1.15);
        transition: 0.1s;
        animation-timing-function: ease-in-out;
    }
`

const MyButton = styled.button`
    border: 0;
    margin: 0;
    border-radius: 0.2rem;
    box-shadow: ${defShadow};
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.1s;
    animation-timing-function: ease-in-out;

    &:hover{       
        transform: scale(1.15);
        transition: 0.1s;
        animation-timing-function: ease-in-out;
    }
`

export enum MyModalIcon {
    Alert,
    Info,
    None
}

interface MyModalProps {
    showOverEverything?: boolean
    style?: {
        width?: string
        height?: string
        zIndex?: number
        textColor?: string
        fontSize?: string
        maxWidth?:string
    }
    removeAltert?: boolean
    titleText?: string
    icon?: MyModalIcon
    topColor?: string
    middleElements: ReactElement
    bottomElements: ReactElement<MyModalButtonProps> | ReactElement<MyModalButtonProps>[]
    noTop?: boolean
    // displayText: string
    onOpenCallback?: () => void
    onCloseCallback?: () => void
    onCloseButtonCallback?: () => void
}

export function MyModal(props: MyModalProps) {
    useEffect(() => {
        if (props.onOpenCallback) props.onOpenCallback()
        return () => {
            if (props.onCloseCallback) props.onCloseCallback()
        }
    }, [])

    return (
        <div style={{
            position: "absolute",
            width: "100vw",
            height: props.showOverEverything ? "100%" : "calc(100% - 60px)", // 60px corresponden a la Navbar
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backdropFilter: "blur(1rem) brightness(70%)",
            zIndex: props.style && props.style.zIndex ? props.style.zIndex : 1500
        }}>
            <div style={{
                width: props.style && props.style.width ? props.style.width : "40rem",
                minHeight: props.style && props.style.height ? props.style.height : "15rem",
                backgroundColor: colorDef.defWhiteColor,
                zIndex: props.style && props.style.zIndex ? props.style.zIndex : 1500,
                display: "grid",
                gridTemplateRows: !props.noTop ? "5rem 1fr 5rem" : "1fr 5rem",
                maxWidth:props.style && props.style.maxWidth?props.style.maxWidth:"calc(100% - 4rem)"
            }}>
                { !props.noTop ? <div
                    style={{
                        color: "white",
                        backgroundColor: !props.topColor ? colorDef.defMainThemeColor : props.topColor,
                        // backgroundColor: !props.topColor ? colorDef.defRedColor : props.topColor,
                        fontSize: "2rem",
                        fontWeight: 600,
                        display: "inline-flex",
                        justifyContent: "flex-start",
                        alignItems: 'center',
                        gap: '1.5rem',
                        padding: "0rem 1.5rem",
                        minWidth: '100%',
                        height: '100%',
                        position: 'relative',
                    }}

                >
                    {props.onCloseButtonCallback &&
                        <DivCloseButton  bgColor = {props.topColor} onClick={props.onCloseButtonCallback}>
                            <FaTimesCircle style={{ cursor: "pointer" }} />
                        </DivCloseButton>
                    }
                    {
                        props.icon === MyModalIcon.None ? "" :
                        props.icon === MyModalIcon.Alert ? <FaExclamationTriangle style={{ color: "white" }} /> :
                        <FaInfoCircle style= {{ color: "white" }} />
                    }
                    <span>{props.titleText ? props.titleText : "ALERTA"}</span>
                </div> : null}
                <div style={{
                    color: props.style && props.style.textColor ? props.style.textColor : colorDef.defBlackColor,
                    fontSize: props.style && props.style.fontSize ? props.style.fontSize : "1.2em",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: 'center',
                    borderBottom: "1px solid " + colorDef.defLineSeparatorColor,
                    padding: "1rem 0rem",
                    margin: "0 1rem",
                    maxWidth: '100%',
                    gap: "0.7rem",
                    // width: "100%"
                }}>
                    {props.middleElements}
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    width: "100%"
                }}>
                    {props.bottomElements}
                </div>
            </div>
        </div>
    )
}

interface MyModalButtonProps {
    style?: {
        width?: string
        height?: string
        color?: string
        textColor?: string
    }
    displayText: string
    onClickCallback: () => void
}

export function MyModalButton(props: MyModalButtonProps) {
    return (
        <MyButton style={{
            width: props.style && props.style.width ? props.style.width : "8rem",
            height: props.style && props.style.height ? props.style.height : "2.5rem",
            backgroundColor: props.style && props.style.color ? props.style.color : colorDef.defButtonDefaultColor,
            color: props.style && props.style.textColor ? props.style.textColor : "black",
        }}
            onClick={props.onClickCallback}>
            {props.displayText}
        </MyButton>
    )
}
