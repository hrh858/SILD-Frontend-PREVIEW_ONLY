import { Folder, Group } from "./DataStructure"

export enum GroupFilteringType {
    Master,
    Associated,
    Filter
}

export class VizGroup {
    public readonly name: string
    public readonly id: number
    public readonly canBeMaster: boolean
    public readonly canBeAssociated: boolean
    public readonly canBeFilter: boolean

    private active: boolean

    constructor(name: string, id: number, canBeMaster: boolean, canBeAssociated: boolean, canBeFilter: boolean) {
        this.active = true
        this.name = name
        this.id = id
        this.canBeMaster = canBeMaster
        this.canBeAssociated = canBeAssociated
        this.canBeFilter = canBeFilter
    }

    public deactivate() { 
        // console.log("NewStructure - Group Deactivated"); 
        this.active = false }
    public reactivate() { this.active = true }
    public isActive(): boolean { return this.active }
}

export abstract class VizFolder {
    public readonly isFather: boolean
    public readonly isChild: boolean
    public readonly name: string
    public readonly id: number
    
    private selected: boolean
    private active: boolean

    constructor(name: string, id: number, isFather: boolean, isChild: boolean) {
        this.selected = false
        this.active = true
        this.name = name
        this.id = id
        this.isFather = isFather
        this.isChild = isChild
    }

    public deactivate() { this.active = false}
    public reactivate() { this.active = true }
    public select() { this.selected = true }
    public deselect() { this.selected = false }
    public isActive(): boolean { return this.active }
    public isSelected(): boolean { return this.selected }
}
export class NonLeafVizFolder extends VizFolder {
    public readonly children: LeafVizFolder[]

    constructor(name: string, id: number, children: LeafVizFolder[]) {
        super(name, id, true, false)
        this.children = children
    }

    public deselect() {
        super.deselect()
        for (let childFolder of this.children) childFolder.deselect()
    }
    public reactivate() {
        super.reactivate()
        for (let childFolder of this.children) childFolder.reactivate()
    }
}
export class LeafVizFolder extends VizFolder {
    public readonly groups: VizGroup[]

    constructor(name: string, id: number, groups: Group[], isChild: boolean) {
        super(name, id, false, isChild)
        this.groups = groups.map((group) => new VizGroup(group.name, group.id, group.canBeMaster, group.canBeAssociated, group.canBeFilter))
    }
    
    public getActiveGroups(): VizGroup[] { return this.groups.filter((group) => group.isActive()) }
    public filterGroupsByType(keepType: GroupFilteringType) {
        switch (keepType) {
            case GroupFilteringType.Master:
                for (let group of this.groups) if (!group.canBeMaster) group.deactivate()
            break
            case GroupFilteringType.Associated:
                for (let group of this.groups) if (!group.canBeAssociated) group.deactivate()
            break
            case GroupFilteringType.Filter:
                for (let group of this.groups) if (!group.canBeFilter) group.deactivate()
            break
        }
        if (this.getActiveGroups().length < 1) this.deactivate()
    } 
    public reactivate() {
        super.reactivate()
        for (let group of this.groups) group.reactivate()
    }
}

export class VizFoldersStructure {
    public folders: VizFolder[]

    constructor(rawFolders: Folder[]) {
        const getChildrenOfFatherFolder = (searchId: number): LeafVizFolder[] => {
            let aux: LeafVizFolder[] = []
            for (let f of rawFolders) if (f.father && f.father === searchId) aux.push(
                new LeafVizFolder(
                    f.name,
                    f.id,
                    f.groups,
                    true
                )
            )
            return aux
        } 

        this.folders = []
        for (let i=0; i < rawFolders.length; i++) {
            let rawFolder = rawFolders[i]
            let vizFolder: VizFolder

            let children = getChildrenOfFatherFolder(rawFolder.id)
            if (rawFolder.father === 0 && children.length !== 0) {
                vizFolder = new NonLeafVizFolder(
                    rawFolder.name,
                    rawFolder.id,
                    children
                )
                this.folders.push(vizFolder)
            } else if (rawFolder.father === 0) {
                vizFolder = new LeafVizFolder(
                    rawFolder.name,
                    rawFolder.id,
                    rawFolder.groups,
                    false
                )
                this.folders.push(vizFolder)
            }
        }
    }

    public getActiveFolders(): VizFolder[] {
        let aux: VizFolder[] = []
        for (let folder of this.folders) {
            if (folder instanceof LeafVizFolder && folder.isActive() && !folder.isChild) aux.push(folder)
            else if (folder instanceof NonLeafVizFolder) {
                let push = false
                for (let childFolder of folder.children) if (childFolder.isActive()) push = true
                if (push) aux.push(folder)
            }
        }
        return aux
    }
    public filterFoldersByType(keepType: GroupFilteringType) {
        for (let folder of this.folders) {
            folder.reactivate()
            if (folder instanceof LeafVizFolder) folder.filterGroupsByType(keepType)
            else if (folder instanceof NonLeafVizFolder) {
                for (let childFolder of folder.children) childFolder.filterGroupsByType(keepType)
            }
        }

        // for (let folder of this.folders) {
        //     if (folder instanceof LeafVizFolder) for (let group of folder.groups) console.log ("NewStructure - ", group.name, group.isActive())
        //     else if (folder instanceof NonLeafVizFolder) {
        //         for (let childFolder of folder.children) for (let group of childFolder.groups) console.log("NewStructure - ", group.name, group.isActive())
        //     }
        // }
    }
    public resetFiltering() {
        for (let folder of this.folders) {
            if (folder instanceof LeafVizFolder) folder.reactivate()
            else if (folder instanceof NonLeafVizFolder) {
                folder.reactivate()
                for (let childFolder of folder.children) childFolder.reactivate()
            }
        }
    }
    public selectFolder(id: number) {
        for (let folder of this.folders) {
            if (folder instanceof NonLeafVizFolder) {
                folder.deselect()
                let selectFather = false
                for (let childFolder of folder.children) {
                    if (childFolder.id === id) {
                        childFolder.select()
                        selectFather = true
                    }
                }
                if (selectFather) folder.select()
            } else if (folder instanceof LeafVizFolder) {
                folder.deselect()
                if (folder.id === id) folder.select()
            }
        }
    }
    public resetSelectedFolder( ) {
        for (let folder of this.folders) {
            folder.deselect();
        }
    }
    public getSelectedFolder(): LeafVizFolder | undefined {
        let selectedFolder: LeafVizFolder | undefined = undefined
        for (let folder of this.folders) {
            if (folder.isSelected()) {
                if (folder instanceof LeafVizFolder) {
                    selectedFolder = folder
                } else if (folder instanceof NonLeafVizFolder) {
                    for (let childFolder of folder.children) {
                        if (childFolder.isSelected()) selectedFolder = childFolder
                    }
                }
            }
        }
        return selectedFolder
    }
    public getParentFolder(childId: number): NonLeafVizFolder | undefined {
        let aux = this.folders.filter((folder) => folder instanceof NonLeafVizFolder)
        for (let parentFolder of aux) {
            let folder = parentFolder as NonLeafVizFolder
            for (let children of folder.children) if (children.id === childId) return folder
        }
    }
} 