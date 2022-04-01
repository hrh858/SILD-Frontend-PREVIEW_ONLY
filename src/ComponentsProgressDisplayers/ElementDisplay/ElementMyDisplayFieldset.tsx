import React, { ReactElement } from 'react'
import { defBlackColor, defBorderRadius, defMainThemeColor} from '../../Shared/Colors'
import { TooltipNAV } from '../../Elements/ElementStyledTooltip';

import styled from 'styled-components'

const CustomFieldset = styled.fieldset`
    border: 2px solid ${defMainThemeColor};
    border-radius: ${defBorderRadius};
    margin-bottom: 0.35rem;
`

const CustomLegend = styled.legend`
    color: ${defBlackColor};
    font-weight: bold;
    width: auto;
    font-size:0.7rem;
    padding:0rem 0.2rem;
    text-align: right;
    margin-right: 1.5rem;
    margin-bottom: 0px;
    max-width: 10rem;
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
                    borderRadius:"30rem",
                    boxShadow: "rgb(60 64 67 / 30%) 0px 1px 2px 0px, rgb(60 64 67 / 15%) 0px 2px 6px 2px",
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
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: defMainThemeColor,
                        padding: "0rem 0.8rem 0.5rem 0.5rem",
                        
                    }}
                >
                        {props.children}
                </div>
               

            </CustomFieldset> 
    )
}

export default ElementMyFieldset
