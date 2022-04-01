import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser, faTimes } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

// MY COMPONENTS -  ELEMENTS
import LogoClinic from '../../zComponents/LogoClinic/LogoClinic';
import './LoginPage.css';
import '../../zComponents/LogoClinic/LogoClinic';
// MODELS

// SHARE

// API
import { login } from '../../Services/api';

//---------------------------------------------------------------------------------//

enum LoginStatus {
    initial,
    loading,
    succeded,
    failed
}

function LoginPage() {
    const history = useHistory();
    const [loginStatus, setLoginStatus] = useState<LoginStatus>(LoginStatus.initial);
    const [user, setUser] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const executeLogin = async () => {
        setLoginStatus(LoginStatus.loading);
        var response = await login(user, password);
        if (response.success) {
            setLoginStatus(LoginStatus.succeded);
            localStorage.setItem('user', user);
            localStorage.setItem('token', response.token);
            history.push("/databases");
            
        } else {
            setLoginStatus(LoginStatus.failed);
            setPassword('');
        }
    }

    return (
        <>
            {
                loginStatus === LoginStatus.failed ?
                    <Alert key={0} variant='danger' style={{ margin: "5px 10px" }}>
                        No se ha podido iniciar sesión, por favor compruebe que las credenciales son válidas y hay conexión a internet.
                    </Alert>
                    : null
            }
            <div className="login-container">
                <div className="login-card">
                    <div className="card-upper">
                        <LogoClinic></LogoClinic>
                    </div>
                    <form className="card-form">
                        <div className="form-field-container">
                            <div className="form-icon"><FontAwesomeIcon className="icon" icon={faUser} /></div>
                            <div className="form-input">
                                <input type="text" placeholder="Usuario" value={user} onChange={(event) => setUser(event.target.value)} />
                            </div>
                            {/* <div className="form-delete"><FontAwesomeIcon className="icon-delete" icon={faTimes} /></div> */}
                        </div>
                        <div className="form-field-container">
                            <div className="form-icon"><FontAwesomeIcon className="icon" icon={faLock} /></div>
                            <div className="form-input">
                                <input type="password" placeholder="Contraseña" value={password} onChange={(event) => setPassword(event.target.value)} />
                            </div>
                            {/* <div className="form-delete"><FontAwesomeIcon className="icon-delete" icon={faTimes} /></div> */}
                        </div>
                        <div className="form-field-footer">
                            <span className="link">He olvidado la contraseña</span>
                        </div>
                    </form>
                    <div className="card-button">
                        {
                        loginStatus === LoginStatus.loading ?
                            <Spinner animation="border" role="status" style={{ margin: "auto auto", color: "rgb(20, 149, 131)" }}>
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                            :
                            <button className="buttonMe" onClick={() => executeLogin()} style={{ width: "300px", height: "60px" }}>Acceder</button>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage
