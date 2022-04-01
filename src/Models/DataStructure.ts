export interface GroupConstructorData {
    id: number,
    name: string,
    canBe: number
}

export class Group {
    public readonly id: number
    public readonly name: string
    public readonly canBeMaster: boolean
    public readonly canBeAssociated: boolean
    public readonly canBeFilter: boolean

    constructor(data: GroupConstructorData) {
        this.id = data.id
        this.name = data.name
        let aux = data.canBe.toString()
        this.canBeMaster = Boolean(Number(aux[0]))
        this.canBeAssociated = Boolean(Number(aux[1]))
        this.canBeFilter = Boolean(Number(aux[2]))
    }
}

export interface FolderConstructorData {
    id: number,
    name: string,
    father: number,
    groups: GroupConstructorData[]
}

export class Folder {
    public readonly id: number
    public name: string
    public readonly father: number
    public groups: Group[]

    constructor(data: FolderConstructorData) {
        this.id = data.id
        this.name = data.name
        this.father = data.father
        this.groups = data.groups.map((groupConstructData) => new Group(groupConstructData))
    }
}

export interface GroupSimp {
    id: number
    name: string
}

export interface FolderSimp {
    id: number
    name: string
}