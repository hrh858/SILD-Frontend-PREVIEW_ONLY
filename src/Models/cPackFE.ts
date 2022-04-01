import SchemaScreen from "./SchemaScreen"
import { GroupSimp, FolderSimp } from "./DataStructure"

export interface SchemaProgressOutput {
    componentId: string
    componentType: string
    outputKey: string
    values: any
}

export interface SchemaProgressScreen {
    screenId: string
    screenTitle: string
    outputs: SchemaProgressOutput[]
}

export enum GroupMode {
    Master = "Master",
    Associated = "Asociada",
    Filter = "Filtro"
}

export class cPackFE {
    idPack: string 
    folder: FolderSimp
    group: GroupSimp
    type: string
    screens: SchemaProgressScreen[] = []
    linkTO: string // id del pack sobre el que este subpack está actuando (undefined si es un pack)

    constructor(idPack:string, folder: FolderSimp, group: GroupSimp, type: string, linkTO:string,screens:SchemaProgressScreen[]) {
        this.idPack = idPack 
        this.folder = folder
        this.group = group
        this.type = type   
        this.screens = screens  
        this.linkTO = linkTO
    }

    isFilter(): boolean { return this.linkTO != "" }

    //-------------------------------------------------------------------//
    // NEW Bend 
    //-------------------------------------------------------------------//
    createScreen(currentScreen: SchemaScreen) {       
        let screenProg: SchemaProgressScreen = {
            screenId: currentScreen.id,
            screenTitle: currentScreen.title,
            outputs: [],
        }
        this.screens.push(screenProg);
    }

    addOnlyOutputToScreen(
        currentScreen: SchemaScreen,
        output: [{ componentId: string, componentType:string, output_key: string, values: any[] }],
    ) {
        let aux: SchemaProgressOutput[] = []
        for (let i = 0; i < output.length; i++) {
            let out: SchemaProgressOutput = {
                componentId: output[i].componentId,
                componentType: output[i].componentType,
                outputKey: output[i].output_key,
                values: output[i].values
            }
            aux.push(out)
        }
        this.screens[this.screens.length-1].outputs = aux;

    }

    goPreviousScreen(idScreen:string) {
        if(this.screens.slice(-1)[0].screenId === idScreen){
            this.screens.pop();
            this.screens.slice(-1)[0].outputs = [];            
            return true;
        }
        else console.log('Error going to previous screen')
        return false;
    }
}