import React from 'react'
import { TreeItem } from '@material-ui/lab'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { MdEdit } from 'react-icons/md';
import { FaFilter, FaTrash } from 'react-icons/fa';

import styled from 'styled-components'
import { withStyles, Theme } from '@material-ui/core/styles';


// MY COMPONENTS
import { ElementBagdeTreeItem} from '../Elements/ElementBagdeTreeItem';

// ELEMENTS
import { TooltipNAV } from '../Elements/ElementStyledTooltip';

// MODELS
import { cPackFE, GroupMode, SchemaProgressScreen } from '../Models/cPackFE'

//SHARE
import { defMainThemeColor, defWhiteColor, defFilterColor,defGrayHoverColor ,defBlackColor2, defGrayColor,defTagGroupTreColor,defVisualizacionButtonTrash} from '../Shared/Colors'


const IconContainer = styled.div`
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background-color: ${defMainThemeColor};
    color:${defWhiteColor};
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    justify-items: center;
    &:hover{
        transform:scale(1.07);
    }
`

export enum TreeItemType {
    Master,
    Asociada,
    Filtero,
    Screen
}

//***********************************************************************************/
// CUSTOM TREE VIEW
//***********************************************************************************/
interface PropsView {
    pack: cPackFE,
    filters: cPackFE[],
    setViewScreenCallback: (screenRef?:{idPack:string,idScreen:string,idxComp:number}) => void,
    setEditingFunctionCallback?: (id: string, screen: string) => void,
    setFilteringFunctionCallback?: (id: string) => void,
    setDeletingFunctionCallback?: (id: string) => void,
    hideActions?: boolean
    preVisualization?:boolean
}

export function CustomTreeContainer(props: PropsView) {
    const getNamePack = ()=>{
        let newName = [props.pack.group.name,props.pack.group.name];
        
        const screenRename = props.pack.screens.find((scr)=>scr.screenId === "screen_packRename");
        if (screenRename !== undefined){
            const selectedName = screenRename.outputs[0]?.values[0]?.name
            if(selectedName !== undefined){
                newName[0] = selectedName;
            }
        }
        return newName;
    }

    return (
        <CustomTreeItem
            id={props.pack.idPack}
            label={getNamePack()}
            extraLabel={props.filters.length>0?props.filters.length.toString():""}
            type={props.pack.type}
            onClick={() => { props.setViewScreenCallback(undefined) }}
            onEdit={() => props.setEditingFunctionCallback ? props.setEditingFunctionCallback(props.pack.idPack, props.pack.screens[0].screenId) : ""}
            onFilter={() => props.setFilteringFunctionCallback ? props.setFilteringFunctionCallback(props.pack.idPack) : ""}
            onDelete={() => props.setDeletingFunctionCallback ? props.setDeletingFunctionCallback(props.pack.idPack) : ""}
            hideActions={props.hideActions}
            isScreen={false}            
        >
            {//SCREENS
                !props.preVisualization && props.pack.screens.map((screen: SchemaProgressScreen) => {
                    return screen.screenId!=='screen_0' && screen.screenId!=='screen_FIN' && <CustomTreeItem
                        id={props.pack.idPack + screen.screenId}
                        label={[screen.screenTitle]}
                        type={"Screen"}
                        onClick={screen.outputs.length < 2 ? () => {props.setViewScreenCallback({idPack:props.pack.idPack,idScreen:screen.screenId,idxComp:-1})} : () => {props.setViewScreenCallback(undefined)}}
                        onEdit={() =>( props.setEditingFunctionCallback  )? props.setEditingFunctionCallback(props.pack.idPack, screen.screenId) :undefined}
                        hideActions={screen.outputs.length === 1 || props.hideActions?props.hideActions:true}
                        isScreen={screen.outputs.length < 2}
                    >
                        {
                            screen.outputs.length > 1 ?
                                screen.outputs.map((output, idx) => <CustomTreeItem
                                    id={props.pack.idPack + screen.screenId + output.outputKey}
                                    label={[screen.screenTitle + " - Parte: " + (idx+1)]}
                                    type={"Component"}
                                    onClick={() => { props.setViewScreenCallback({idPack:props.pack.idPack,idScreen:screen.screenId,idxComp:idx}) }}
                                    isScreen={true}
                                    onEdit={() => props.setEditingFunctionCallback ? props.setEditingFunctionCallback(props.pack.idPack, screen.screenId) : undefined}
                                    hideActions={props.hideActions}
                                />) : null
                        }
                    </CustomTreeItem>
                })
            }
            { // FILTRO (SI HAY)
                props.filters ?
                    props.filters.map((filter: cPackFE) =>
                        <CustomTreeContainer
                            pack={filter}
                            filters={[]}
                            setViewScreenCallback={props.setViewScreenCallback}
                            setEditingFunctionCallback={props.setEditingFunctionCallback}
                            setDeletingFunctionCallback={props.setDeletingFunctionCallback}
                            hideActions={props.hideActions}
                        />)
                    : null
            }
        </CustomTreeItem>
    )
}

//***********************************************************************************/
// CUSTOM TREE ITEM
//***********************************************************************************/
interface Props {
    children?: React.ReactNode
    label: string[]
    extraLabel?:string
    id: string
    type: string
    isScreen:boolean
    onClick?: () => void
    onEdit?: () => void
    onFilter?: () => void
    onDelete?: () => void
    hideActions?: boolean
}

