import React from "react"

// MY COMPONENTS
import RenderProgress from '../ComponentsProgressDisplayers/RenderProgressScreenOutputs'

// MODELS
import { SchemaProgressScreen } from "../Models/cPackFE"

//SHARE
import { defBlackColor } from "../Shared/Colors"


export default function renderSelectedScreen(screenToShow: SchemaProgressScreen, componentIdxToShow?: number) {
    if (screenToShow && componentIdxToShow && screenToShow.outputs[componentIdxToShow]) {
        return <RenderProgress
                progressOutput={[screenToShow.outputs[componentIdxToShow]]}
            /> 
    } 
    else if (screenToShow) {
        if (screenToShow.outputs.length > 0) {
            return  <RenderProgress
                progressOutput={[screenToShow.outputs[0]]}
            /> 
        } else {
            return (
                <div style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: defBlackColor
                }}>
                    <span>
                        Esta pantalla no tiene salidas que mostrar
                    </span>
                </div>
            )
        }
    }
}