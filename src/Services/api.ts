import {fcn_moveToErrorPage} from './auxFunctions'

// LOCAL
const base_url = "http://localhost:3013/api"
const base_url_download = "https://sildpre.clinic.cat/dev/api"

// SERVER
// const base_url = "https://sildpre.clinic.cat/api"
// const base_url_download = "https://sildpre.clinic.cat/api"

//************************************************************************* */
// Authenticate
//************************************************************************* */
export async function login(user: string, password: string): Promise<any> {
    try {
        let response: Response = await fetch(base_url + "/authenticate",
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: user,
                    password: password
                })
            }
        );
        if (response.ok) {
            let res = await response.json();
            let token = res['token'];
            localStorage.setItem('token', token)
            return {
                success: true,
                token: token
            }
        }
        else throw new Error("Error iniciando sesión");
    }
    catch (err) {
        //console.log("Error iniciando sesión:", err);
        return {
            success: false,
            errorMessage: "Error en el inicio de sesión"
        };
    }
}

//************************************************************************* */
// DATABASES
//************************************************************************* */
//OK
export async function getDatabases(): Promise<any> {
    try{
        let response: Response = await fetch(base_url + "/databases", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('token')
            },
        });

        if (response.ok || response.status === 400 
            || response.status === 500 ) return await response.json();
        

        fcn_moveToErrorPage(response.status === 401?3:2) 
        return {success:-100, msg:"Error: La respuesta servidor no es interpretable"};    
    }
    catch(err){
        console.log('Error <getDatabases>')  
        fcn_moveToErrorPage(1)      
        return {success:-1, msg:"Error: servidor no responde"};
    } 
};

export async function deletetDatabases(idBase:string): Promise<void> {
    try {
        let response: Response = await fetch(base_url + "/databases?idBase="+idBase, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('token')
            },
        })
    } catch (err) {
        //console.log("Error limpiando el progreso (delete base)", err)
        fcn_moveToErrorPage(1) 
        return;
    }
}

//************************************************************************* */
// VARIABLES
//************************************************************************* */
//OK
export async function endpVAR1_getAllVariables(): Promise<any> {
    try {
        let response: Response = await fetch(base_url + "/variables", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('token')
            }
        });
        if (response.ok || response.status === 400 
            || response.status === 500 ) return await response.json();
        
        
        fcn_moveToErrorPage(response.status === 401?3:2)
        return {success:-100, msg:"Error: La respuesta servidor no es interpretable"};    
    }
    catch(err){
        console.log('Error <endpVAR1_getAllVariables>')     
        fcn_moveToErrorPage(1)    
        return {success:-1, msg:"Error: servidor no responde"};
    } 
}

//OK
export async function endpVAR2_searchFolderGroupVar(text:string): Promise<any> {
    try {
        let response: Response = await fetch(base_url + "/variables/search?like="+text, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('token')
            }
        });
        if (response.ok || response.status === 400 
            || response.status === 500 ) return await response.json();
        
        
        fcn_moveToErrorPage(response.status === 401?3:2)
        return {success:-100, msg:"Error: La respuesta servidor no es interpretable"};    
    }
    catch(err){
        console.log('Error <endpVAR2_searchFolderGroupVar>')        
        fcn_moveToErrorPage(1) 
        return {success:-1, msg:"Error: servidor no responde"};
    } 
}

//************************************************************************* */
// BASE DEFINITION
//************************************************************************* */
//OK
export async function endA1_getBase(): Promise<any> {
    try {
        let response: Response = await fetch(base_url + "/base-definition/cache/base", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('token')
            }
        })
        if (response.ok || response.status === 400 
            || response.status === 500 ) return await response.json();
        
        
        fcn_moveToErrorPage(response.status === 401?3:2)
        return {success:-100, msg:"Error: La respuesta servidor no es interpretable"};    
    
    } catch (err) {
        console.log('Error <endA1_getBase>')        
        fcn_moveToErrorPage(1) 
        return {success:-1, msg:"Error: servidor no responde"};
    }
}

