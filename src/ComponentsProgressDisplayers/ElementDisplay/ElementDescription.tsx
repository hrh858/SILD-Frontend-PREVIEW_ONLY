import React,{ReactElement} from 'react'
import { defWhiteColor, defMainThemeColor } from '../../Shared/Colors'

interface Props {
    propsElem?:{justifyContent?:string}
    children:ReactElement
}

function ElementText(props: Props) {
    return  <div style={{
                    backgroundColor: defWhiteColor,
                    color: defMainThemeColor,
                    border: "2px solid "+defMainThemeColor,
                    padding: "0.7rem 1.5rem",
                    boxShadow: "rgb(60 64 67 / 30%) 0px 1px 2px 0px, rgb(60 64 67 / 15%) 0px 2px 6px 2px",
                    borderRadius: "1rem",
                    fontSize: "0.9em",
                    width: "100%",
                    justifyContent:props.propsElem?.justifyContent?props.propsElem?.justifyContent:"center",
                    display:"flex"
                }}>
                    {props.children}
            </div>


}

export default ElementText
