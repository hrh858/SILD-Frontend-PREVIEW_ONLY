import SchemaScreenComponent from "./SchemaScreenComponent"

export default class SchemaScreen {
    id: string
    title: string
    components: SchemaScreenComponent[]

    constructor(screenJson: any) {
        this.id = screenJson.id
        this.title = screenJson.title
        let components: SchemaScreenComponent[] = []
        screenJson.components.forEach((componentJson: any) => {
            let component = new SchemaScreenComponent(componentJson)
            components.push(component)
        })
        this.components = components
    }
}