//OK
export async function endA2_deleteBase(): Promise<void> {
    try {
        let response: Response = await fetch(base_url + "/base-definition/cache/base", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('token')
            },
        })
    } catch (err) {
        //console.log("Error limpiando el progreso (delete base)", err)
        fcn_moveToErrorPage(1) 
        return
    }
}

//OK
export async function endA3_setNameBase(baseName:string): Promise<any> {
    try {
        let response: Response = await fetch(base_url + "/base-definition/cache/base/setName?baseName="+baseName, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('token')
            }
        })
        if (response.ok || response.status === 400 
            || response.status === 500 ) return await response.json();
        
        
        fcn_moveToErrorPage(response.status === 401?3:2)
        return {success:-100, msg:"Error: La respuesta servidor no es interpretable"};    
    }
    catch(err){
        console.log('Error <endA3_setNameBase>')       
        fcn_moveToErrorPage(1)  
        return {success:-1, msg:"Error: servidor no responde"};
    } 
}

//OK
export async function endB1_createPack(groupId: number,type:string,linkTO:string): Promise<any> {
    try {
        let response: Response = await fetch(base_url + "/base-definition/cache/pack/create/" + groupId +"?type="+type+"&linkTO="+linkTO, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('token')
            }
        })
        if (response.ok || response.status === 400 
            || response.status === 500 ) return await response.json();
        
        
        fcn_moveToErrorPage(response.status === 401?3:2)
        return {success:-100, msg:"Error: La respuesta servidor no es interpretable"};    
    }
    catch(err){
        console.log('Error <endB1_createPack>')    
        fcn_moveToErrorPage(1)     
        return {success:-1, msg:"Error: servidor no responde"};
    } 
}

//OK
export async function endB2_deletePack(idPack: string): Promise<any> {
    try {
        let response: Response = await fetch(base_url + "/base-definition/cache/pack/delete/"+ idPack, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('token')
            }
        })
        if (response.ok || response.status === 400 
            || response.status === 500 ) return await response.json();
        
        
        fcn_moveToErrorPage(response.status === 401?3:2)
        return {success:-100, msg:"Error: La respuesta servidor no es interpretable"};    
    }
    catch(err){
        console.log('Error <endB2_deletePack>')  
        fcn_moveToErrorPage(1)       
        return {success:-1, msg:"Error: servidor no responde"};
    } 
}

// OK
export async function endC1_nextScreen(idPack: string, idScreen:string, output: any): Promise<any> {
    try {
        let response: Response = await fetch(base_url + "/base-definition/cache/pack/screen/next/" + idPack+ "?screen="+idScreen, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify(output)
        })
        if (response.ok || response.status === 400 
            || response.status === 500 ) return await response.json();
        
        
        fcn_moveToErrorPage(response.status === 401?3:2)
        return {success:-100, msg:"Error: La respuesta servidor no es interpretable"};    
    }
    catch(err){
        console.log('Error <endC1_nextScreen>')        
        fcn_moveToErrorPage(1) 
        return {success:-1, msg:"Error: servidor no responde"};
    } 
}

// OK
export async function endC2_previousScreen(idPack: string): Promise<any> {
    try {
        let response: Response = await fetch(base_url + "/base-definition/cache/pack/screen/previous/"+idPack, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('token')
            }
        })
        if (response.ok || response.status === 400 
            || response.status === 500 ) return await response.json();
        
        
        fcn_moveToErrorPage(response.status === 401?3:2)
        return {success:-100, msg:"Error: La respuesta servidor no es interpretable"};    
    }
    catch(err){
        console.log('Error <endC2_previousScreen>')     
        fcn_moveToErrorPage(1)    
        return {success:-1, msg:"Error: servidor no responde"};
    } 
}

// OK
export async function endC3_changeScreen(idPack: string, idScreen:string): Promise<any> {
    try {
        let response: Response = await fetch(base_url + "/base-definition/cache/pack/screen/change/" + idPack+ "?screen="+idScreen, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('token')
            }
        })
        if (response.ok || response.status === 400 
            || response.status === 500 ) return await response.json();
        
        
        fcn_moveToErrorPage(response.status === 401?3:2)
        return {success:-100, msg:"Error: La respuesta servidor no es interpretable"};    
    }
    catch(err){
        console.log('Error <endC3_changeScreen>')      
        fcn_moveToErrorPage(1)   
        return {success:-1, msg:"Error: servidor no responde"};
    } 
}

