export default class SchemaScreenComponent {
    id: string
    type: string
    outputKey: string
    props: any
    prevValues:any

    constructor(componentJson: any) {
        // console.log("JSON HERE: ", componentJson)
        this.id = componentJson.id
        this.type = componentJson.type
        this.outputKey = componentJson["output_key"] ? componentJson["output_key"] : "no_output_key"
        this.props = componentJson.props
        this.prevValues = componentJson.prevValues;
    }
}