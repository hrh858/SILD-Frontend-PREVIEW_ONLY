import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';

// MY COMPONENTS -  ELEMENTS
import AvailableDatabases from './AvailableDatabases';
import  Navbar  from '../../zComponents/Navbar'

// MODELS


// SHARE
import { Loader, Row } from "../../Shared/GlobalStyle";

// API
import { endA1_getBase,endA2_deleteBase, getDatabases,deletetDatabases, endDB5_deleteDatabasesAndDownload } from "../../Services/api"


export interface DatabaseData {
    date: string
    idDatabase: number
    name: string
    status: number
}



const MainPage = () => {

    const [databases, setDatabases] = useState<DatabaseData[]>()
    const [ssCatcheBase, setCatcheBase] = useState<{name:string,date:string}>()
    const [ssLoading, setLoading] = useState<boolean>(true)

    const [ssGetDatabaseSuccess, setGetDatabaseSuccess]   = useState<boolean>(true)
    const [ssGetCacheBaseSuccess, setGetCacheBaseSuccess] = useState<boolean>(true)

    const history = useHistory();

    async function loadData() {
        setLoading(true);

        let res = await getDatabases()  
        // console.log(res) 
        if(res.success === 1 ){   
            setDatabases(res.databases) ;    
            setGetDatabaseSuccess(true);
        }
        else{
            setGetDatabaseSuccess(false);
        }
   
        let resBase =  await endA1_getBase();
        if(resBase.success >= 0){
            setGetCacheBaseSuccess(true);
            if(resBase !== undefined && resBase.packs !== undefined){
                setCatcheBase({name:resBase.baseName===""?"Sin Nombre":resBase.baseName,date:resBase.createdAt===null?"":resBase.createdAt})
            }
            else setCatcheBase(undefined)
        } 
        else{            
            setGetCacheBaseSuccess(false);
            console.log("resBase",'here')
        }        
        setLoading(false);
    }

    async function deleteBase(idBase:string) {
        // OPEN INFO SCREEN
        let res = await deletetDatabases(idBase);
        let res2 = await endDB5_deleteDatabasesAndDownload();
        loadData();
    }

    async function deleteCurrentCacheBase() {
        // OPEN INFO SCREEN
        let temp = await endA2_deleteBase();
        loadData();
    }

    async function onClickDatabase(databaseId: number, databaseName: string) {   
        try {            
            let aux = history.location.pathname.indexOf("databases/" + databaseId)
            if (aux === -1)
                aux = history.location.pathname.indexOf("/databases/")
                if (aux === -1)
                    history.push("databases/" + databaseId)
                else
                    history.push(databaseId.toString())
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        loadData();
    }, [])


    return (
        <div
            style={{
                height: "100vh",
                display: 'flex',
                flexDirection:"column",

            }}
        >
            <Navbar />           
            {
            ssLoading ?
                <Row>
                    <Loader />
                </Row>
                :
                <AvailableDatabases databases={databases} 
                    catcheBase={ssCatcheBase}
                    onClickDatabase={(id: number, name: string) => { onClickDatabase(id, name) }} 
                    onDeleteBase={deleteBase}
                    onClickTrashCacheBase={()=>deleteCurrentCacheBase()}
                    isGetDatabaseSuccess={ssGetDatabaseSuccess}
                    isGetCacheBaseSuccess={ssGetCacheBaseSuccess}
                />
            }
        </div>
    )
}


export default MainPage;