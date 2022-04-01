import React from 'react'
import styled from "styled-components"

// MY COMPONENTS
import TileSelectionProgressDisplayer from './TileSelectionProgressDisplayer'
import InputStringProgressDisplayer from './InputStringProgressDisplayer'
import IntervalTimeSelectionProgressDisplayer from './IntervalTimeSelectionProgressDisplayer'
import BooleanSelectionProgressDisplayer from './BooleanSelectionProgressDisplayer'
import MultiBooleanSelectionProgressDisplayer from './MultiBooleanSelectionProgressDisplayer'
import ValueInsertProgressDisplayer from './ValueInsertProgressDisplayer'
import VarIntervalSelectionProgressDisplayer from './VarIntervalSelectionProgressDisplayer'
import GroupMultiTileSelectProgressDisplayer from './GroupMultiTileSelectProgressDisplayer'
import MultiTileSelectProgressDisplayer from './MultiTileSelectProgressDisplayer'

// MODELS
import { SchemaProgressOutput} from '../Models/cPackFE'

//SHARE
import { defScrollBar,defBorderRadius } from '../Shared/Colors'


const ContainerVisualizacion = styled.div`
    overflow-y: auto;
    height: 100%;
    padding: 0.5rem;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    gap:1.5rem;

    &::-webkit-scrollbar {
        width: 0.35rem !important ; 
        display: flex;
    }
    &::-webkit-scrollbar-thumb  {
        background: ${defScrollBar}; 
        border:none ;
        border-radius: 0.3rem;
    }
    &::-webkit-scrollbar-track {
        margin-bottom: ${defBorderRadius};
        margin-top: 0.5rem;
    }  
`

interface Props {
    progressOutput: SchemaProgressOutput[]
}

function RenderProgress(props: Props) {    
    const progOuts = props.progressOutput;

    return <ContainerVisualizacion>
        {progOuts.map((progOut) => {
        if (progOuts.values != null ) {
            switch (progOut.componentType) {
                case 'InfoScreen':
                    return null
                case "TileSelection":
                    // console.log("TileSelection")
                    return (
                        <TileSelectionProgressDisplayer
                            output={progOut.values}
                            outputKey={progOut.outputKey}
                        />
                    )
                case "InputString":
                    // console.log("InputString")
                    return (
                        <InputStringProgressDisplayer
                            output={progOut.values}
                            outputKey={progOut.outputKey}
                        />
                    )
                case "IntervalTimeSelection":
                    // console.log("IntervalTimeSelection")
                    return (
                        <IntervalTimeSelectionProgressDisplayer
                            output={progOut.values}
                            outputKey={progOut.outputKey}
                        />
                    )
                case "BooleanSelection":
                    // console.log("BooleanSelection")
                    return (
                        <BooleanSelectionProgressDisplayer
                            output={progOut.values}
                            outputKey={progOut.outputKey}
                        />
                    )
                case "MultiBooleanSelection":
                    // console.log("MultiBooleanSelection")
                    return (
                        <MultiBooleanSelectionProgressDisplayer
                            output={progOut.values}
                            outputKey={progOut.outputKey}
                        />
                    )
                case "ValueInsert":
                    // console.log("ValueInsert")
                    return (
                        <ValueInsertProgressDisplayer
                            output={progOut.values}
                            outputKey={progOut.outputKey}
                        />
                    )
                case "VarIntervalSelection":
                    // console.log("VarIntervalSelection")
                    return(
                        <VarIntervalSelectionProgressDisplayer
                            output={progOut.values}
                            outputKey={progOut.outputKey}
                        />
                    )
                case "MultiTileSelect":
                    // console.log("MultiTileSelect")
                    return(
                        <MultiTileSelectProgressDisplayer 
                            output={progOut.values}
                            outputKey={progOut.outputKey}
                        />
                    )
                case "GroupMultiTileSelect":
                    // console.log("GroupMultiTileSelect")
                    return(
                        <GroupMultiTileSelectProgressDisplayer 
                            output={progOut.values}
                            outputKey={progOut.outputKey}
                        />
                    )               

                default:
                    return (<span>Esta zona sigue en desarrollo</span>)
            }
        }
    })
    }
    </ContainerVisualizacion>
}

export default RenderProgress