//OK
export async function endC4_getScreen(idPack?: string): Promise<any> {
    try {
        let response: Response = await fetch(base_url + "/base-definition/cache/pack/screen" + (idPack?"?idpack="+idPack:""), {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('token')
            }
        })
        if (response.ok || response.status === 400 
            || response.status === 500 ) return await response.json();
        
        
        fcn_moveToErrorPage(response.status === 401?3:2)
        return {success:-100, msg:"Error: La respuesta servidor no es interpretable"};    
    }
    catch(err){
        console.log('Error <endC4_getScreen>')       
        fcn_moveToErrorPage(1)  
        return {success:-1, msg:"Error: servidor no responde"};
    } 
}

// OK
export async function endD1_finishBase(nameDB: string): Promise<any> {
    try {
        let response: Response = await fetch(base_url + "/base-definition/finish", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify({
                baseName: nameDB,
            })
        })
        if (response.ok || response.status === 400 
            || response.status === 500 ) return await response.json();
        
        
        fcn_moveToErrorPage(response.status === 401?3:2)
        return {success:-100, msg:"Error: La respuesta servidor no es interpretable"};    
    }
    catch(err){
        console.log('Error <endD1_finishBase>')  
        fcn_moveToErrorPage(1)       
        return {success:-1, msg:"Error: servidor no responde"};
    } 
}

// OK
export async function endD2_getDatabase(databaseID: string): Promise<any> {
    try{
        let response: Response = await fetch(base_url + "/base-definition/base?baseID=" + databaseID, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('token')
            },
        })
        if (response.ok || response.status === 400 
            || response.status === 500 ) return await response.json();
        
        
        fcn_moveToErrorPage(response.status === 401?3:2)
        return {success:-100, msg:"Error: La respuesta servidor no es interpretable"};    
    }
    catch(err){
        console.log('Error <endD2_getDatabase>') 
        fcn_moveToErrorPage(1)        
        return {success:-1, msg:"Error: servidor no responde"};
    } 
    }

// OK
export async function endD3_loadBaseInServerCache(databaseID: string): Promise<any> {
    try{
        let response: Response = await fetch(base_url + "/base-definition/cache/base/load?baseID=" + databaseID, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('token')
            },
        })
        if (response.ok || response.status === 400 
            || response.status === 500 ) return await response.json();
        
        
        fcn_moveToErrorPage(response.status === 401?3:2)
        return {success:-100, msg:"Error: La respuesta servidor no es interpretable"};    
    }
    catch(err){
        console.log('Error <endD3_loadBaseInServerCache>')    
        fcn_moveToErrorPage(1)     
        return {success:-1, msg:"Error: servidor no responde"};
    } 
}

//OK
export async function endD4_getUserPermisosDownload(): Promise<any> {
    try{
        let response: Response = await fetch(base_url + "/base-definition/userPermDownload", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('token')
            },
        })
        if (response.ok || response.status === 400 
            || response.status === 500 ) return await response.json();
        
        
        fcn_moveToErrorPage(response.status === 401?3:2)
        return {success:-100, msg:"Error: La respuesta servidor no es interpretable"};    
    }
    catch(err){
        console.log('Error <endD4_getUserPermisosDownload>')
        fcn_moveToErrorPage(1)         
        return {success:-1, msg:"Error: servidor no responde"};
    } 
}

export async function endI1_loadTextInfoMessage( ): Promise<any> {
    try{
        let response: Response = await fetch(base_url + "/base-definition/info", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('token')
            },
        })
        if (response.ok || response.status === 400 
            || response.status === 500 ) return await response.json();
        
        
        fcn_moveToErrorPage(response.status === 401?3:2)
        return {success:-100, msg:"Error: La respuesta servidor no es interpretable"};    
    }
    catch(err){
        console.log('Error <endI1_loadTextInfoMessage>')    
        fcn_moveToErrorPage(1)     
        return {success:-1, msg:"Error: servidor no responde"};
    } 
}

