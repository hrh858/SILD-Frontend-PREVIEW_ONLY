import React, { useState } from 'react'
import { defBlackColor, defBorderRadius, defMainThemeColor, defWhiteColor,defBackGSubComp } from '../Shared/Colors'
import { defShadow } from '../Shared/Shadows'
import {TooltipNAV} from './ElementStyledTooltip';
import { BiText } from 'react-icons/bi'
import TextField from '@material-ui/core/TextField'; //npm install @material-ui/core

import ElementMyFieldset from './ElementMyFieldset'
import styled from 'styled-components'

import {fcn_sanitizeStringAlphanumeric} from '../Services/auxFunctions'

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
`


interface Props {
    defaultText: string
    leftText?: string
    maxLenght: number | null
    negColor?:boolean
    onChange: (text: string) => void
}


function ElementTextField(props: Props) {
    const [text, setText] = useState<string>(props.defaultText)
    function validateInput(input: string): boolean {
        let isValid = true
        if (props.maxLenght && input.length > props.maxLenght) isValid = false
        return isValid
    }
    const onChange = (newText: string) => {
        const sanText = fcn_sanitizeStringAlphanumeric(newText);
        if (validateInput(sanText)) {
            props.onChange(sanText)
            setText(sanText)
        }
    }
    return (
        <div style={{
            height: "3rem",
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
            justifyContent: "center"
        }}>
            {/* OPCIÓN 1 */}
            {/* {props.leftText?      
            <TooltipNAV title={props.leftText} arrow={true} placement={'bottom'} >   
            <div style={{
                color:'black',
                width: "8rem",
                maxWidth: "8rem",
                minWidth: "8rem",   

                // backgroundColor:defBackGSubComp,
                border: "2px solid lightgray",

                fontWeight: 'bold', 
                height: "3rem", 
                // display:"block",
                // alignItems: "center",
                // justifyContent: "center"
                display: "inline-flex",alignItems: "center",
                borderRadius:"0.5rem",
                justifyContent: "center",
                boxShadow: defShadow,
                padding: '0 0.6rem',
                marginRight:"1rem",
                cursor: 'default',
                }}>                       
                    <span style={{   overflow: "hidden",whiteSpace: "nowrap",textOverflow:"ellipsis", }}>
                        {props.leftText} 
                    </span>
                     
            </div>    
            </TooltipNAV>        
            :null
            }
            
            <BiText
                color={defBlackColor}
                size="2rem"
            />     
            <input
                value={text}
                onChange={(e) => onChange(e.target.value)}
                type="text"
                style={{
                    // border: 0,
                    width: "100%",
                    backgroundColor: props.negColor !==undefined && props.negColor ===true ? defWhiteColor:defMainThemeColor,
                    color: props.negColor !==undefined && props.negColor ===true ? defMainThemeColor:defWhiteColor,
                    padding: "0.4rem 0.8rem",
                    borderRadius: defBorderRadius,
                    border:props.negColor !==undefined && props.negColor ===true ? "2px solid "+ defMainThemeColor:0,
                }}
            />   */}
            {/* OPCIÓN 2 */}
            <BiText
                color={defBlackColor}
                size="1.5rem"
            />   
            <ElementMyFieldset
                legendFontSize = {'0.8rem'}
                legendText={props.leftText?props.leftText:'unknown'}
                >                  
                <input
                    value={text}
                    onChange={(e) => onChange(e.target.value)}
                    type="text"
                    style={{
                        // border: 0,
                        width: "90%",
                        backgroundColor: props.negColor !==undefined && props.negColor ===true ? defWhiteColor:defMainThemeColor,
                        color: props.negColor !==undefined && props.negColor ===true ? defMainThemeColor:defWhiteColor,
                        // padding: "0.4rem 0.8rem",
                        padding: "0rem 0.8rem 0.5rem 0rem",
                        // borderRadius: defBorderRadius,
                        // border:props.negColor !==undefined && props.negColor ===true ? "2px solid "+ defMainThemeColor:0,
                        border:0,                
                        // paddingBottom:'0.7rem',
                    }}
                />                 
            </ElementMyFieldset>           
        </div>
    )
}

export default ElementTextField
