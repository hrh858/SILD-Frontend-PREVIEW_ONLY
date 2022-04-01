import styled, { createGlobalStyle, keyframes } from "styled-components"
export const GlobalStyles = createGlobalStyle`
  body {
    background: #fff;
    color: #fff;
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: color 0.50s linear, background-color 0.50s linear;
    text-align: center;
  }
  `

export const Container = styled.div`
  padding: 2rem;
  display:flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`

export const MainContainer = styled(Container)`
  height: calc( 100vh - 100px);
`

export const Row = styled.div`
  padding: 2rem;
  display:flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;

  @media (max-width: 960px){
    flex-direction: column;
    justify-content: flex-start;
  }
`

export const RowE = styled(Row)`
display: flex;
  justify-content: space-between;
`

export const RowELItems = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-left: 1rem;
  align-items: center;
`

export const RowERItems = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 1rem;
  align-items: center;
`

export const Column = styled.div`
  padding: 2rem;
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  
  @media (max-width: 960px){
  width: 100% !important;
  max-width: 100% !important;
  }
`

interface ButtonProps {
  danger?: Boolean
}

export const Button = styled.button`
  background: ${(props: ButtonProps) => props.danger ? ({ theme }) => theme.danger : ({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  padding: 1rem 2rem;
  border-radius: 1rem;
  border: none;
  outline: none !important;
  display:flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;


  &:hover{
    opacity: 0.9;
    box-shadow: 0.5rem 0.5rem 1rem 0rem ${({ theme }) => theme.backgroundSecondary};
  }
`

const spin = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
`

export const Loader = styled.div`
    border: 3px solid #f3f3f3;
    border-radius: 50%;
    border-top: 3px solid rgb(20, 149, 131);
    width: 50px;
    height: 50px;
    -webkit-animation: ${spin} 2s linear infinite; /* Safari */
    animation: ${spin} 2s linear infinite;
`

export const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: inherit;
`

export const ListHeader = styled.span`
  padding: 1rem;
  font-weight: bold;
  border-bottom: 1px solid gray;
  margin-bottom: 1rem;
`

export const ListContent = styled.div`
  overflow-y: auto;
`

export const ListItem = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  padding: 0.5rem;
  
  &:hover{
    background-color: #c0c0c0;
  }
`

export const ListGroup = styled.div`
padding: 1rem;
display: flex;
flex-wrap: wrap;
`

export const ListGroupItem = styled.div`
padding: 1rem;
margin: 1rem;
height: 100px;
width: 200px;
display: flex;
align-items: center;
cursor: pointer;
border: 1px solid transparent;
border: 1px solid ${({ theme }) => theme.background};
border-radius: 2rem;

&:hover{
    background-color: ${({theme}) => theme.background};
    color: "white";
  }
`

export const ListGroupItemIcon = styled.div`
font-size: 3rem;
`

export const ListGroupItemText = styled.span`
width: 100%;
text-overflow: ellipsis;
overflow: hidden;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
font-size: 1.5rem;
`

export const Popup = styled.div`
  z-index: 999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: rgba(50,50,50,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: fixed;
`

export const PopupContainer = styled.div`
  background-color: white;
  cursor: default;
  width: 900px;
  max-height: 70vh;
  overflow-y: auto;
`

export const PopupHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 2rem;
  border-bottom: 1px solid gray;
  font-size: xx-large;
  font-weight: bold;
`

export const PopupFooter = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 2rem;
`

export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.background};
`

export const IconSelect = styled(Icon)`
  cursor: pointer;
  &:hover{
    opacity: 0.7;
  }
`