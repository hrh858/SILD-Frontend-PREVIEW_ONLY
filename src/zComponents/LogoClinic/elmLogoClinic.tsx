import styled from 'styled-components'

import * as colorDef from '../../Shared/Colors'

export  const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template-rows: 50% 25% 25%;
    justify-content: center;
    background-color: ${colorDef.defMainThemeColor};
    color:white;
    height: 80px;
`

export const UpperDiv = styled.div`
    display: grid;
    justify-content: center;
`
export const UpperText = styled.h1`
    font-size: 35px !important;
    letter-spacing: 5px;
    color: white;
`

export const MiddleDiv = styled.div`
    display: grid;
    justify-content: center;
    background-color: white;
`

export const MiddleText = styled.h2`
    font-size: 16px;
    letter-spacing: 5px;
    color: ${colorDef.defMainThemeColor};
    padding-left: 4px;
`

export const BotttomDiv = styled.div`
    display: grid;
    justify-content: center;
`

export const BotttomText = styled.span`
    color: white;
    font-weight: 400;
    font-size: 1rem;
`