export function CustomTreeItem(props: Props) {
    
    return (
        <MyTreeItem
            isScreen ={props.isScreen}
            nodeId={props.id}
            label={
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    minHeight: "2.5rem",
                    paddingRight: '0.5rem',
                    paddingLeft: '0.2rem'
                }}>
                    <div style={{
                        display: "flex",
                        justifyContent: 'flex-start',
                        gap: "0.8rem",
                        alignItems: 'center',                        
                    }}>
                        <ElementBagdeTreeItem
                            type={props.type}
                            size={'1.3rem'}
                        />
                        {
                        props.label.length>1  &&
                            <TooltipNAV
                                title={"Grupo: " +props.label[1]}
                                arrow={true}
                            >
                            <span style={{
                                verticalAlign: "middle",
                                textAlign: "center",
                                color:"white",
                                backgroundColor:defTagGroupTreColor,
                                padding: '0 0.2rem',                                
                                fontSize:"0.8rem",
                                borderRadius:'0.2rem',
                                paddingTop:'0.07rem',
                                fontWeight:500,
                                width: "4.5rem",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                            }}>
                                {props.label[1].length>6?props.label[1].slice(0,6)+"...":props.label[1]}
                            </span>
                            </TooltipNAV>
                        }
                        <span style={{
                            verticalAlign: "middle",
                            textAlign: "left",
                            fontWeight: props.type === GroupMode.Master ? "bold" : "normal"
                        }}>
                            {props.label[0]}
                        </span>
                        {
                        props.extraLabel &&
                            <TooltipNAV
                                title={'Número de filtros creados'}
                                arrow={true}
                            >
                            <span style={{
                                verticalAlign: "middle",
                                textAlign: "left",
                                color:"white",
                                backgroundColor:defFilterColor,
                                padding: '0 0.2rem',                                
                                fontSize:"0.8rem",
                                borderRadius:'0.2rem',
                                paddingTop:'0.07rem',
                                fontWeight:500,
                            }}>{props.extraLabel}F</span>
                            </TooltipNAV>
                        }
                    </div>                   
                    <div style={{
                        display: "flex",
                        justifyContent: 'center',
                        gap: "0.5rem",
                        alignItems: 'center',
                    }}>
                        {/* {
                            props.type !== GroupMode.Filter && props.onFilter && !props.hideActions ?
                                <TooltipNAV
                                    title={'Crear nuevo filtro'}
                                    arrow={true}
                                >
                                    <IconContainer
                                        style={{ backgroundColor: defFilterColor }}
                                        onClick={
                                            (e) => {
                                                e.stopPropagation();
                                                if (props.onFilter !== undefined) props.onFilter()
                                            }
                                        }
                                    >
                                        <   FaFilter style={{ width: "0.75rem", paddingTop: "3px" }} />
                                    </IconContainer>
                                </TooltipNAV>
                                : null
                        } */}
                        {
                            props.onEdit && !props.hideActions ?
                                <TooltipNAV
                                    title={'Editar'}
                                    arrow={true}
                                >
                                    <IconContainer
                                        onClick={
                                            (e) => {
                                                e.stopPropagation();
                                                if (props.onEdit !== undefined) props.onEdit();
                                            }
                                        }
                                    >
                                        <MdEdit style={{ width: "1.1rem" }} />
                                    </IconContainer>
                                </TooltipNAV>
                                : null
                        }
                        {
                            props.onDelete && !(props.type === GroupMode.Master) && !props.hideActions ?
                                <TooltipNAV
                                    style={{backgroundColor: defVisualizacionButtonTrash}}
                                    title={'Eliminar'}
                                    arrow={true}
                                >
                                    <IconContainer
                                        onClick={
                                            (e) => {
                                                e.stopPropagation();
                                                if (props.onDelete !== undefined) props.onDelete()
                                            }
                                        }
                                    >
                                        <   FaTrash style={{ width: "0.7rem" }} />
                                    </IconContainer>
                                </TooltipNAV>
                                : null
                        }
                    </div>
                </div>
            }
            collapseIcon={<ArrowDropDownIcon />}
            expandIcon={<ArrowRightIcon />}
            onClick={() => props.onClick ? props.onClick() : {}}
        >
            {props.children}
        </MyTreeItem>
    )
}


const styles = (props: Theme & {isScreen:boolean}) => ({
    root: {
        // '&$selected > $content $label': {
        //   backgroundColor: 'red',
        // },
        '&$selected > $content $label, &$selected:focus > $content $label,&$selected:hover > $content $label': {
          backgroundColor: props.isScreen?defBlackColor2:"white",
          color: props.isScreen?'white':"",
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: 'transparent',
          },
        },
      },
      /* Pseudo-class applied to the root element when selected. */
      selected: {},
      /* Styles applied to the tree node content. */
      content: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
      },
      /* Styles applied to the label element. */
      label: {
        '&:hover': {
          backgroundColor: defGrayHoverColor,
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: 'transparent',
          },
        },
      },
  })




export const MyTreeItem = (props: any) => {
    const StyledComponent = withStyles((theme: Theme) => styles({ ...props, ...theme }))(
        TreeItem
    );
    
    return <StyledComponent {...props} />;
    };