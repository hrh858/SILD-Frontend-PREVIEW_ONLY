import { Tooltip } from '@material-ui/core'
import React, { useState } from 'react'
import { MdFindInPage } from 'react-icons/md'
import { endDB6_searchInMyBase } from '../../Services/api'
import { defBlackColor, defGrayColor, defGreenColor, defRedColor, defWhiteColor } from '../../Shared/Colors'
import { Loader } from '../../Shared/GlobalStyle'

type State = {
    searchId?: number
    resultNhc?: string
    errorMsg?: string
    loading: boolean
}

export default function QueryNHCbyID(props: {
    databaseId: string | undefined
    canSearch: boolean
    styling?: {
        textColor?: string,
        textSize?: string
    }
}) {

    const [state, setState] = useState<State>({
        searchId: undefined,
        resultNhc: undefined,
        errorMsg: undefined,
        loading: false
    })

    async function executeSearch() {
        if (props.databaseId && state.searchId) {
            setState({
                searchId: undefined,
                resultNhc: undefined,
                errorMsg: undefined,
                loading: true
            })
            let response = await endDB6_searchInMyBase(parseInt(props.databaseId), state.searchId)
                if (response.success == 1) {
                    let nhc = response.data
                    setState({
                        searchId: undefined,
                        resultNhc: nhc,
                        errorMsg: undefined,
                        loading: false
                    })
                } else {
                    let errorMsg = response.msg
                    setState(prevState => ({
                        searchId: prevState.searchId,
                        resultNhc: undefined,
                        errorMsg: errorMsg,
                        loading: false
                    }))
                }
                return
        }
    }

  return (
    <div style={{
        width: "100%",
        // height: "100%",
        display: "flex",
        gap: "0.5rem",
        flexDirection: "column"
    }}>
        <div style={{
            height: "2.5rem",
            minHeight: "2.5rem",
            display: "flex",
            flexDirection: "row",
            gap: "0.5rem"
        }}>
            <input
            type="number"
            placeholder="Introduzca un ID"
            value={state.searchId?.toString()}
            style={{
                width: "100%",
                height: "100%",
                fontSize: props.styling?.textSize || "0.9rem",
                color: props.styling?.textColor || defGreenColor,
                border: "solid 1px #149583",
                borderRadius: "1rem",
                backgroundColor: defWhiteColor,
                paddingLeft: "1rem",
            }}
            onChange={(e) => setState({
                searchId: Number(e.target.value),
                resultNhc: undefined,
                errorMsg: undefined,
                loading: false
            })}
            />
            <button style={{
                backgroundColor: defGreenColor,
                color: defWhiteColor,
                width: "20rem",
                border: 0,
                borderRadius: "1rem",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem"
            }}
            onClick={executeSearch}
            >
                Obtener NHC
                <MdFindInPage />
            </button>
        </div>
        {
            (state.resultNhc !== undefined || state.errorMsg  !== undefined || state.loading) &&
            <div style={{
                height: "4rem",
                border: "solid 1px #149583",
                // borderRadius: "1rem", 
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding:"0 0.5rem",
                // overflow: "hidden",
                // height:"2rem",

            }}>
                {
                    state.loading ?
                    <Loader/> :
                    state.resultNhc ?
                    <Tooltip title="Click izquierdo para copiar al portapapeles">
                        <span style={{
                        color: defGreenColor,
                        fontWeight: "bolder",
                        fontSize: "1.6em",
                        overflowY: "auto",
                        maxHeight: "100%",
                    }}
                    onClick={() => state.resultNhc ? navigator.clipboard.writeText(state.resultNhc) : null}>
                        {state.resultNhc}
                        </span>
                    </Tooltip> :
                        state.errorMsg ?
                        <span style={{
                            color: defRedColor,
                            fontSize: "1.2em",
                            overflowY: "auto",
                            maxHeight: "100%",
                        }}>
                            {state.errorMsg}
                        </span> :
                        <span style={{
                            color: defGrayColor,
                            fontSize: "0.8em",
                            overflowY: "auto",
                            maxHeight: "100%",
                        }}>
                            Realize una busqueda de NHC...
                        </span>
                }
            </div>
        }
    </div>
  )
}
