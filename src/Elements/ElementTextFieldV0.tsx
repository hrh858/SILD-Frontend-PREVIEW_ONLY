import React, { useState } from 'react'
import { defBlackColor, defBorderRadius, defMainThemeColor, defWhiteColor,defBackGSubComp } from '../Shared/Colors'
import { defShadow } from '../Shared/Shadows'
import {TooltipNAV} from './ElementStyledTooltip';
import { BiText } from 'react-icons/bi'
import TextField from '@material-ui/core/TextField'; //npm install @material-ui/core


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
        if (validateInput(newText)) {
            props.onChange(newText)
            setText(newText)
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
            {props.leftText?      
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
            /> 

        </div>
    )
}

export default ElementTextField
