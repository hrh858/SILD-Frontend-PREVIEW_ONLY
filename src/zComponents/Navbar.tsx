import React, { useState } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { FaHome, FaPowerOff, FaUser} from "react-icons/fa"

// MY COMPONENTS
import LogoClinic from "./LogoClinic/LogoClinic"

//SHARE
import * as colorDef from "../Shared/Colors";

const Nav = styled.nav`
    font-size: 1.5rem;
    top: 0;
`

const NavContainer = styled.div`
    padding-right: 1rem;
    padding-left: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background-color: ${colorDef.defMainThemeColor};
`

const NavSpanSILD = styled.span`
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
`
const NavSubContainer = styled.div`
    display: flex;
    gap:0.5rem;
    justify-content: center;
    justify-items: center;
    align-items: center;
    align-content: center;
`

const NavSubContainerUser = styled.div`
    display: flex;
    gap:1rem;
    justify-content: center;
    justify-items: center;
    align-items: center;
    align-content: center;
    color: ${colorDef.defMainThemeColor};
    background-color: ${colorDef.defWhiteColor};
    padding: 2px 1.1rem 2px 1rem;
    border-radius: 5px ;
    max-width: 200px;
    margin-right: 0.5rem;
`

const NavSpanUser = styled.span`
    text-align: center;
    /* padding-right:1rem ; */
    overflow: hidden;
    white-space: nowrap;
    text-overflow:  ellipsis;
`

const NavLinkSimple = styled(Link)`
    cursor: pointer; 
    display: flex;
    justify-content: flex-end;
    justify-items: flex-end;
    align-items: center;
    align-content: center;
`

const NavMyLink = styled(Link)`
    cursor: pointer; 
    display: flex;
    justify-content: center;
    justify-items: center;
    align-items: center;
    align-content: center;
    background-color: ${colorDef.defMainThemeColor};
    color: ${colorDef.defWhiteColor};
    height: 40px;
    width: 40px;

    &:hover{
        /* opacity:0.7; */
        background-color: ${colorDef.defWhiteColor};
        color: ${colorDef.defMainThemeColor};
        border-radius: 50%;
    }
`


const Navbar = () => {
    return (
        <Nav>
            <NavContainer>
                <NavLinkSimple to="/databases" style={{transform: "scale(0.65)"}}>               
                    <LogoClinic />
                </NavLinkSimple>
                <NavSpanSILD>SILD</NavSpanSILD>
                <NavSubContainer>
                    <NavSubContainerUser style={{gap:"0.8rem"}}>
                        <FaUser size={"1.2rem"}/>
                        <NavSpanUser>
                            {localStorage.getItem('user')}
                        </NavSpanUser> 
                    </NavSubContainerUser>
                    <NavMyLink to="/databases">
                        <FaHome />
                    </NavMyLink>                    
                    <NavMyLink to="/" onClick={() => {localStorage.removeItem("token");localStorage.removeItem('user');}}>
                        <FaPowerOff />
                    </NavMyLink>    
                </NavSubContainer>
            </NavContainer>
        </Nav>
    )
}

export default Navbar
