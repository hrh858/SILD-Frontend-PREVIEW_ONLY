import React, {  useState } from 'react'
import { defBorderRadius, defMainThemeColor } from '../Shared/Colors'
import styled from 'styled-components'

interface Props {
    text: string;
    defaultInput: string;
    inputType?: string | null
    width?: string 
    height?: string

    // canBeEmpty?: boolean
    onChange: (number: string, valid:boolean) => void
}

interface TextFieldProps {
    valid:boolean
}


const TextFieldCustom = styled.input<TextFieldProps>`
    border: ${({valid}) => (valid  ? "2px solid" + defMainThemeColor : "2px solid red")};
    color: ${defMainThemeColor};
    padding: ${"0.3rem 0.8rem"};
    border-radius: ${defBorderRadius};
    width: ${({width}) => (width === undefined ? "unset" : width)};
    height: ${({height}) => (height === undefined ? "unset" : height)};

`;


export default function ElementTextInput(props:Props) {
    
    // const [valid, setValid] = useState<boolean>(props.canBeEmpty ? true: false);
    let regex:RegExp;

    switch(props.inputType){
        case 'float':
            regex = /^[+-]?((\d+(\.\d*)?)|(\.\d+))$/
            break

        case 'alphabetic':
            regex = /^[A-Za-z]+$/
            break

        case 'alphanumeric':
            regex = /^[a-zA-Z0-9]*$/
            break
        
        case 'int':
            regex = /^[-+]?\d+$/
            break

        default:
            regex = /.*/
    }

    const [text, setText] = useState<string>(props.defaultInput)
    const [valid, setValid] = useState<boolean>(regex.test(props.defaultInput));

    // if (props.canBeEmpty) {
    //     regex = RegExp(regex.source + /$/.source);
    // }

    const onChange = (newText: string) => {
        let newValid = regex.test(newText)
        props.onChange(newText, newValid)
        setValid(newValid)
        setText(newText)
    }


    return (
        <div style={{display:'flex',gap:'10px',
                justifyContent: 'center',
                justifyItems: 'center',
                alignItems: 'center',
                }}>
            <span style={{color:'black',minWidth:"3rem",textAlign:"right"}}>{props.text}</span> 
            <TextFieldCustom
                valid={valid} 
                width={props.width} 
                height={props.height}
                type='text' 
                value={text} 
                onChange={(e)=>onChange(e.target.value)} 
            />
        </div>
    )
}