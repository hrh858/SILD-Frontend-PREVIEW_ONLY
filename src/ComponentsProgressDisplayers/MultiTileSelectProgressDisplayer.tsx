
import React from 'react'
import { Typography } from '@material-ui/core'
import ElementAccordion from './ElementDisplay/ElementAccordion'

import { defMainThemeColor, defWhiteColor } from '../Shared/Colors'
import ElementText from './ElementDisplay/ElementText'

interface Props {
    output: [{ id: string, name: string, max: number, varSelected: [{ id: string, name: string }] }]
    outputKey: string
}

export default function MultiTileSelectProgressDisplayer(props: Props) {
    return (
        <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            gap: "0.7rem"
        }}>
            {
            props.output.map((out, idx) => {
                return (<ElementAccordion
                    id ={idx.toString()}                    
                    summaryElement={
                        <div style={{display:"flex", justifyContent:"space-between", width:"100%",height:"100%",alignItems:"center"}}>
                            <Typography style={{
                                fontWeight: "bold"
                            }}>
                                {out.name}
                            </Typography>
                            {out.varSelected.length === out.max ?
                                <div style={{ backgroundColor: defMainThemeColor, borderRadius: "1rem",  width: "5rem", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <span style={{ color: defWhiteColor, fontSize: "0.9em" }}>Todo</span>
                                </div>
                                : null}
                        
                        </div>
                    }
                    detailElement={
                        out.varSelected.map((varSel, idx) => {
                            return (
                                <ElementText
                                    name= {varSel.name}
                                    hoverText ={varSel.name}
                                    />
                            )
                        })
                    }

                />
                )
            })}
        </div>
    )
}
