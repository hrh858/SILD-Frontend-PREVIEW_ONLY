import React, { useState } from 'react'
import { FaSearch, FaTimesCircle } from 'react-icons/fa'
import { defSeachBackground, defBorderRadius,  defWhiteColor } from '../Shared/Colors'
import styled from 'styled-components'


interface Props {
    onChange: (text: string) => void
    backgroundColor?: string;
    borderRadius?: string;

}

export default function ElementSearchBoxV2(props: Props) {
    const [text, setText] = useState<string>("")

    const onChange = (newText: string) => {
            props.onChange(newText)
            setText(newText)
    }

    const backGrColor = props.backgroundColor? props.backgroundColor:defSeachBackground;
    return (       
            <div
            style={{
                display: "flex",
                alignContent:"center",
                alignItems:"center",
                borderRadius: props.borderRadius?props.borderRadius: "1.5rem",
                backgroundColor: backGrColor,
                padding:"0 0.5rem",
                height: "100%",
            }}>
            <FaSearch
                color={defWhiteColor}
                size="1.7rem"
            />    
            <StyledInput
                value={text}
                placeholder = {"Buscar"}
                onChange={(e) => onChange(e.target.value)}
                type="text"
                style={{
                    border: 0,
                    width: "100%",
                    backgroundColor: "transparent",
                    color: defWhiteColor,
                    padding: "0.4rem 0.8rem",
                    borderRadius: defBorderRadius
                }}
            />                        
            <FaTimesCircle
                color={defWhiteColor} 
                size="2rem"                 
                onClick={()=>onChange("")}
                style={{visibility:text===""?"hidden":"visible", 
                        cursor:"pointer"}}
            />
            </div>        
    )
}



const StyledInput = styled.input`
  ::placeholder {
        color: lightgray,
  }
  ::-webkit-input-placeholder {
    color: lightgray;
  }
  :-ms-input-placeholder {
     color: lightgray;
  }
`
