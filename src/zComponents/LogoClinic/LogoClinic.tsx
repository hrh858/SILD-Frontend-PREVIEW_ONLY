import React from 'react';
import './LogoClinic.css'
import { Container, UpperDiv, UpperText, MiddleDiv, MiddleText, BotttomDiv, BotttomText } from './elmLogoClinic'
function LogoClinic() {
    return(
        <Container>
            <UpperDiv>
                <UpperText>CLÍNIC</UpperText>
            </UpperDiv>
            <MiddleDiv>
                <MiddleText>BARCELONA</MiddleText>
            </MiddleDiv>
            <BotttomDiv>
                <BotttomText>Hospital Universitari</BotttomText>
            </BotttomDiv>
        </Container>
    )
}

export default LogoClinic