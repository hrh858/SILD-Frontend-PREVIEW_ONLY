import { green } from '@material-ui/core/colors'
import React, { useState } from 'react'
import { FaSearch, FaTimesCircle } from 'react-icons/fa'
import { defBlackColor, defBorderRadius, defMainThemeColor, defWhiteColor } from '../Shared/Colors'
import styled from 'styled-components'


interface Props {
    onChange: (text: string) => void
}

export default function ElementSearchBoxV2(props: Props) {
    const [text, setText] = useState<string>("")

    const onChange = (newText: string) => {
            props.onChange(newText)
            setText(newText)
    }

    return (
        <div style={{
            height: "3rem",
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <FaSearch
                color={defBlackColor}
                size="1.2rem"
            />

            {/* <StyledInput
                value={text}
                placeholder = {"Buscar"}
                onChange={(e) => onChange(e.target.value)}
                type="text"
                style={{
                    border: 0,
                    width: "100%",
                    backgroundColor: defMainThemeColor,
                    color: defWhiteColor,
                    padding: "0.4rem 0.8rem",
                    borderRadius: defBorderRadius
                }}
            />                        
            <FaTimesCircle
                color={"red"} 
                size="2rem"                 
                onClick={()=>onChange("")}
                style={{visibility:text===""?"hidden":"visible"}}
            /> */}
            <div
            style={{
                display: "flex",
                alignContent:"center",
                alignItems:"center",
                borderRadius: defBorderRadius,
                backgroundColor: defMainThemeColor,
                paddingRight:"0.5rem",
            }}>
            <StyledInput
                value={text}
                placeholder = {"Buscar"}
                onChange={(e) => onChange(e.target.value)}
                type="text"
                style={{
                    border: 0,
                    width: "100%",
                    backgroundColor: defMainThemeColor,
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