//************************************************************************* */
// FASE 2
//************************************************************************* */
// OK
export async function endDB2_downloadDatabase(databaseID: number, aux:number): Promise<any> {
    try{
        // let response: Response = await fetch(base_url + "/databases/download?databaseId=" + databaseID);
        // let response: Response = await fetch("https://sildpre.clinic.cat/dev/api/fase2/download?databaseId="+databaseID+"&aux="+aux, {
            // let response: Response = await fetch(base_url + "/fase2/download?databaseId="+databaseID, {
            let response: Response = await fetch(base_url_download+"/fase2/download?databaseId="+databaseID+"&aux="+aux, { 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('token')
            },
        })
        if (response.ok || response.status === 400 
            || response.status === 500 ) return await response.json();
        
        
        fcn_moveToErrorPage(response.status === 401?3:2)
        return {success:-100, msg:"Error: La respuesta servidor no es interpretable"};    
    }
    catch(err){
        console.log('Error <endDB2_downloadDatabase>')        
        fcn_moveToErrorPage(1) 
        return {success:-1, msg:"Error: servidor no responde"};
    } 
}

// OK
export async function endDB3_BuildBase(databaseID: number,replace?: Boolean): Promise<any> {
    try{
        // let response: Response = await fetch(base_url + "/databases/download?databaseId=" + databaseID);
        let response: Response = await fetch(base_url + "/fase2/processData?databaseId="+databaseID +(replace?"&replace=1":""), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('token')
            },
        })
        if (response.ok || response.status === 400 
            || response.status === 500 ) return await response.json();
        
        
        fcn_moveToErrorPage(response.status === 401?3:2)
        return {success:-100, msg:"Error: La respuesta servidor no es interpretable"};    
    }
    catch(err){
        console.log('Error <endDB3_BuildBase>')  
        fcn_moveToErrorPage(1)       
        return {success:-1, msg:"Error: servidor no responde"};
    } 
}

// OK
export async function endDB4_updatePrivilegies(databaseID: number, permiso:number): Promise<any> {
    try{
        // let response: Response = await fetch(base_url + "/databases/download?databaseId=" + databaseID);
        let response: Response = await fetch(base_url + "/fase2/updatePermissions?databaseId="+databaseID+"&perm="+permiso, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('token')
            },
        })
        if (response.ok || response.status === 400 
            || response.status === 500 ) return await response.json();
        
        
        fcn_moveToErrorPage(response.status === 401?3:2)
        return {success:-100, msg:"Error: La respuesta servidor no es interpretable"};    
    }
    catch(err){
        console.log('Error <getDatabases>')        
        fcn_moveToErrorPage(1) 
        return {success:-1, msg:"Error: servidor no responde"};
    } 
    }

export async function endDB5_deleteDatabasesAndDownload(): Promise<any> {
    try{
        // let response: Response = await fetch(base_url + "/databases/download?databaseId=" + databaseID);
        let response: Response = await fetch(base_url + "/fase2/setIntervalDeleteBases", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('token')
            },
        })
        if (response.ok || response.status === 400 
            || response.status === 500 ) return await response.json();
        
        
        fcn_moveToErrorPage(response.status === 401?3:2)
        return {success:-100, msg:"Error: La respuesta servidor no es interpretable"};    
    }
    catch(err){
        console.log('Error <endDB5_deleteDatabasesAndDownload>')  
        fcn_moveToErrorPage(1)       
        return {success:-1, msg:"Error: servidor no responde"};
    } 
}

export async function endDB6_searchInMyBase(databaseID:number,pcntID:number): Promise<any> {
    try{
        // let response: Response = await fetch(base_url + "/databases/download?databaseId=" + databaseID);
        let response: Response = await fetch(base_url + "/fase2/searchInMyBase?dbID="+ databaseID +"&searchID="+pcntID, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('token')
            },
        })
        if (response.ok || response.status === 400 
            || response.status === 500 ) return await response.json();
        
        
        // fcn_moveToErrorPage(response.status === 401?3:2)
        return {success:-100, msg:"Error: La respuesta servidor no es interpretable"};    
    }
    catch(err){
        console.log('Error <endDB6_searchInMyBase>')  
        fcn_moveToErrorPage(1)       
        return {success:-1, msg:"Error: servidor no responde"};
    } 
}