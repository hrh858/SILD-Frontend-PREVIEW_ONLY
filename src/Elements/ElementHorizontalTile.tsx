import React from 'react'
import { defSelectedElem, defWhiteColor, defBlackColor, defBorderRadius, defGrayLightColor } from '../Shared/Colors'
import { defShadow } from '../Shared/Shadows'

import styled from 'styled-components';
import ElementInfoIcon from '../Elements/ElementInfoIcon'
import { TooltipNAV } from "../Elements/ElementStyledTooltip";

const BooleanSelectionTile = styled.button<ButtonProps>`
border: 0;
width: 100%;
max-height: 6rem;
color: ${({ active }) => (active ? defWhiteColor : defBlackColor)};
background-color: ${({ active }) => (active ? defSelectedElem : defWhiteColor)};
box-shadow: ${defShadow};
border-radius: ${defBorderRadius};
display: flex;
align-items: center;
justify-content: start;
transition: all 0.3s;
padding: 1rem;
gap: 1rem;
&:hover {
  background: ${({ active }) => (active ? "" : defGrayLightColor)};;
  transition: all 0.2s ease 0s;
}
`;
const MySpan = styled.span`
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 2; /* number of lines to show */
           line-clamp: 2; 
   -webkit-box-orient: vertical;
`;

interface iInputDataComp {
    id: any;
    name: string;
    defaultValue?: boolean;
    hoverInfo?: string;
}

interface Props {
    value: iInputDataComp
    description?: string
    type?: string
    onChange: (active: boolean) => void
    active: boolean
}

interface ButtonProps {
    active: boolean
}



function ElementHorizontalTile(props: Props) {
    const value = props.value;
    const onClick = () => {
        props.onChange(!props.active)
    }

    return (
        <>
            <TooltipNAV title={value.name} arrow>
                <BooleanSelectionTile
                    active={props.active}
                    onClick={() => onClick()}
                >
                    <ElementInfoIcon
                        hover={value.hoverInfo}
                        contrast={props.active}
                    />
                    <MySpan
                        style={{
                            //     overflow: "hidden",
                            //     whiteSpace: "nowrap",
                            //     textOverflow: "ellipsis"
                            textAlign: "left",
                        }}

                    >
                        {value.name}
                        {/* {value.name.croppedVersion(130)} */}
                    </MySpan>
                </BooleanSelectionTile>
            </TooltipNAV>
        </>
    )
}

const Tile = styled.button<ButtonProps>`
    border: 0;
    width: 100%;
    height: 3rem;
    color: ${({ active }) => (active ? defWhiteColor : defBlackColor)};
    background-color: ${({ active }) => (active ? defSelectedElem : defWhiteColor)};
    box-shadow: ${defShadow};
    border-radius: ${defBorderRadius};
    display: flex;
    align-items: center;
    justify-content: start;
    transition: all 0.3s;
    padding: 1rem;
    gap: 1rem;
    &:hover {
      background: ${({ active }) => (active ? "" : defGrayLightColor)};;
      transition: all 0.2s ease 0s;
    }
  `;

export default ElementHorizontalTile
