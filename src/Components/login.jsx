import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "./style.css"
import { auth } from "../firebase-config.js";
import {signInWithEmailAndPassword } from "firebase/auth";

import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [email_error, setEmail_error] = useState(false)
    const [password_error, setPassword_error] = useState(false)
    const [message_error, setMessage_error] = useState('')
    const navigate = useNavigate()


    const handleSubmit = async (event) => {
        event.preventDefault() // prevent page refresh and delete the event
        signInWithEmailAndPassword(auth, email, password)
        .then(()=>{
            localStorage.setItem('tabs_value', "1") //per gestire refresh quando sono in un tab
            navigate('/home')
        })
        .catch((error)=>{
            if (error.code === 'auth/user-not-found'){
                setEmail_error(true);
                setPassword_error(true);
                setMessage_error("email non registrata")
            }
            else if (error.code === 'auth/wrong-password'){
                setEmail_error(true);
                setPassword_error(true);
                setMessage_error("password errata")
            }
            else{
                setEmail_error(true);
                setPassword_error(true);
                setMessage_error("errore sconosciuto riprova più tardi")
            }
        })
    }

    return (
        <div 
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <h1>Bentornati</h1>  
            <form onSubmit={handleSubmit} style={{
                display: "flex",
                flexDirection: "column",
                width: "300px",
                height: "450px",
                alignItems: "center",
                justifyContent: "center",
                border: "2.5px solid #1876d1",
                borderRadius: "10px",
                padding: "20px",

            }}>
                <TextField 
                    className='input'
                    required
                    label="Email"
                    type={'email'}
                    sx={{marginBottom: "20px"}}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={(e) => {setEmail_error(false);setMessage_error('')}}
                    error={email_error}
                    helperText=""
                />
                <TextField
                    required
                    label="Password"
                    type='password'
                    sx={{marginBottom: "20px"}}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={(e) => {setPassword_error(false); setMessage_error('')}}
                    error={password_error}
                    helperText={message_error}
                />
                <Button variant="contained" type='submit' sx={{marginBottom:"20px"}}>ACCEDI</Button>
                <Link to="/register" id="switch2">Non hai ancora un account? <br></br> Clicca qui!</Link>
            </form>
        </div>
    )
}