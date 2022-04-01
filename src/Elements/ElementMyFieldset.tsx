import React, { ReactElement } from 'react'
import { defBlackColor, defBorderRadius, defMainThemeColor} from '../Shared/Colors'
import { TooltipNAV } from './ElementStyledTooltip';

import styled from 'styled-components'

const CustomFieldset = styled.fieldset`
    border: 2px solid ${defMainThemeColor};
    border-radius: ${defBorderRadius};
    margin-bottom: 0.35rem;
`

const CustomLegend = styled.legend`
    color: ${defBlackColor};
    /* color: black; */
    font-weight: bold;
    width: auto;
    font-size:0.7rem;
    padding:0rem 0.2rem;
    text-align: right;
    margin-right: 1.5rem;
    margin-bottom: 0px;
    max-width: 10rem;
    /* max-width: 70%; */
    overflow: hidden;
    white-space: nowrap;
    text-overflow:  ellipsis;
    cursor: default;
    
`


interface Props {
    legendFontSize?:string;
    legendText?: string
    children: ReactElement
}


function ElementMyFieldset(props: Props) {
    const getLegendText= ()=>{
        return props.legendText?props.legendText:'unknown'
    }
   
    return (     
            <CustomFieldset
                style={{
                    marginBottom:props.legendFontSize?"calc("+props.legendFontSize+"/2)":"",
                }}
            >  
                <TooltipNAV
                    title={getLegendText()}
                    arrow={true}
                    placement={'top'}

                >   
                    <CustomLegend
                        style={{
                            fontSize:props.legendFontSize?props.legendFontSize:"",
                        }}
                        >{getLegendText()}
                    </CustomLegend>
                </TooltipNAV>

                {props.children}

            </CustomFieldset> 
    )
}

export default ElementMyFieldset
