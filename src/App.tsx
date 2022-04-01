import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from "styled-components";
import './App.css';

//SHARE
import { GlobalStyles } from "./Shared/GlobalStyle";
import { lightTheme } from "./Shared/Themes"

// MY PAGES
import MainPage from './zPages/MainPage/zMainPage';
import LoginPage from './zPages/LoginPage/LoginPage';
import SeeDatabasePage2 from './zPages/SeeDatabasePage/zSeeDatabasePage2';
import V2_CreateDatabasePage from './zPages/V2_CreateDatabasePage/zV2_CreateDatabasePage';
import ErrorPage from './zPages/ErrorPage/zErrorPage';
import MySpreadsheet from './zPages/V2_CreateDatabasePage/ScreenComponents/CustomInputScreen/Spreadsheet/MySpreadsheet';


declare global {
    interface String {
        croppedVersion(cropAt: number): string;
    }
}

String.prototype.croppedVersion = function (this: string, cropAt: number): string {
    let aux = this
    if (aux.length <= cropAt) return aux
    else {
        aux = aux.slice(0, cropAt).trimEnd()
        aux = aux + "..."
        return aux
    }
}

export default class App extends React.Component {
    render() {

        let token = localStorage.getItem("token")

        return (
            < ThemeProvider theme={lightTheme} >
                <GlobalStyles />
                <Switch>
                    <Route exact path="/new_components/spreadsheet" children={<MySpreadsheet onChange={() => {}} onValidate={() => {}}/>} />
                    <Route exact path="/databases" component={MainPage} />
                    <Route exact path="/databases/new" component={V2_CreateDatabasePage} />
                    <Route exact path="/databases/edit/:name" component={V2_CreateDatabasePage} />
                    <Route exact path="/databases/:id" component={SeeDatabasePage2} />
                    <Route exact path="/error/:id" component={ErrorPage} />
                    <Route exact path="/error" component={ErrorPage} />
                    <Route exact path="/" component={LoginPage} />
                </Switch>
            </ThemeProvider >
        );
    }
}
