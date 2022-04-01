import React from 'react'
import ElementDescription from './ElementDisplay/ElementDescription'

interface Props {
    output: [{ id: number, name: string, condition: string }]
    outputKey:string
}

function ValueInsertProgressDisplayer(props: Props) {

    return (
        <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            gap: "0.7rem"
        }}>           
        {
            props.output.map((outputObj) => {
                return (
                    <ElementDescription>
                    {
                        outputObj.condition.includes('>') && outputObj.condition.includes('<') ?
                        <span>El valor de <b>{outputObj.name}</b> debe encontrarse <b>entre {outputObj.condition.replace(/;.*/, '').replace('>','')} y {outputObj.condition.replace(/.*;/, '').replace('<','')}</b></span>
                        // ENTRE ___ y ____ 
                        :
                        outputObj.condition.includes('!') && outputObj.condition.includes('=') ?
                        <span>El valor de <b>{outputObj.name}</b> debe ser <b>diferente de {outputObj.condition.replace('!=', '')}</b></span>
                        // DIFERENTE DE 
                        :
                        outputObj.condition.includes('>') ?
                        <span>El valor de <b>{outputObj.name}</b> debe ser <b>mayor a {outputObj.condition.replace('>', '')}</b></span>
                        // MAYOR O IGUAL
                        :
                        outputObj.condition.includes('<') ?
                        <span>El valor de <b>{outputObj.name}</b> debe ser <b>menor a {outputObj.condition.replace('<', '')}</b></span>
                        // MENOR O IGUAL
                        :
                        outputObj.condition.includes('=') ?
                        <span>El valor de <b>{outputObj.name}</b> debe ser <b>igual a {outputObj.condition.replace('=', '')}</b></span>
                        // IGUAL A 
                        :
                        <span>No se han aplicado restricciones al valor de <b>{outputObj.name}</b></span>
                        // SIN RESTRICCIONES
                    }
                    </ElementDescription>                        
                )
            })
        }
        </div>
    )
}

export default ValueInsertProgressDisplayer
