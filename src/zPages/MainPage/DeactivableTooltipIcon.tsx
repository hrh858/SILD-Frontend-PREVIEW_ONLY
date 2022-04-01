import React, { ReactElement } from 'react'
import styled from "styled-components";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

import { FaDownload, FaTrash, FaDatabase, FaEye, FaList, FaBars,} from "react-icons/fa"

// ELEMENTS
import { TooltipNAV } from "../../Elements/ElementStyledTooltip";

//SHARE
import * as colorDef from '../../Shared/Colors'


const IconContainer = styled.div`
    width: 1.9rem;
    height: 1.9rem;
    border-radius: 50%;
    background-color: ${colorDef.defButtonMainPageColorBackground};
    color:${colorDef.defButtonMainPageColorIcon};
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    justify-items: center;
 
    &:hover{
        transform:scale(1.1);
        color: ${colorDef.defButtonMainPageColorBackground};
        background-color:${colorDef.defButtonMainPageColorIcon};
        border:1.5px solid ${colorDef.defButtonMainPageColorBackground}
    }
`

const ButtonOptions = styled.button`
    width: 1.9rem;
    height: 1.9rem;
    border-radius: 50%;
    border:0;
    background-color: ${colorDef.defMainThemeColor};
    color:${colorDef.defWhiteColor};
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    justify-items: center;
 
    &:hover{
        transform:scale(1.1);
        color: ${colorDef.defMainThemeColor};
        background-color:${colorDef.defWhiteColor};
        border:1.5px solid ${colorDef.defMainThemeColor}
    }
`

interface Props {
    visible: boolean
    tooltipKey: string
    tooltipText: string
    icon: ReactElement
    backgroundColor?:string
    onClickActivatedFunction: () => void
    diameter?: string
}

export function DeactivableTooltipIcon(props: Props) {
    return (
        <TooltipNAV title={props.tooltipText} arrow>
            <IconContainer 
                onClick={(e) => {e.stopPropagation();props.onClickActivatedFunction()}} 
                style={{
                   cursor:"pointer",
                   width: props.diameter? props.diameter:"",
                   height: props.diameter? props.diameter:"",
                   display:props.visible?"":"none",
                   backgroundColor:props.backgroundColor?props.backgroundColor:"",
                   color:props.backgroundColor?"white":"",
                   border:props.backgroundColor?0:"",                
            }}>
                <>
                {props.icon}
                </>
            </IconContainer>
        </TooltipNAV>
    )
}

//-----------------------------------------------------------
const getButtonsStatus = (status:number)=>{
    switch (status) {
        case  0:
            return  { // Prepared
                CrearBase: true,
                VisualizarBase: false,
                Descargar: false,
                Informacion: false,
                EliminarBase: true,
                EditBase: true
            }
        case  1:
            return  { // Prepared
                CrearBase: false,
                VisualizarBase: false,
                Descargar: false,
                Informacion: false,
                EliminarBase: false,
                EditBase: false
            }   
        case  2:
            return  { // Prepared
                CrearBase: true,
                VisualizarBase: true,
                Descargar: true,
                Informacion: false,
                EliminarBase: true,
                EditBase: true
            }    
        case  3:
            return  { // Prepared
                CrearBase: false,
                VisualizarBase: false,
                Descargar: false,
                Informacion: false,
                EliminarBase: false,
                EditBase: false
            } 
        case  4:
            return  { // Prepared
                CrearBase: true,
                VisualizarBase: true,
                Descargar: true,
                Informacion: false,
                EliminarBase: true,
                EditBase: true
            }          
    }
    return { // Prepared
        CrearBase: false,
        VisualizarBase: false,
        Descargar: false,
        Informacion: false,
        EliminarBase: false,
        EditBase: false
    }
}
//---------------------------------------------------------------------------

interface PropsMyDBOptions {
    id:string;
    status:number;
    onOpen: () => void
    onClose: () => void
    onClickBuild: () => void
    onClickDownload: () => void
    onClickDelete: () => void
    onClickVisualizar: () => void
    onClickEdit: () => void
}


export function MyDBOptions(props: PropsMyDBOptions) {     
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        props.onOpen();
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (e:any) => {
        e.stopPropagation();
        props.onClose();
        setAnchorEl(null);
    };
    
    const visibleStates = getButtonsStatus(props.status);
 
    return (
        <div>
            <ButtonOptions
                style={{visibility:Object.values(visibleStates).some((el)=>el)?"visible":"hidden"}}
                id={props.id+"-button"}
                onClick={handleClick}
            >
                <FaBars size={"85%"} />
            </ButtonOptions>
            
            <Menu
                id={props.id+"-menu"}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  
            >
                 {getButtonsStatus(props.status).EditBase &&
                 <MenuItem 
                    style={{gap:"0.8rem",}}
                    onClick={(e)=>{
                        handleClose(e);
                        props.onClickEdit();
                    }}
                    >
                        <FaList size={"1rem"} />    
                        <span>Detalles base / Editar</span> 
                </MenuItem>
                }
                {getButtonsStatus(props.status).CrearBase &&
                 <MenuItem 
                    style={{gap:"0.8rem",}}
                    onClick={(e)=>{
                        handleClose(e);
                        props.onClickBuild();
                    }}
                    >
                        <FaDatabase size={"1rem"} />    
                        <span>{props.status>0?"Construir/Actualizar Base":"Construir Base"}</span> 
                </MenuItem>
                }
                {getButtonsStatus(props.status).Descargar &&
                 <MenuItem 
                    style={{gap:"0.8rem",}}
                    onClick={(e)=>{
                        handleClose(e);
                        props.onClickDownload();
                    }}
                    >
                        <FaDownload size={"1rem"} />    
                        <span>Descargar</span> 
                </MenuItem>
                }       
                {getButtonsStatus(props.status).VisualizarBase &&
                 <MenuItem 
                    style={{gap:"0.8rem",}}
                    onClick={(e)=>{
                        handleClose(e);
                        props.onClickVisualizar();
                    }}
                    >
                        <FaEye size={"1rem"} />    
                        <span>Visualización en MySQL</span> 
                </MenuItem>
                }                
                <Divider />
                {getButtonsStatus(props.status).EliminarBase &&
                 <MenuItem 
                    style={{gap:"0.8rem",}}
                    onClick={(e)=>{
                        handleClose(e);
                        props.onClickDelete();
                    }}
                    >
                        <FaTrash size={"1rem"} />    
                        <span>Eliminar base</span> 
                </MenuItem>
                }
            </Menu>
        </div>
    )
}