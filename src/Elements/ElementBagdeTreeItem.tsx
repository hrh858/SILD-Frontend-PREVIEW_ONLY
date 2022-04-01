import React from 'react'
import  * as colorDef from '../Shared/Colors'
import { GroupMode } from '../Models/cPackFE'
import {TooltipNAV} from './ElementStyledTooltip';

// COLORS
function getLetter(type: string) {
    switch (type) {
        case GroupMode.Master:
            return 'M'
        case GroupMode.Associated:
            return 'A'
        case GroupMode.Filter:
            return 'F'
        case "Screen":
            return 'P'
        case "Component":
            return 'C'
        case "info":
            return 'i'    
        default:
            return 'E'
    }
}

function getColor(type: string) {
    switch (type) {
        case GroupMode.Master:
            return colorDef.defMasterColor
        case GroupMode.Associated:
            return colorDef.defAsociadaColor
        case GroupMode.Filter:
            return colorDef.defFilterColor
        case "Screen":
            return colorDef.defFaintGreenColor
        case "Component":
            return colorDef.defComponentColor
            case "info":
                return colorDef.defInfoIcon        
        default:
            return "black"
    }
}



function getHoverText(type: string) {
    if ((Object.values(GroupMode) as string[]).includes(type)) {
        return type
    }
    return ""
}

//***********************************************************************************/
// CUSTOM BADGE
//***********************************************************************************/
interface Props {
    type: string;
    size: string;
    desaturate?: boolean
}

export function ElementBagdeTreeItem(props: Props) {
    
    return  <TooltipNAV
            title={getHoverText(props.type)}
            arrow={true}
            placement={'top'}
        >
    <div style={{
            minWidth: props.size,
            minHeight: props.size,
            borderRadius: "calc("+props.size+" / 2)",
            backgroundColor: props.desaturate ? "gray" : getColor(props.type),
            color: 'white',
            fontSize: "calc("+props.size+" *0.632 )",
            // fontWeight: 'bold',
            fontWeight: 650,
            display: "inline-flex",
            alignItems: "flex-end",
            alignContent: "center",
            justifyContent: "center",
            justifyItems: 'center',
            // paddingTop: '0.06rem',         
            cursor:'default',

        }}>
            {getLetter(props.type)}
        </div>
        </TooltipNAV>
    }
