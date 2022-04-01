import React from 'react'
import {TooltipNAV} from '../../Elements/ElementStyledTooltip';
import { defMainThemeColor, } from '../../Shared/Colors'

interface Props {
    hoverText:string,
    name:string
}

function ElementText(props: Props) {
    return  <TooltipNAV
                title={props.name}
                arrow={true}
            >
                <div style={{
                    backgroundColor: "white",
                    color: defMainThemeColor,
                    border:"2px solid "+defMainThemeColor ,
                    fontWeight: "bold",
                    boxShadow: "rgb(60 64 67 / 30%) 0px 1px 2px 0px, rgb(60 64 67 / 15%) 0px 2px 6px 2px",
                    borderRadius: "1.1rem",
                    fontSize: "0.9em",
                    height: "2.2rem",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    display:"flex",
                    justifyContent:"center",
                    justifyItems:"center",
                    alignContent:"center",
                    alignItems:"center",
                    cursor: 'default',
                }}>
                    <span style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        padding:"0 0.5rem"
                    }}>
                        {props.name}
                    </span>
                </div>
            </TooltipNAV>

}

export default ElementText
